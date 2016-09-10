from rest_framework import serializers
from blog.models import BlogEntry
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')


class BlogSerializer(serializers.ModelSerializer):
    author = UserSerializer()

    class Meta:
        model = BlogEntry
        fields = ('id', 'header', 'text', 'image', 'creationDateTime', 'author')


