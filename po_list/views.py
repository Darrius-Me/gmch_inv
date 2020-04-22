from django.shortcuts import render
from django.http import HttpResponse
from .models import PurchaseOrder, Item, Department

# Create your views here.
def home(request):
    return render(request, 'po_list/home.html')

def po_list(request, deps="All Purchase Orders"):
    order = PurchaseOrder.objects.all()
    department = Department.objects.all()
    return render(request, 'po_list/po_list.html', context={'prs': order, 'department': department, 'deps': deps})

def po_items(request, deps, po_number='all_po'):
    it = Item.objects.all()
    order = PurchaseOrder.objects.all()
    return render(request, 'po_list/po_items.html', context={'item': it, 'prs':order , 'po_number': po_number, 'deps': deps})

def add_po(request):
    return render(request, 'po_list/add_po.html')
