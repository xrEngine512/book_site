from rest_framework import serializers
from .models import *


class UserSerializerPublic(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'is_superuser', 'first_name', 'last_name')


class ProfileSerializerPublic(serializers.ModelSerializer):
    user = UserSerializerPublic()

    class Meta:
        model = Profile
        fields = ('id', 'user', 'photo')


class UserSerializerPrivate(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'is_superuser', 'first_name', 'last_name', 'email')


class ProfileSerializerPrivate(serializers.ModelSerializer):
    user = UserSerializerPrivate()

    class Meta:
        model = Profile
        fields = ('id', 'user', 'photo')


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'value', 'color', 'comment')


class CommentSerializer(serializers.ModelSerializer):
    author = ProfileSerializerPublic()

    class Meta:
        model = Comment
        fields = ('id', 'author', 'time_posted', 'time_edited', 'text')
