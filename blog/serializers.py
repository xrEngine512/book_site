from rest_framework import serializers
from blog.models import BlogEntry
from common.serializers import UserSerializer


class BlogSerializer(serializers.ModelSerializer):
    author = UserSerializer()

    class Meta:
        model = BlogEntry
        fields = ('id', 'header', 'text', 'image', 'creationDateTime', 'author')


