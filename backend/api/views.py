from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.views.decorators.http import require_POST
import json
from django.views.decorators.http import require_http_methods
from .models import PatientData  
from .models import Feedback
import joblib
import pandas as pd
import os

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import FeedbackSerializer

MODEL_PATH = os.path.join(os.path.dirname(__file__), 'diabetes_model.pkl')

if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError("Model file not found")

model = joblib.load(MODEL_PATH)


def api_home(request):
    return JsonResponse({"message": "Welcome to the Diabetes Prediction API!"})

@api_view(['POST'])
@csrf_exempt
def predict(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            input_data = data.get("input_data")

            if not input_data or len(input_data) != 8:
                return JsonResponse({"error": "Invalid input, expected 8 features"}, status=400)

            feature_names = [
                'Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness',
                'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age'
            ]
            df = pd.DataFrame([input_data], columns=feature_names)

            pred = model.predict(df)[0]
            prob = model.predict_proba(df)[0][1]

            patient = PatientData(
                pregnancies=input_data[0],
                glucose=input_data[1],
                blood_pressure=input_data[2],
                insulin=input_data[4],
                bmi=input_data[5],
                age=input_data[7],
                outcome=pred,
                DiabetesPedigreefunction=input_data[6]
            )
            patient.save()

            importance = {}
            if hasattr(model, 'coef_'):
                importance = dict(zip(feature_names, model.coef_[0]))
            elif hasattr(model, 'feature_importances_'):
                importance = dict(zip(feature_names, model.feature_importances_))

            response = {
                "prediction": "Positive" if pred == 1 else "Negative",
                "probability": round(prob, 3),
                "feature_importance": importance,
                "pregnancies": input_data[0],
                "glucose": input_data[1],
                "blood_pressure": input_data[2],
                "insulin": input_data[4],
                "bmi": input_data[5],
                "age": input_data[7],
                "DiabetesPedigreefunction": input_data[6]
            }

            return JsonResponse(response)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)


@api_view(['POST'])
@csrf_exempt
def submit_feedback(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            emoji = data.get('emoji', '')

            if emoji not in dict(Feedback.EMOJI_CHOICES).keys():
                return JsonResponse({'error': 'Invalid emoji'}, status=400)

            feedback = Feedback.objects.create(emoji=emoji)
            feedback.save()

            print(f"Received feedback: {emoji}")  

            return JsonResponse({'message': 'Feedback received successfully'}, status=200)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    return JsonResponse({'error': 'Invalid method'}, status=405)

import logging

logger = logging.getLogger(__name__)

@api_view(['POST'])
@csrf_exempt
def contact_message(request):
    if request.method == "POST":
        try:
            logger.info(f"Received data: {request.body}")  # Log the raw request body
            data = json.loads(request.body)

            name = data.get("name")
            email = data.get("email")
            message = data.get("message")

            if name and email and message:
                ContactMessage.objects.create(name=name, email=email, message=message)
                return JsonResponse({"status": "success", "message": "Message sent successfully!"})
            else:
                return JsonResponse({"status": "error", "message": "Missing required fields."}, status=400)

        except json.JSONDecodeError:
            return JsonResponse({"status": "error", "message": "Invalid JSON format."}, status=400)
    return JsonResponse({"status": "error", "message": "Invalid request method."}, status=405)
