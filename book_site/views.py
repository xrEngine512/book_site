from django.http import HttpResponse
from django.shortcuts import render


def index(request):
    with open('index.html') as html:
        return HttpResponse(html.read())
