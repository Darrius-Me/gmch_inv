from django.shortcuts import render
from django.http import HttpResponse
from .models import Item

# Create your views here.
def home(request):
    supply = Item.objects.all()
    return render(request, 'pr_list/home.html', {'item': supply})
