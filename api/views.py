from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
import json


def api_redirect(request):
    return redirect('/')

def api_categories_json(request):
    # with open("/Users/konstantinnistratov/Documents/myDjango/authenticate_email-master/api/files/category.json", 'r') as js_file:
    js_file = '''{"data": ["<div id='selectjs' class='block_li'><div id='selectjs' class='block_li_name'>Emails & Contacts Scraper</div><div id='selectjs' class='block_li_dis'>Finds email addresses, social links, phones, and other data. Pay only for found contacts.</div><div id='selectjs' class='block_li_flex'><div id='selectjs' class='price3_bl'><div id='selectjs' class='price_count'><div id='selectjs' class='red_price'>0$ per domain</div></div><div id='selectjs' class='price_dis'>For the first 1 to 300</div></div><div id='selectjs' class='price3_bl'><div id='selectjs' class='price_count'><div id='selectjs' class='red_price'>0.002$ per domain</div></div><div id='selectjs' class='price_dis'>For the first 1 to 300</div></div><div id='selectjs' class='price3_bl'><div id='selectjs' class='price_count'><div id='selectjs' class='red_price'>0.001$ per domain</div></div><div id='selectjs' class='price_dis'>For the first 1 to 300</div></div></div></div>", "2"]}'''
    api_json_categories = json.loads(js_file)

    response = JsonResponse(
        api_json_categories
    )
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
    response["Access-Control-Max-Age"] = "1000"
    response["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type"
    # return JsonResponse(api_json_categories)
    return response
