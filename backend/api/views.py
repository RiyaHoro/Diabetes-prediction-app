from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import joblib
import pandas as pd
import os
import json

MODEL_PATH = os.path.join(os.path.dirname(__file__), 'diabetes_model.pkl')

# Check if the model exists
if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError("Model file not found")

# Load the model
model = joblib.load(MODEL_PATH)

@csrf_exempt
def predict(request):
    if request.method == 'POST':
        try:
            # Attempt to load the JSON data
            try:
                data = json.loads(request.body)
            except json.JSONDecodeError:
                return JsonResponse({"error": "Invalid JSON format"}, status=400)

            input_data = data.get("input_data")

            # Validate input data
            if not input_data or len(input_data) != 8:
                return JsonResponse({"error": "Invalid input, expected 8 features"}, status=400)

            # Prepare data for prediction
            df = pd.DataFrame([input_data], columns=[
                'Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness',
                'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age'
            ])

            # Predict using the model
            pred = model.predict(df)[0]
            prob = model.predict_proba(df)[0][1]

            # Return prediction result
            return JsonResponse({
                "prediction": "Positive" if pred == 1 else "Negative",
                "probability": round(prob, 3)
            })
        except Exception as e:
            # Return error if something goes wrong
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)
