from django.conf.urls import url
from files.views import *

urlpatterns = [
    url(r'^api/files', FilesView.as_view()),
]