from django.db import models
from django.utils import timezone

class PatientData(models.Model):
    pregnancies = models.IntegerField()
    glucose = models.IntegerField()
    blood_pressure = models.IntegerField()
    insulin = models.IntegerField()
    bmi = models.FloatField()
    DiabetesPedigreefunction = models.FloatField()
    age = models.IntegerField()
    outcome = models.BooleanField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Patient {self.id} - {self.timestamp.strftime('%Y-%m-%d %H:%M')}"
    
class Feedback(models.Model):
    EMOJI_CHOICES = [
        ('😄', 'Very Helpful'),
        ('🙂', 'Helpful'),
        ('😐', 'Neutral'),
        ('🙁', 'Not Helpful'),
        ('😠', 'Frustrating'),
    ]

    emoji = models.CharField(max_length=5, choices=EMOJI_CHOICES)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.emoji} - {self.timestamp.strftime('%Y-%m-%d %H:%M')}"

class ContactMessage(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name} - {self.created_at.strftime('%Y-%m-%d %H:%M')}"
