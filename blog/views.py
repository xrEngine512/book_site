from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.exceptions import APIException
from rest_framework.response import Response
from rest_framework.permissions import *
from blog.models import BlogEntry
from blog.serializers import BlogSerializer
from common import resolve_foreign_keys
from common.models import Profile


class BlogEntryPermission(BasePermission):
    is_admin = IsAdminUser()
    is_logged_in = IsAuthenticated()

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        if self.is_admin.has_permission(request, view):
            return True
        if request.method == 'POST':
            return self.is_logged_in.has_permission(request, view)
        return False

    def has_object_permission(self, request, view, obj):
        return obj.author == request.user


class BlogViewSet(viewsets.ModelViewSet):
    serializer_class = BlogSerializer
    queryset = BlogEntry.objects.all()
    permission_classes = (BlogEntryPermission, )

    def list(self, request, *args, **kwargs):
        serializer = BlogSerializer(BlogEntry.objects.all(), many=True)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        blog_entry = get_object_or_404(BlogEntry.objects.all(), pk=kwargs.get('pk'))
        data = dict(BlogSerializer(blog_entry).data)
        request.method = 'PUT'
        data['can_modify'] = True
        try:
            self.check_permissions(request)
        except APIException:
            try:
                self.check_object_permissions(request, blog_entry)
            except APIException:
                data['can_modify'] = False

        return Response(data)

    def create(self, request, *args, **kwargs):
        data = request.data
        data = {k: v for k, v in data.items() if k in ('header', 'image', 'text')}
        entry = BlogEntry.objects.create(author=Profile.objects.get(user=request.user), **data)
        serializer = BlogSerializer(entry)
        return Response(serializer.data)

    @resolve_foreign_keys(BlogEntry)
    def update(self, request, *args, **kwargs):
        data = request.data
        entry = BlogEntry.objects.get(pk=data.get('id'))
        data = {k: v for k, v in data.items() if k in ('header', 'image', 'text')}
        for k, v in data.items():
            setattr(entry, k, v)
        entry.save()
        serializer = BlogSerializer(entry)
        return Response(serializer.data)
