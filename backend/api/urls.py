from django.urls import path
from . import views
from .views import predict, submit_feedback, api_home

urlpatterns = [
    path('', api_home, name='api_home'),  
    path('predict/', predict, name='predict'),
    path('contact/', views.contact_message, name='contact'),
    path('feedback/', submit_feedback, name='submit_feedback'),
]
