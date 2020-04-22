from django.contrib import admin
from .models import PurchaseOrder, Department, Item
# Register your models here.

admin.site.register(PurchaseOrder)
admin.site.register(Department)
admin.site.register(Item)
