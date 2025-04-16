from django.urls import path
from .views import predict

urlpatterns = [
    path("predict/", predict),  # make sure this is here
]
