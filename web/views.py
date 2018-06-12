from django.http import HttpResponse
from django.shortcuts import render

import json
from django.http import HttpResponse

# Create your views here.
from django.views.decorators.http import require_http_methods
from json_response import JsonpResponse, json_response


def test(request, slug=''):
    response_data = {}
    response_data['result'] = 'success'
    response_data['message'] = slug
    return HttpResponse(json.dumps(response_data), content_type="application/json")


@json_response
@require_http_methods(["POST"])
def login(request):
    response_data = {}
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')

        if (username == 'Ham'):
            response_data['message'] = 'ok'
    return response_data


@json_response
@require_http_methods(["POST"])
def register(request):
    response_data = {}
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        mail = request.POST.get('mail')
        print(username, password, mail)
    response_data['message'] = 'ok'
    return response_data
