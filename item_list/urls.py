from django.urls import path
from . import views

urlpatterns = [
    path('', views.item_home, name=""),
    path('items/', views.items),
    # path('po_items/', views.po_items),
]
