from django.db import models
from django.utils import timezone

# Create your models here.

class PatientData(models.Model):
    pregnancies = models.IntegerField()
    glucose = models.IntegerField()
    blood_pressure = models.IntegerField()
    insulin = models.IntegerField()
    bmi = models.FloatField()
    DiabetesPedigreefunction = models.FloatField()
    age = models.IntegerField()
    outcome = models.BooleanField()
    timestamp = models.DateTimeField(default=timezone.now)


class Feedback(models.Model):
    EMOJI_CHOICES = [
        ('😄', 'Very Helpful'),
        ('🙂', 'Helpful'),
        ('😐', 'Neutral'),
        ('🙁', 'Not Helpful'),
        ('😠', 'Frustrating'),
    ]

    emoji = models.CharField(max_length=5, choices=EMOJI_CHOICES)
    comment = models.TextField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    

    def __str__(self):
        return f"{self.emoji} - {self.timestamp.strftime('%Y-%m-%d %H:%M')}"
