from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import PurchaseOrder, Item, Department, AuthUser, Delivery, DeliveryItem

# Create your views here.
def po_home(request):
    if not request.user.is_authenticated:
        return render(request, 'home/home.html')
    else:
        department = Department.objects.all()
        usr = AuthUser.objects.get(username=request.user.username)
        return render(request, 'po_list/po_home.html', {'department': department, 'usr': usr})

def po_list(request, pro="All Purchase Orders", dep="All Purchase Orders", fund="All Purchase Orders"):
    if not request.user.is_authenticated:
        return render(request, 'home/home.html')
    else:
        departments = Department.objects.all()

        process = "All Purchase Orders"
        department = "All Purchase Orders"
        funding = "All Purchase Orders"

        if(dep == "All Departments"):
            if(pro == "All Purchase Orders"):
                if(fund == "All Funding"):
                    order = PurchaseOrder.objects.all()
                else:
                    order = PurchaseOrder.objects.filter(charge_to=fund)
            elif(pro == "Completed Orders"):
                if(fund == "All Funding"):
                    order = PurchaseOrder.objects.filter(is_processed=1)
                else:
                    order = PurchaseOrder.objects.filter(is_processed=1, charge_to=fund)
            elif(pro == "Incomplete Orders"):
                if(fund == "All Funding"):
                    order = PurchaseOrder.objects.filter(is_processed=0)
                else:
                    order = PurchaseOrder.objects.filter(is_processed=0, charge_to=fund)
        else:
            temp_dep = Department.objects.get(name=dep)

            if(pro == "All Purchase Orders"):
                if(fund == "All Funding"):
                    order = PurchaseOrder.objects.filter(department_id=temp_dep.id)
                else:
                    order = PurchaseOrder.objects.filter(department_id=temp_dep.id, charge_to=fund)
            elif(pro == "Completed Orders"):
                if(fund == "All Funding"):
                    order = PurchaseOrder.objects.filter(department_id=temp_dep.id, is_processed=1)
                else:
                    order = PurchaseOrder.objects.filter(department_id=temp_dep.id, is_processed=1, charge_to=fund)
            elif(pro == "Incomplete Orders"):
                if(fund == "All Funding"):
                    order = PurchaseOrder.objects.filter(department_id=temp_dep.id, is_processed=0)
                else:
                    order = PurchaseOrder.objects.filter(department_id=temp_dep.id, is_processed=0, charge_to=fund)

        usr = AuthUser.objects.get(username=request.user.username)
        return render(request, 'po_list/po_list.html', context={'pos': order, 'departments': departments, 'usr': usr, 'pro':pro, 'dep':dep, 'fund':fund})

def po_items(request, pro, dep, fund, po_number):
    if not request.user.is_authenticated:
        return render(request, 'home/home.html')
    else:
        order = PurchaseOrder.objects.all()

        po_dets = PurchaseOrder.objects.get(po_num=po_number)
        department = Department.objects.get(id=po_dets.department_id)
        itz = Item.objects.filter(po_id=po_dets.id);

        po_del = Delivery.objects.filter(po_id=po_dets.id).order_by('date')
        po_del_it = DeliveryItem.objects.all()

        usr = AuthUser.objects.get(username=request.user.username)
        return render(request, 'po_list/po_items.html', context={'usr': usr, 'po_dets': po_dets, 'itz': itz, 'department_name': department.name, 'po_del': po_del, 'po_del_it': po_del_it})

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

            PO = PurchaseOrder(department_id=in_dep, charge_to=in_charge, po_num=in_po, supplier=in_sup, address=in_add, date=in_date, mode=in_mode, pr_num=in_pr, tracking_num=in_tr, delivery_place=del_place, delivery_term=del_term, delivery_date=del_date, payment_term=pay_term, total_amount=0, is_processed=0, amount_loss=0)
            PO.save()
            cts = 1
            PO_N = PurchaseOrder.objects.get(po_num=in_po, date=in_date, pr_num=in_pr)
            total_am = 0

            while 'it' + str(cts) + '1' in request.POST:
                it_1 = request.POST.get('it' + str(cts) + '1')
                it_2 = request.POST.get('it' + str(cts) + '2')
                it_3 = request.POST.get('it' + str(cts) + '3')
                it_4 = request.POST.get('it' + str(cts) + '4')
                it_5 = request.POST.get('it' + str(cts) + '5')

                totals = float(it_5) * float(it_4)
                total_am = total_am + totals
                ITS = Item(description=it_1, brand=it_2, unit=it_3, quantity=it_4, unit_cost=it_5, cur_qty=it_4, total_cost=totals, remarks="#", po_id=PO_N.id, onhand_qty=0, losses=0, manufacturer="#", expiration_date="#", status=0)
                ITS.save()
                cts = cts + 1

            PO_N.total_amount = total_am
            PO_N.amount_loss = total_am
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


def process_po(request, pro, dep, fund, po_number):
    if not request.user.is_authenticated:
        return render(request, 'home/home.html')
    else:
        po_dets = PurchaseOrder.objects.get(po_num=po_number)
        department = Department.objects.get(id=po_dets.department_id)
        it = Item.objects.filter(po_id=po_dets.id);

        po_del = Delivery.objects.filter(po_id=po_dets.id).order_by('date')
        po_del_it = DeliveryItem.objects.all()

        return render(request, 'po_list/process_po.html', context={'po_number': po_number, 'po_dets': po_dets, 'department': department.name, 'itz': it, 'po_del': po_del, 'po_del_it': po_del_it})

def processing_po(request, pro, dep, fund, po_number):
    if not request.user.is_authenticated:
        return render(request, 'home/home.html')
    else:
        if request.method == 'POST':

            delivery_date = request.POST.get('delivery_date')
            delivery_invoice = request.POST.get('delivery_invoice')
            po_number = request.POST.get('po_number_del')

            PO = PurchaseOrder.objects.get(po_num=po_number)

            DEL = Delivery(date=delivery_date, invoice=delivery_invoice, current_total_amount=0, po_id=PO.id)
            DEL.save()

            DEL_N = Delivery.objects.get(date=delivery_date, invoice=delivery_invoice)

            cts = 1
            total_cost = 0
            all_total = 0
            count = 0
            loss_count = 0
            amount_loss = 0
            all_amount_loss = 0

            while 'it-1-' + str(cts) in request.POST:
                description = request.POST.get('it-1-' + str(cts))
                quantity = request.POST.get('it-2-' + str(cts))
                manufacturer = request.POST.get('it-3-' + str(cts))
                brand = request.POST.get('it-4-' + str(cts))
                lotno = request.POST.get('it-5-' + str(cts))
                expiration_date = request.POST.get('it-6-' + str(cts))
                remarks = request.POST.get('it-7-' + str(cts))
                item_id = request.POST.get('it-8-' + str(cts))
                unit_cost = request.POST.get('it-9-' + str(cts))

                total_cost = float(float(quantity) * float(unit_cost))
                all_total = all_total + total_cost

                DELITEM = DeliveryItem(item_id=item_id, item_desc=description, brand=brand, quantity=quantity, manufacturer=manufacturer, lot_number=lotno, expiration_date=expiration_date, amount=total_cost, delivery_id=DEL_N.id)
                DELITEM.save()

                IT = Item.objects.get(id=item_id)
                count = int(IT.onhand_qty) + int(quantity)
                IT.onhand_qty = count
                loss_count = int(IT.quantity) - int(quantity)
                IT.losses = loss_count
                amount_loss = float(float(quantity) * float(unit_cost))
                all_amount_loss = float(all_amount_loss) + amount_loss
                IT.save()

                cts = cts + 1

            TEMP_LOSS = PO.amount_loss
            PO.amount_loss = TEMP_LOSS - all_amount_loss

            if PO.amount_loss == 0 and PO.date_received != "":
                PO.is_processed = 1

            PO.save()
            DEL_N.current_total_amount = all_total
            DEL_N.save()

        return redirect('.')

def received_date(request, pro, dep, fund, po_number):
    reqs = "not_received"

    if not request.user.is_authenticated:
        return render(request, 'home/home.html')
    else:
        if request.method == 'POST':

            received_date = request.POST.get('date_received')

            PO_N = PurchaseOrder.objects.get(po_num=po_number)
            PO_N.date_received = received_date

            if PO_N.date_received != "" and PO_N.amount_loss == 0:
                PO_N.is_processed = 1

            PO_N.save()

            reqs = received_date


        po_dets = PurchaseOrder.objects.get(po_num=po_number)
        department = Department.objects.get(id=po_dets.department_id)
        itz = Item.objects.filter(po_id=po_dets.id);
        usr = AuthUser.objects.get(username=request.user.username)
        
        return redirect('.')
