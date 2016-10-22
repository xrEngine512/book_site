from django.http import HttpResponse
from django.contrib.auth import login, logout
from rest_framework.views import APIView
from rest_framework.status import *
from rest_framework.authentication import BasicAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from common.serializers import UserSerializer


def index(request):
    with open('index.html', encoding='utf-8') as html:
        return HttpResponse(html.read())


class QuietBasicAuthentication(BasicAuthentication):
    def authenticate_header(self, request):
        return 'xBasic realm="%s"' % self.www_authenticate_realm


class AuthView(APIView):
    authentication_classes = (QuietBasicAuthentication, SessionAuthentication)

    def get(self, request):
        if IsAuthenticated().has_permission(request, self):
            return Response(UserSerializer(request.user).data)
        else:
            return Response(status=HTTP_401_UNAUTHORIZED)

    def post(self, request):
        login(request, request.user)
        return Response(UserSerializer(request.user).data)

    def delete(self, request):
        logout(request)
        return Response(status=HTTP_200_OK)
