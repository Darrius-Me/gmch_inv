from django.shortcuts import render
from django.http import HttpResponse
from .models import PurchaseOrder

# Create your views here.
def home(request):
    order = PurchaseOrder.objects.all()
    return render(request, 'pr_list/home.html', {'prs': order})
