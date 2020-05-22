from django.urls import path
from . import views

urlpatterns = [
    path('', views.po_home, name=""),
    path('<pro>-<dep>-<fund>/', views.po_list),
    path('<pro>-<dep>-<fund>/<po_number>/', views.po_items),
    path('add_po', views.add_po, name="add_po"),
    path('process_add', views.process_add, name="process_add"),
    # path('success_add', views.success_add, name="success_add"),
    path('<pro>-<dep>-<fund>/<po_number>/process', views.process_po),
    path('<pro>-<dep>-<fund>/<po_number>/processing_po', views.processing_po, name="processing_po"),
    path('<pro>-<dep>-<fund>/<po_number>/received_date', views.received_date, name="received_date"),
    # path('po_items/', views.po_items),
]
