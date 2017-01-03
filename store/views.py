from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import *
from store.models import *
from store.serializers import BookSerializer, ItemTagSerializer
from common import resolve_foreign_keys, to_dict, resolve_enum_fields


class BookPermission(BasePermission):
    """Only admin can add or modify information about books, everyone can see books"""
    is_admin = IsAdminUser()

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        if self.is_admin.has_permission(request, view):
            return True
        return False


class BookViewSet(viewsets.ModelViewSet):
    serializer_class = BookSerializer
    queryset = Book.objects.all()
    permission_classes = (BookPermission, )

    def list(self, request, *args, **kwargs):
        return Response(BookSerializer(Book.objects.all(), many=True).data)

    def retrieve(self, request, *args, **kwargs):
        return Response(BookSerializer(get_object_or_404(Book.objects.all(), pk=kwargs.get('pk'))).data)

    @resolve_foreign_keys(Book)
    def create(self, request, *args, **kwargs):
        return Response(BookSerializer(Book.objects.create(**request.data)).data)

    @resolve_foreign_keys(Book)
    def update(self, request, *args, **kwargs):
        data = request.data
        book = Book.objects.get(pk=data.get('id'))
        for k, v in data.items():
            setattr(book, k, v)
        book.save()
        serializer = BookSerializer(book)
        return Response(serializer.data)


class ItemTagViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ItemTagSerializer
    queryset = ItemTag.objects.all()

    @resolve_enum_fields(('tag_class', ItemTag.tag_classes))
    def list(self, request, *args, **kwargs):
        return Response(ItemTagSerializer(ItemTag.objects.filter(**to_dict(request.query_params)), many=True).data)

