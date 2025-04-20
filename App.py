from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

# Load trained model
model = pickle.load(open('D:\Project\Project2\student_performance_model.pkl', 'rb'))

app = Flask(__name__)
CORS(app)  # Enable CORS for React to communicate

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    # Encode categorical data using simple if-else
    gender = 1 if data['gender'].lower() == 'female' else 0
    lunch = 1 if data['lunch'].lower() == 'standard' else 0
    test_prep = 1 if data['test_preparation_course'].lower() == 'completed' else 0

    # Encoding race_ethnicity
    race_map = {
        "Group 1 - Urban Background": 0,
        "Group 2 - Rural Background": 1,
        "Group 3 - Suburban Region": 2,
        "Group 4 - Coastal Region": 3,
        "Group 5 - Diverse Culture": 4
    }
    race_ethnicity = race_map.get(data['race_ethnicity'], 0)

    # Encoding parental_level_of_education
    education_map = {
        "some high school": 0,
        "high school": 1,
        "some college": 2,
        "associate's degree": 3,
        "bachelor's degree": 4,
        "master's degree": 5
    }
    parental_education = education_map.get(data['parental_level_of_education'].lower(), 1)

    # Prepare input data with the updated column names
    input_data = np.array([[
        gender,
        race_ethnicity,
        parental_education,
        lunch,
        test_prep,
        data['math score'],  # Adjusted to match the exact column name
        data['reading score'],  # Adjusted to match the exact column name
        data['writing score']  # Adjusted to match the exact column name
    ]])

    # Predict
    pred = model.predict(input_data)[0]

    # Map prediction to readable levels
    level_map = {0: "Low", 1: "Medium", 2: "High"}
    performance = level_map.get(pred, "Unknown")

    return jsonify({'predicted_performance_level': performance})

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0')
