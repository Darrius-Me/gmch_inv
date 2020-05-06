from django.shortcuts import render
from django.http import HttpResponse
from po_list.models import PurchaseOrder, Item, Department
# Create your views here.
def home(request):
    if request.user.is_authenticated:
        return render(request, 'item_list/item_home.html')
    else:
        return render(request, 'home/home.html')

def items(request):
    if not request.user.is_authenticated:
        return render(request, 'home/home.html')
    else:
        items = Item.objects.all();
        pos = PurchaseOrder.objects.all()
        return render(request, 'item_list/items.html', context={'items':items, 'pos': pos})
