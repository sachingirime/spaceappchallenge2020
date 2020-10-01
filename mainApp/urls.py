  
from . import views
from django.urls import path


urlpatterns = [
    path("", views.home, name='home'),
    path("three-dimensions/",views.threeDimensional, name='threeDimensional'),
    path('<slug:slug>/', views.PostDetail, name='post_detail'),
    path('about/', views.about, name='about'),
]