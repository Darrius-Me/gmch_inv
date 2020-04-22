from django.shortcuts import render
from django.http import HttpResponse
from .models import PurchaseOrder, Item, Department

# Create your views here.
def home(request):
    return render(request, 'po_list/home.html')

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

        po_dets = {
            "indep" : dep_name.name,
            "indate" : in_date,
            "inpr" : in_pr,
            "inpo" : in_po,
            "insup" : in_sup,
            "incharge" : in_charge,
            "invoice" : in_voice,
            "inamount" : 0
        }

        it_1 = request.POST.get('it01')
        it_2 = request.POST.get('it02')
        it_3 = request.POST.get('it03')
        it_4 = request.POST.get('it04')
        it_5 = request.POST.get('it05')
        it_6 = request.POST.get('it06')
        it_7 = request.POST.get('it07')
        it_8 = request.POST.get('it08')

        # reqs = in_dep
        PO = PurchaseOrder(date=in_date, purchase_request=in_pr, charge_to=in_charge, supplier=in_sup, invoice_recieve=in_voice, po_num=in_po, department_id=in_dep, total_amount="0")
        PO.save()

        # canloop = False
        #
        # if (it_1!="" and it_2!="" and it_3!="" and it_4!="" and it_5!="" and it_6!="" and it_7!="" and it_8!="")
        #     canloop = True
        #
        # while canloop
        #
        #
        # if request.POST.get('it01') != "":
        #     reqs = request.POST.get('it01')
        # else:
        #     reqs = "NONE"

    return render(request, 'po_list/add_success.html', context={'prs': order, 'department': department, 'deps': deps, "po_dets": po_dets})
