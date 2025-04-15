import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
import joblib

csv_path = 'E:/web development/Diabetes_prediction/backend/api/diabetes.csv'
data = pd.read_csv(csv_path)

X = data.drop("Outcome", axis=1)
Y = data["Outcome"]

model = LogisticRegression()
model.fit(X, Y)

# Save model
joblib.dump(model, 'diabetes_model.pkl')
