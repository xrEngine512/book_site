from django.http import JsonResponse


def blog_entries(request):
    entries = [
        {
            'header': 'Ну и чего...',
            'description': 'Я очень люблю нейросети, но такого дерьма про них я давно не читал. Как я мог такое написать...',
            'author': {'name': 'Никишечкин (neuroPRO) Анатолий'},
            'creationDate': {'isoFormat': '2016-08-14', 'humanReadable': '18 авг 2016'}
        }
    ] * 6

    print('got request!')

    return JsonResponse({'blog_entries': entries})