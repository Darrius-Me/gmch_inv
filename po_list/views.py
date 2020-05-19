from django.shortcuts import render
from django.http import HttpResponse
from .models import PurchaseOrder, Item, Department, AuthUser

# Create your views here.
def po_home(request):
    if not request.user.is_authenticated:
        return render(request, 'home/home.html')
    else:
        department = Department.objects.all()
        usr = AuthUser.objects.get(username=request.user.username)
        return render(request, 'po_list/po_home.html', {'department': department, 'usr': usr})

def po_list(request, deps="All Purchase Orders"):
    if not request.user.is_authenticated:
        return render(request, 'home/home.html')
    else:
        department = Department.objects.all()

        if(deps == "All Purchase Orders"):
            order = PurchaseOrder.objects.all()
        else:
            temp_dep = Department.objects.get(name=deps)
            order = PurchaseOrder.objects.filter(department_id=temp_dep.id)

        usr = AuthUser.objects.get(username=request.user.username)
        return render(request, 'po_list/po_list.html', context={'pos': order, 'department': department, 'deps': deps, 'usr': usr})

def po_items(request, deps, po_number):
    if not request.user.is_authenticated:
        return render(request, 'home/home.html')
    else:
        order = PurchaseOrder.objects.all()

        po_dets = PurchaseOrder.objects.get(po_num=po_number)
        department = Department.objects.get(id=po_dets.department_id)
        itz = Item.objects.filter(po_id=po_dets.id);

        usr = AuthUser.objects.get(username=request.user.username)
        return render(request, 'po_list/po_items.html', context={'usr': usr, 'po_dets': po_dets, 'itz': itz, 'department_name': department.name})

def add_po(request):
    if not request.user.is_authenticated:
        return render(request, 'home/home.html')
    else:
        usr = AuthUser.objects.get(username=request.user.username)
        deps = Department.objects.all()
        if usr.is_admin == 1:
            return render(request, 'po_list/add_po.html', context={'deps': deps, 'usr': usr})
        else:
            return render(request, 'po_list/po_home.html', {'department': deps, 'usr': usr})

def process_add(request, deps="All Purchase Orders"):
    if not request.user.is_authenticated:
        return render(request, 'home/home.html')
    else:
        department = Department.objects.all()
        order = PurchaseOrder.objects.all()

        if request.method == 'POST':
            in_dep = request.POST.get('indep')
            in_charge = request.POST.get('incharge')

            in_po = request.POST.get('inpo')
            in_sup = request.POST.get('insup')
            in_add = request.POST.get('inadd')
            in_date = request.POST.get('indate')
            in_mode = request.POST.get('inmode')
            in_pr = request.POST.get('inpr')
            in_tr = request.POST.get('intr')

            del_place = request.POST.get('delplace')
            del_term = request.POST.get('delterm')
            del_date = request.POST.get('deldate')
            pay_term = request.POST.get('payterm')

            dep_name = Department.objects.get(id=in_dep)

            PO = PurchaseOrder(department_id=in_dep, charge_to=in_charge, po_num=in_po, supplier=in_sup, address=in_add, date=in_date, mode=in_mode, pr_num=in_pr, tracking_num=in_tr, delivery_place=del_place, delivery_term=del_term, delivery_date=del_date, payment_term=pay_term, total_amount=0)
            PO.save()
            cts = 1
            PO_N = PurchaseOrder.objects.get(date=in_date, pr_num=in_pr)
            total_am = 0

            while 'it' + str(cts) + '1' in request.POST:
                it_1 = request.POST.get('it' + str(cts) + '1')
                it_2 = request.POST.get('it' + str(cts) + '2')
                it_3 = request.POST.get('it' + str(cts) + '3')
                it_4 = request.POST.get('it' + str(cts) + '4')
                it_5 = request.POST.get('it' + str(cts) + '5')

                totals = float(it_5) * float(it_4)
                total_am = total_am + totals
                ITS = Item(description=it_1, brand=it_2, unit=it_3, quantity=it_4, unit_cost=it_5, cur_qty=it_4, total_cost=totals, remarks="#", po_id=PO_N.id)
                ITS.save()
                cts = cts + 1

            PO_N.total_amount = total_am
            PO_N.save()

            po_dets = {
                "indep" : dep_name.name,
                "incharge" : in_charge,
                "inpo" : in_po,
                "insup" : in_sup,
                "inadd" : in_add,
                "indate" : in_date,
                "inmode" : in_mode,
                "inpr" : in_pr,
                "intr" : in_tr,
                "del_place" : del_place,
                "del_term" : del_term,
                "del_date" : del_date,
                "pay_term" : pay_term,
                "inamount" : total_am
            }

            ITEMZ = Item.objects.filter(po_id=PO_N.id)

        usr = AuthUser.objects.get(username=request.user.username)
        return render(request, 'po_list/add_success.html', context={'prs': order, 'department': department, 'deps': deps, "po_dets": po_dets, 'usr': usr, 'itz': ITEMZ})
