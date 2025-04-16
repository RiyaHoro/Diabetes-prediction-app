from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import joblib
import pandas as pd
import os
import json

MODEL_PATH = os.path.join(os.path.dirname(__file__), 'diabetes_model.pkl')
model = joblib.load(MODEL_PATH)

@csrf_exempt
def predict(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            input_data = data.get("input_data")

            if not input_data or len(input_data) != 8:
                return JsonResponse({"error": "Invalid input"}, status=400)

            df = pd.DataFrame([input_data], columns=[
                'Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness',
                'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age'
            ])
            pred = model.predict(df)[0]
            prob = model.predict_proba(df)[0][1]

            return JsonResponse({
                "prediction": "Positive" if pred == 1 else "Negative",
                "probability": round(prob, 3)
            })
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)
