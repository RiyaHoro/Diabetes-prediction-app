from rest_framework import serializers
from .models import PatientData
from .models import Feedback
from .models import ContactMessage 

class PatientDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientData
        fields = '__all__'

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ['emoji', 'timestamp'] 
        read_only_fields = ['timestamp']
      


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage  # Use the model correctly here
        fields = ['name', 'email', 'message', 'timestamp']
        read_only_fields = ['timestamp']