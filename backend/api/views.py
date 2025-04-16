from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import pandas as pd
import joblib
import os

# Load the model once
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'diabetes_model.pkl')
model = joblib.load(MODEL_PATH)

# Define the expected feature names
FEATURE_NAMES = [
    'Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness',
    'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age'
]

@csrf_exempt
def predict(request):
    if request.method == 'POST':
        try:
            input_data = request.body.decode('utf-8')
            input_data = eval(input_data).get('input_data')

            if not input_data or len(input_data) != 8:
                return JsonResponse({"error": "Invalid input. Expecting a list of 8 numbers."}, status=400)

            # Convert to DataFrame for prediction
            input_df = pd.DataFrame([input_data], columns=FEATURE_NAMES)

            prediction = model.predict(input_df)[0]
            probability = model.predict_proba(input_df)[0][1]

            return JsonResponse({
                "prediction": "Positive" if prediction == 1 else "Negative",
                "probability": round(probability, 3),
                "input_data": input_data
            })
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Only POST method is allowed."}, status=405)
