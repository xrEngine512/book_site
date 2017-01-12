from django.shortcuts import get_object_or_404
from registration.backends.hmac.views import RegistrationView as BaseRegistrationView, ActivationView
from rest_framework import viewsets, views, status
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.permissions import *
from .serializers import *
from common import resolve_user_profile, to_dict
from validate_email import validate_email


class CommentPermission(BasePermission):
    """Only admin can delete/modify; Author can modify; Everyone can read"""
    is_admin = IsAdminUser()

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        if self.is_admin.has_permission(request, view):
            return True
        return False

    @resolve_user_profile
    def has_object_permission(self, request, view, obj, user_profile=None):
        return obj.author == user_profile and (request.method != 'DELETE' or self.is_admin.has_permission(request, view))


class CommentView(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    permission_classes = (CommentPermission, )

    @staticmethod
    def get_ref_object_data(request):
        data = request.query_params if request.method in ('GET', 'DELETE') else request.data

        if hasattr(data, '_mutable'):
            data._mutable = True  # make this shit mutable already!

        if 'book_id' in data:
            content_type = ContentType.objects.get(app_label='store', model='Book')
            object_id = int(data.get('book_id'))
            del data['book_id']
        elif 'blog_entry_id' in data:
            content_type = ContentType.objects.get(app_label='blog', model='BlogEntry')
            object_id = int(data.get('blog_entry_id'))
            del data['blog_entry_id']
        else:
            return None, None
        return content_type, object_id

    @staticmethod
    def list_impl(request, content_type, object_id):
        if content_type and object_id:
            return Response(CommentSerializer(Comment.objects.filter(content_type=content_type, object_id=object_id), many=True).data)
        else:
            return Response(CommentSerializer(Comment.objects.all(), many=True).data)

    def list(self, request, *args, **kwargs):
        return self.list_impl(request, *self.get_ref_object_data(request))

    def retrieve(self, request, *args, **kwargs):
        return Response(CommentSerializer(get_object_or_404(Comment.objects.all(), pk=kwargs.get('pk'))).data)

    @resolve_user_profile
    def create(self, request, *args, user_profile=None, **kwargs):
        content_type, object_id = self.get_ref_object_data(request)
        if content_type and object_id:
            ref = content_type.get_object_for_this_type(pk=object_id)
            Comment.objects.create(author=user_profile, object=ref, **request.data)
        else:
            Comment.objects.create(author=user_profile, **request.data)
        return self.list_impl(request, content_type, object_id)

    def update(self, request, *args, **kwargs):
        data = request.data
        comment = Comment.objects.get(pk=data.get('id'))
        for k, v in data.items():
            setattr(comment, k, v)
        comment.save()
        return Response(CommentSerializer(comment).data)

    def destroy(self, request, *args, **kwargs):
        try:
            super().destroy(request, *args, **kwargs)
        except Exception as e:
            return Response([{'exception': str(e)}])
        return self.list(request, *args, **kwargs)


class ProfileViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ProfileSerializerPublic
    queryset = Profile.objects.all()

    def retrieve_impl(self, request, profile):
        if request.user.id == profile.user.id or IsAdminUser().has_permission(request, self):
            return Response(ProfileSerializerPrivate(profile).data)
        return Response(ProfileSerializerPublic(profile).data)

    def retrieve(self, request, *args, **kwargs):
        self.retrieve_impl(request, get_object_or_404(Profile.objects.all(), **kwargs))

    def list(self, request, *args, **kwargs):
        user_id = int(request.query_params.get('user_id', 0))
        if user_id:
            user = get_object_or_404(User.objects.all(), pk=user_id)
            profile = get_object_or_404(Profile.objects.all(), user=user)
            return self.retrieve_impl(request, profile)
        if IsAdminUser().has_permission(request, self):
            return Response(ProfileSerializerPrivate(Profile.objects.all(), many=True).data)
        return Response(ProfileSerializerPublic(Profile.objects.all(), many=True).data)


class RegistrationView(views.APIView):
    permission_classes = (AllowAny, )
    parser_classes = (JSONParser, )
    registration_view = BaseRegistrationView()
    activation_view = ActivationView()

    def post(self, request):
        data = to_dict(request.data)
        if User.objects.filter(username=data.get('username')):
            return Response({'reason': 'Пользователь с таким логином уже существует'}, status.HTTP_409_CONFLICT)
        if not validate_email(data.get('email'), verify=True):
            return Response({'reason': 'Указанный почтовый ящик не найден'}, status.HTTP_404_NOT_FOUND)

        raw_password = data.pop('password')
        user = User.objects.create(**data, is_active=False)
        user.set_password(raw_password)
        user.save()
        try:
            self.registration_view.request = request
            self.registration_view.send_activation_email(user)
        except Exception as e:
            user.delete()
            return Response({'reason': 'Ошибка при отправке письма'}, status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(UserSerializerPrivate(user).data, status.HTTP_201_CREATED)

    def get(self, request):
        user = self.activation_view.activate(**to_dict(request.query_params))
        if user:
            return Response(UserSerializerPublic(user).data)
        return Response(status=status.HTTP_404_NOT_FOUND)


class TagViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = TagSerializer
    queryset = Tag.objects.all()

    def list(self, request, *args, **kwargs):
        return Response(TagSerializer(Tag.objects.filter(**to_dict(request.query_params)), many=True).data)

