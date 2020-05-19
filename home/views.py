from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate
from po_list.models import PurchaseOrder, Item, Department, AuthUser
# Create your views here.

def home(request):
    if request.user.is_authenticated:
        return redirect('startup')
    else:
        return render(request, 'home/home.html')

def startup(request):
    if not request.user.is_authenticated:
        return render(request, 'home/home.html')
    else:
        usr = AuthUser.objects.get(username=request.user.username)
        return render(request, 'home/startup.html', context={'usr': usr})


def loginuser(request):
    user = authenticate(request, username=request.POST['username'], password=request.POST['password'])
    if user is None:
        return render(request, 'home/home.html', context={'error': 'User credentials error!'})
    else:
        login(request, user)
        return redirect('startup')

def logoutuser(request):
    logout(request)
    return redirect('home')
