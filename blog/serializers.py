from rest_framework import serializers
from blog.models import BlogEntry
from common.serializers import ProfileSerializerPublic


class BlogSerializer(serializers.ModelSerializer):
    author = ProfileSerializerPublic()

    class Meta:
        model = BlogEntry
        fields = ('id', 'header', 'text', 'image', 'creationDateTime', 'author')


