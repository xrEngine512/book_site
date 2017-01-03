from rest_framework import serializers
from store.models import *
from common import EnumField
from common.serializers import CommentSerializer


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


class ItemTagSerializer(serializers.ModelSerializer):
    tag_class = EnumField(ItemTag.tag_classes)

    class Meta:
        model = ItemTag
        fields = ('id', 'tag_class', 'value', 'color', 'comment')


class BookSerializer(serializers.ModelSerializer):
    author = WriterSerializer()
    currency = CurrencySerializer()
    age_restriction = AgeRestrictionSerializer()
    tags = ItemTagSerializer(many=True)
    comments = CommentSerializer(many=True)

    class Meta:
        model = Book
        fields = ('id', 'name', 'description', 'image', 'author', 'price', 'currency', 'publishing_house',
                  'circulation', 'age_restriction', 'format', 'year', 'in_stock', 'rating', 'tags', 'comments')


