from django.db import models

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
