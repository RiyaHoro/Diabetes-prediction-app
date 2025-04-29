from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .models import PatientData  # Add this at the top
import joblib
import pandas as pd
import os
import json
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import FeedbackSerializer

MODEL_PATH = os.path.join(os.path.dirname(__file__), 'diabetes_model.pkl')

if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError("Model file not found")

model = joblib.load(MODEL_PATH)



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

            # Save data to database
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
def submit_feedback(request):
    print("Request data:", request.data)
    serializer = FeedbackSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Feedback submitted successfully'}, status=201)
    return Response(serializer.errors, status=400)
