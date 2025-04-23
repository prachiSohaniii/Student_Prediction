from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import gzip

# Load the compressed model
with gzip.open('student_performance_model_compressed.pkl', 'rb') as f:
    model = joblib.load(f)

app = Flask(__name__)
CORS(app)

# Feature order used during model training
FEATURE_ORDER = [
    'age', 'Medu', 'Fedu', 'traveltime', 'studytime', 'failures', 'famrel',
    'freetime', 'goout', 'Walc', 'health', 'absences', 'G1', 'G2',
    'school_1', 'Mjob_4', 'reason_1', 'guardian_1', 'schoolsup_1',
    'paid_1', 'activities_1'
]

# Convert G3 score into a performance level
def categorize_performance(score):
    if score >= 15:
        return "High"
    elif score >= 10:
        return "Medium"
    else:
        return "Low"

# Function to preprocess user input
def preprocess_input(data):
    # Encode binary categorical features
    school    = 1 if data.get('school') == 'MS' else 0
    Mjob      = 1 if data.get('Mjob') == 'teacher' else 0
    reason     = 1 if data.get('reason') == 'home' else 0
    guardian   = 1 if data.get('guardian') == 'mother' else 0
    schoolsup  = 1 if data.get('schoolsup') == 'yes' else 0
    paid      = 1 if data.get('paid') == 'yes' else 0
    activities = 1 if data.get('activities') == 'yes' else 0

    # Prepare full input list in correct order
    return [
        int(data.get('age', 0)),
        int(data.get('Medu', 0)),
        int(data.get('Fedu', 0)),
        int(data.get('traveltime', 1)),
        int(data.get('studytime', 1)),
        int(data.get('failures', 0)),
        int(data.get('famrel', 3)),
        int(data.get('freetime', 3)),
        int(data.get('goout', 3)),
        int(data.get('Walc', 1)),
        int(data.get('health', 3)),
        int(data.get('absences', 0)),
        int(data.get('G1', 10)),
        int(data.get('G2', 10)),
        school,
        Mjob,
        reason,
        guardian,
        schoolsup,
        paid,
        activities
    ]

# Define prediction route
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        print("Received raw input:", data)

        # Encode and preprocess input
        input_data = preprocess_input(data)
        input_array = np.array([input_data])

        # Predict G3 score
        predicted_score = model.predict(input_array)[0]
        performance_level = categorize_performance(predicted_score)

        return jsonify({
            'predicted_G3_score': round(float(predicted_score), 2),
            'performance_level': performance_level
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Start server
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
