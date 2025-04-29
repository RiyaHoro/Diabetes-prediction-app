# api/urls.py
from django.urls import path
from .views import predict, submit_feedback

urlpatterns = [
    path('predict/', predict, name='predict'),
    path('feedback/', submit_feedback, name='submit_feedback'),
]
