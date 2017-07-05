from django_filters import rest_framework as filters, NumberFilter
from common import NumericInFilter
from .models import *


class BookFilter(filters.FilterSet):
    min_price = NumberFilter(name='price', lookup_expr='gte')
    max_price = NumberFilter(name='price', lookup_expr='lte')
    ids = NumericInFilter(name='id')
    genres = NumericInFilter(name='genres')

    class Meta:
        model = Book
        fields = ('ids', 'genres', 'min_price', 'max_price')
