from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import *
from store.models import *
from store.serializers import BookSerializer, GenreSerializer
from store.filters import filters, BookFilter
from common import resolve_foreign_keys


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
    queryset = Book.objects.all().distinct()
    permission_classes = (BookPermission, )
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = BookFilter

    def retrieve(self, request, *args, **kwargs):
        return Response(self.get_serializer(get_object_or_404(self.get_queryset(), pk=kwargs.get('pk'))).data)

    @resolve_foreign_keys(Book)
    def update(self, request, *args, **kwargs):
        data = request.data
        book = self.get_queryset().get(pk=data.get('id'))
        for k, v in data.items():
            setattr(book, k, v)
        book.save()
        return Response(self.get_serializer(book).data)


class GenreViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = GenreSerializer
    queryset = Genre.objects.all()

