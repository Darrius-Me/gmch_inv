from django.shortcuts import render
from django.http import HttpResponse
from po_list.models import PurchaseOrder, Item, Department, AuthUser
# Create your views here.
def item_home(request):
    if request.user.is_authenticated:
        usr = AuthUser.objects.get(username=request.user.username)
        return render(request, 'item_list/item_home.html', context={'usr': usr})
    else:
        return render(request, 'home/home.html')

def items(request):
    if not request.user.is_authenticated:
        return render(request, 'home/home.html')
    else:
        items = Item.objects.all();
        pos = PurchaseOrder.objects.all()
        usr = AuthUser.objects.get(username=request.user.username)
        return render(request, 'item_list/items.html', context={'items':items, 'pos': pos, 'usr': usr})
