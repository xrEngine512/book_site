"""book_site URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include, static
from django.contrib import admin
from django.conf import settings
from rest_framework import routers
from .views import *
from blog.views import *
from common.views import *
from store.views import *
from files.views import *

router = routers.DefaultRouter()
router.register(r'blog_entry', BlogViewSet)
router.register(r'comment', CommentView)
router.register(r'profile', ProfileViewSet)
router.register(r'tag', TagViewSet)
router.register(r'store/book', BookViewSet)
router.register(r'store/genre', GenreViewSet)


urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^api/files/', FilesView.as_view(), name='files'),
    url(r'^api/auth/$', AuthView.as_view(), name='authenticate'),
    url(r'^api/register/', RegistrationView.as_view(), name='registration'),
    url(r'^admin/', admin.site.urls),
    url(r'^.*', index, name='index'),
]

if settings.DEBUG:
    urlpatterns[-1: -1] = static.static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

