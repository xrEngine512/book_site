from django.db import models
from django.contrib.contenttypes.fields import GenericRelation
from common.models import Comment, Tag


class Writer(models.Model):
    """Автор книги"""
    name = models.TextField('Имя')
    photo = models.FileField('Фото', upload_to='writers_photos/%Y/%m/%d/', blank=True, null=True)
    creationDateTime = models.DateTimeField('Дата и время добавления', auto_now_add=True)
    editDateTime = models.DateTimeField('Дата и время последнего редактрования', auto_now=True)

    def __str__(self):
        return self.name


class Currency(models.Model):
    """Валюта"""
    name = models.TextField('Наименование')
    name_short = models.TextField('Сокращенное наименование')

    def __str__(self):
        return self.name


class AgeRestriction(models.Model):
    """Возрастное ограничение"""
    short = models.TextField('Сокращенное название')
    full = models.TextField('Полное название')
    description = models.TextField('Полное законное описание', blank=True, default='')

    def __str__(self):
        return self.full


class Genre(models.Model):
    """Тег товара"""
    name = models.TextField('Название жанра')
    comment = models.TextField('Комментарий', blank=True, default='')

    def __str__(self):
        return self.name


class Item(models.Model):
    """Товар в магазине"""
    name = models.TextField('Наименование')
    description = models.TextField('Описание')
    image = models.FileField('Изображение товара', upload_to='items_images/%Y/%m/%d/', null=True, blank=True)
    vendor_code = models.TextField('Артикул товара')
    price = models.IntegerField('Цена')
    currency = models.ForeignKey(Currency, verbose_name='Валюта, в которой указана цена')
    in_stock = models.IntegerField('Количество в наличии')

    def __str__(self):
        return self.name


class Book(Item):
    """Книга в магазине"""
    author = models.ForeignKey(Writer, verbose_name='Автор книги', null=True)
    publishing_house = models.TextField('Издательство')
    circulation = models.IntegerField('Тираж')
    age_restriction = models.ForeignKey(AgeRestriction, verbose_name='Возрастное ограничение', null=True, blank=True)
    format = models.TextField('Формат книги', null=True, blank=True)
    year = models.IntegerField('Год')
    rating = models.FloatField('Рейтинг', default=0.0)
    genres = models.ManyToManyField(Genre, verbose_name="Жанры")
    tags = models.ManyToManyField(Tag, verbose_name="Теги книги", blank=True)
    comments = GenericRelation(Comment, verbose_name="Комментарии к книге")
