from rest_framework.status import *
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.permissions import BasePermission, is_authenticated, IsAdminUser, SAFE_METHODS
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import re


class FileAccess(BasePermission):
    is_admin = IsAdminUser()
    pattern = re.compile('^{}user_([0-9]+)/(.+)'.format(default_storage.base_location))

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        if self.is_admin.has_permission(request, view):
            return True
        if request.method == 'POST':
            return is_authenticated(request.user)
        if request.method == 'DELETE':
            if not is_authenticated(request.user):
                return False
            for path in request.data.get('files_paths', []):
                m = re.match(self.pattern, path)
                if not m or not m.group(1) == str(request.user.id):
                    return False
            return True

        return False


class FilesView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = (FileAccess,)

    def post(self, request):
        file = request.FILES['file']
        path = 'user_{}/{}'.format(request.user.id, file.name)
        url = default_storage.base_location + default_storage.save(path, ContentFile(file.read()))
        return Response(data={'url': url}, status=HTTP_201_CREATED)

    def delete(self, request):
        for path in request.data.get('files_paths', []):
            default_storage.delete(path)
        return Response(status=HTTP_200_OK)

