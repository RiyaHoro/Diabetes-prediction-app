from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

# Optional homepage view
def home_view(request):
    return HttpResponse("Welcome to the Diabetes Prediction API!")

urlpatterns = [
    path('', home_view, name='home'),  # Home endpoint for the root URL
    path('admin/', admin.site.urls),   # Admin panel
    path('api/', include('api.urls')), # Including API URLs
]
