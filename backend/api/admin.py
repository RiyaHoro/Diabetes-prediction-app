from django.contrib import admin
from .models import PatientData

@admin.register(PatientData)
class PatientDataAdmin(admin.ModelAdmin):
    list_display = ('id', 'pregnancies', 'glucose', 'blood_pressure', 'insulin', 'bmi', 'age', 'outcome', 'DiabetesPedigreefunction')
    search_fields = ('glucose', 'age', 'outcome')
    list_filter = ('outcome',)
