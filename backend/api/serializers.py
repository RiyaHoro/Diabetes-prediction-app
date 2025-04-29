from rest_framework import serializers
from .models import PatientData
from .models import Feedback

class PatientDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientData
        fields = '__all__'

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ['emoji', 'comment', 'timestamp']  # Include timestamp
        read_only_fields = ['timestamp']
      
