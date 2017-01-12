from rest_framework import serializers
from store.models import *
from common.serializers import CommentSerializer, TagSerializer


class WriterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Writer
        fields = ('id', 'name', 'photo')


class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = ('id', 'name', 'name_short')


class AgeRestrictionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AgeRestriction
        fields = ('id', 'short', 'full', 'description')


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ('id', 'name', 'comment')


class BookSerializer(serializers.ModelSerializer):
    author = WriterSerializer()
    currency = CurrencySerializer()
    age_restriction = AgeRestrictionSerializer()
    genres = GenreSerializer(many=True)
    tags = TagSerializer(many=True)
    comments = CommentSerializer(many=True)

    class Meta:
        model = Book
        fields = ('id', 'name', 'description', 'image', 'author', 'price', 'currency', 'publishing_house',
                  'circulation', 'age_restriction', 'format', 'year', 'in_stock', 'rating', 'tags', 'genres', 'comments')


