from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name=""),
    path('items/', views.items),
    # path('po_items/', views.po_items),
]
