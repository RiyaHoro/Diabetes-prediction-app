from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import joblib
import pandas as pd
import os
import json

MODEL_PATH = os.path.join(os.path.dirname(__file__), 'diabetes_model.pkl')

if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError("Model file not found")

model = joblib.load(MODEL_PATH)

@csrf_exempt
def predict(request):
    if request.method == 'POST':
        try:
            print("Raw request body:", request.body)

            data = json.loads(request.body)
            input_data = data.get("input_data")

            print("Parsed input_data:", input_data)

            if not input_data or len(input_data) != 8:
                return JsonResponse({"error": "Invalid input, expected 8 features"}, status=400)

            feature_names = [
                'Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness',
                'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age'
            ]
            df = pd.DataFrame([input_data], columns=feature_names)

            pred = model.predict(df)[0]
            prob = model.predict_proba(df)[0][1]

            importance = {}
            if hasattr(model, 'coef_'):
                importance = dict(zip(feature_names, model.coef_[0]))
            elif hasattr(model, 'feature_importances_'):
                importance = dict(zip(feature_names, model.feature_importances_))

            # Add lowercase input values to response
            input_features = {
                feature.lower(): value
                for feature, value in zip(feature_names, input_data)
            }
            print("Input features to return:", input_features)

            response = {
                "prediction": "Positive" if pred == 1 else "Negative",
                "probability": round(prob, 3),
                "feature_importance": importance,
                **input_features
            }

            print("Full response:", response)
            return JsonResponse(response)

        except Exception as e:
            print("Error:", str(e))
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)
