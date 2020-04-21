from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name="home"),
    path('<deps>/', views.po_list),
    path('<deps>/<po_number>/', views.po_items),
    # path('po_items/', views.po_items),
]