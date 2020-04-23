from django.shortcuts import render
from django.http import HttpResponse
from po_list.models import PurchaseOrder, Item, Department
# Create your views here.
def home(request):
    return render(request, 'item_list/item_home.html')

def items(request):
    items = Item.objects.all();
    pos = PurchaseOrder.objects.all()
    return render(request, 'item_list/items.html', context={'items':items, 'pos': pos})
