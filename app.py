from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

# Load trained model
model = pickle.load(open('student_performance_model.pkl', 'rb'))

# Create Flask app
app = Flask(__name__)

# Enable CORS specifically for React frontend
CORS(app, resources={r"/predict": {"origins": "http://localhost:3000"}})

# Define preprocessing functions as per your preprocessing logic
def encode_data(data):
    # Encode categorical features using the same mapping logic from your preprocessing script
    gender = 1 if data['gender'].lower() == 'female' else 0
    lunch = 1 if data['lunch'].lower() == 'standard' else 0
    test_prep = 1 if data['testPreparationCourse'].lower() == 'completed' else 0

    # Encoding race_ethnicity
    race_map = {
        "Group 1 - Urban Background": 0,
        "Group 2 - Rural Background": 1,
        "Group 3 - Suburban Region": 2,
        "Group 4 - Coastal Region": 3,
        "Group 5 - Diverse Culture": 4
    }
    race_ethnicity = race_map.get(data['race_ethnicity'], 0)  # Ensure correct key

    # Encoding parental_level_of_education
    education_map = {
        "some high school": 0,
        "high school": 1,
        "some college": 2,
        "associate's degree": 3,
        "bachelor's degree": 4,
        "master's degree": 5
    }
    parental_education = education_map.get(data['parentalLevelOfEducation'].lower(), 1)  # Corrected key

    # Calculate average score
    math_score = int(data['mathScore'])  # Convert to integer
    reading_score = int(data['readingScore'])  # Convert to integer
    writing_score = int(data['writingScore'])  # Convert to integer
    average_score = (math_score + reading_score + writing_score) / 3  # Calculate average score

    # Determine performance level (based on average score)
    if average_score >= 80:
        performance_level = 2  # High
    elif average_score >= 60:
        performance_level = 1  # Medium
    else:
        performance_level = 0  # Low

    return {
        'gender': gender,
        'race_ethnicity': race_ethnicity,
        'parental_education': parental_education,
        'lunch': lunch,
        'test_prep': test_prep,
        'math_score': math_score,
        'reading_score': reading_score,
        'writing_score': writing_score,
        'average_score': average_score,
        'performance_level': performance_level
    }

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    print("Received data:", data)

    # Preprocess the data using the encode_data function
    processed_data = encode_data(data)

    # Prepare input data for model prediction
    input_data = np.array([[
        processed_data['gender'],
        processed_data['race_ethnicity'],
        processed_data['parental_education'],
        processed_data['lunch'],
        processed_data['test_prep'],
        processed_data['math_score'],
        processed_data['reading_score'],
        processed_data['writing_score'],
        processed_data['average_score']
    ]])

    # Predict the performance level
    pred = model.predict(input_data)[0]

    # Map prediction to performance level
    level_map = {0: "Low", 1: "Medium", 2: "High"}
    performance = level_map.get(pred, "Unknown")

    return jsonify({
        'predicted_performance_level': performance,
        'average_score': processed_data['average_score']
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

