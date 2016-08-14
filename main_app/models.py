from django.db import models
from datetime import datetime


def upload_path(instance, filename):
    """media/user_id/filename"""
    return 'user_{0}/{1}'.format(instance.user.id, filename)


class BlogEntry(models.Model):
    """Запись в блоге"""
    def __init__(self):
        models.Model.__init__(self)
        self.header = models.CharField('Заголовок', max_length=100)
        self.text = models.TextField('Текст записи')
        self.image = models.FileField('Картинка записи', upload_to=upload_path)
        self.creationDate = models.DateTimeField('Дата и время создания записи')
        self.authorID = models.ForeignKey('auth_user', on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        if not self.pk:
            self.creationDate = datetime.now()
        super().save(*args, **kwargs)