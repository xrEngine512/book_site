from django.http import HttpResponse
from django.shortcuts import render


def index(request):
    with open('index.html', encoding='utf-8') as html:
        return HttpResponse(html.read())
