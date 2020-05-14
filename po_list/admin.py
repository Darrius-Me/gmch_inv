from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import PurchaseOrder, Department, Item, AuthUser
# Register your models here.

class AccountAdmin(UserAdmin):
    list_display = ('username', 'last_login', 'is_admin')
    search_fields = ('username',)
    readonly_fields = ('date_joined', 'last_login')

    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()

class PurchaseOrderAdmin(admin.ModelAdmin):
    list_display = ('po_num', 'charge_to', 'supplier', 'purchase_request')
    search_fields = ('po_num', 'charge_to', 'supplier', 'purchase_request')
    readonly_fields = ('po_num', 'charge_to', 'supplier', 'purchase_request')

    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()

class ItemAdmin(admin.ModelAdmin):
    list_display = ('description', 'brand', 'unit_cost', 'quantity', 'unit')
    search_fields = ('description', 'brand', 'unit_cost', 'quantity', 'unit')
    readonly_fields = ('description', 'brand', 'unit_cost', 'quantity', 'unit')

    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()

admin.site.register(PurchaseOrder, PurchaseOrderAdmin)
admin.site.register(Department)
admin.site.register(Item, ItemAdmin)
admin.site.register(AuthUser, AccountAdmin)
# admin.site.register(AccountAdmin)
