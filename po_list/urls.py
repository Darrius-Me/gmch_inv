from django.urls import path
from . import views

urlpatterns = [
    path('', views.po_home, name=""),
    path('<deps>/', views.po_list),
    path('<deps>/<po_number>/', views.po_items),
    path('add_po', views.add_po, name="add_po"),
    path('process_add', views.process_add, name="process_add"),
    # path('po_items/', views.po_items),
]
