from django.http import JsonResponse
from django.shortcuts import render


def index(request):
    return render(request, "index.html")


def test_request(request):
    return JsonResponse({"data": "Hurrah!!!"})