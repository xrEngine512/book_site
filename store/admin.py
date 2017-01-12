from django.contrib import admin
from .models import Book, Genre, Writer, AgeRestriction, Currency


admin.site.register(Book)
admin.site.register(Genre)
admin.site.register(Writer)
admin.site.register(AgeRestriction)
admin.site.register(Currency)
