from django.db import models
from django.contrib.auth.models import User
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType


def upload_path(instance, filename):
    return 'user_{0}/{1}'.format(instance.user.id, filename)


class Profile(models.Model):
    """Пользователь сайта"""
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    photo = models.FileField("Аватар", upload_to=upload_path, null=True, blank=True)

    @staticmethod
    def on_user_create(sender, instance, created, *args, **kwargs):
        if not created:
            return
        Profile.objects.create(user=instance)

models.signals.post_save.connect(Profile.on_user_create, sender=User)


class Comment(models.Model):
    """Комментарий"""
    author = models.ForeignKey(Profile, verbose_name='Автор', on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField('ID объекта, к которому комментарий')
    content_type = models.ForeignKey(ContentType, verbose_name='Тип объекта, к которому комментарий')
    object = GenericForeignKey('content_type', 'object_id')
    time_posted = models.DateTimeField('Время публикации комментария', auto_now_add=True)
    time_edited = models.DateTimeField('Время редактирования комментария', auto_now=True, null=True)
    text = models.TextField('Текст комментария')


class Tag(models.Model):
    """Тег товара"""
    value = models.TextField('Значение тега')
    color = models.CharField('HTML цвет', max_length=7, blank=True, null=True)
    comment = models.TextField('Комментарий', blank=True, default='')

    def __str__(self):
        return self.value

