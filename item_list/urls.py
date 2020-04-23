from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name="home"),
    path('items/', views.items),
    # path('po_items/', views.po_items),
]
