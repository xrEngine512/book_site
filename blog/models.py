from django.db import models
from common.models import Profile


def upload_path(instance, filename):
    return 'user_{0}/{1}'.format(instance.author.id, filename)


class BlogEntry(models.Model):
    """Запись в блоге"""
    header = models.CharField('Заголовок', max_length=100)
    text = models.TextField('Текст записи')
    image = models.FileField('Картинка записи', upload_to=upload_path)
    creationDateTime = models.DateTimeField('Дата и время создания записи', auto_now_add=True)
    editDateTime = models.DateTimeField('Дата и время последнего редактрования', auto_now=True)
    author = models.ForeignKey(Profile, on_delete=models.CASCADE)

    def __str__(self):
        return self.header

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)