from django.shortcuts import render
from django.http import HttpResponse
from .models import PurchaseOrder, Item, Department

# Create your views here.
def home(request):
    return render(request, 'po_list/po_home.html')

def po_list(request, deps="All Purchase Orders"):

    department = Department.objects.all()

    if(deps == "All Purchase Orders"):
        order = PurchaseOrder.objects.all()
    else:
        temp_dep = Department.objects.get(name=deps)
        order = PurchaseOrder.objects.filter(department_id=temp_dep.id)

    return render(request, 'po_list/po_list.html', context={'pos': order, 'department': department, 'deps': deps})

def po_items(request, deps, po_number):
    order = PurchaseOrder.objects.all()

    current_po = PurchaseOrder.objects.get(po_num=po_number)
    it = Item.objects.filter(po_id=current_po.id);

    return render(request, 'po_list/po_items.html', context={'item': it, 'prs':order , 'po_number': po_number, 'deps': deps, 'current_po': current_po})

def add_po(request):
    deps = Department.objects.all()
    return render(request, 'po_list/add_po.html', context={'deps': deps})

def process_add(request, deps="All Purchase Orders"):
    department = Department.objects.all()
    order = PurchaseOrder.objects.all()

    if request.method == 'POST':
        in_dep = request.POST.get('indep')
        in_date = request.POST.get('indate')
        in_pr = request.POST.get('inpr')
        in_po = request.POST.get('inpo')
        in_sup = request.POST.get('insup')
        in_charge = request.POST.get('incharge')
        in_voice = request.POST.get('invoice')

        dep_name = Department.objects.get(id=in_dep)
        reqs = "ssss"
        PO = PurchaseOrder(date=in_date, purchase_request=in_pr, charge_to=in_charge, supplier=in_sup, invoice_recieve=in_voice, po_num=in_po, department_id=in_dep, total_amount="0")
        PO.save()
        cts = 0;
        PO_N = PurchaseOrder.objects.get(date=in_date, purchase_request=in_pr)
        total_am = 0
        while 'it' + str(cts) + '1' in request.POST:
            it_1 = request.POST.get('it' + str(cts) + '1')
            it_2 = request.POST.get('it' + str(cts) + '2')
            it_3 = request.POST.get('it' + str(cts) + '3')
            it_4 = request.POST.get('it' + str(cts) + '4')
            it_5 = request.POST.get('it' + str(cts) + '5')
            it_6 = request.POST.get('it' + str(cts) + '6')
            it_7 = request.POST.get('it' + str(cts) + '7')
            it_8 = request.POST.get('it' + str(cts) + '8')

            totals = float(it_1) * float(it_7)
            total_am = total_am + totals
            ITS = Item(quantity=it_1, cur_qty=it_1, unit=it_2, description=it_3, brand=it_4, batch_lot_num=it_5, expiration_date=it_6, unit_cost=it_7, remarks=it_8, po_id=PO_N.id, total_cost = totals)
            ITS.save()
            cts = cts + 1

        PO_N.total_amount = total_am
        PO_N.save()

        po_dets = {
            "indep" : dep_name.name,
            "indate" : in_date,
            "inpr" : in_pr,
            "inpo" : in_po,
            "insup" : in_sup,
            "incharge" : in_charge,
            "invoice" : in_voice,
            "inamount" : total_am
        }

    return render(request, 'po_list/add_success.html', context={'prs': order, 'department': department, 'deps': deps, "po_dets": po_dets, 'reqs': reqs})
