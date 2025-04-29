from django.urls import path
from .views import predict, submit_feedback, api_home

urlpatterns = [
    path('', api_home, name='api_home'),  # Home endpoint for /api/
    path('predict/', predict, name='predict'),
    path('feedback/', submit_feedback, name='submit_feedback'),
]
