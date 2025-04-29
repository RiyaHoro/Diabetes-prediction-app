from django.contrib import admin
from .models import PatientData
from .models import Feedback

@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('emoji', 'timestamp')  # Include timestamp
    search_fields = ('emoji',)  # Allow searching by emoji and comment
    list_filter = ('timestamp',)  # Optionally filter feedback by timestamp

@admin.register(PatientData)
class PatientDataAdmin(admin.ModelAdmin):
    list_display = ('id', 'pregnancies', 'glucose', 'blood_pressure', 'insulin', 'bmi', 'age', 'outcome', 'DiabetesPedigreefunction','timestamp')
    search_fields = ('glucose', 'age', 'outcome')
    list_filter = ('outcome',)
