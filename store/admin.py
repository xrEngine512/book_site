from django.contrib import admin
from .models import Book, ItemTag, Writer, AgeRestriction, Currency


admin.site.register(Book)
admin.site.register(ItemTag)
admin.site.register(Writer)
admin.site.register(AgeRestriction)
admin.site.register(Currency)
