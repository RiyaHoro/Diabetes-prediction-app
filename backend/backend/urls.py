# backend/urls.py
from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

# Optional homepage view
def home_view(request):
    return HttpResponse("Welcome to the Diabetes Prediction API!")

urlpatterns = [
    path('', home_view, name='home'),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]
