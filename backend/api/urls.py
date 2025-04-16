# api/urls.py
from django.urls import path
from .views import predict  # Make sure this import is correct

urlpatterns = [
    path('predict/', predict),  # Ensure this is the correct route
]
