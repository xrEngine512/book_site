from django.conf.urls import url, include
from rest_framework import routers
from blog.views import *

router = routers.DefaultRouter()
router.register(r'blog_entry', BlogViewSet)

urlpatterns = [
    url(r'^api/', include(router.urls)),
]