import React, { useState } from 'react';
import axios from 'axios';

const PredictForm = () => {
  const [formData, setFormData] = useState({
    gender: '',
    race_ethnicity: '',
    parentalLevelOfEducation: '',
    lunch: '',
    testPreparationCourse: '',
    mathScore: '',
    readingScore: '',
    writingScore: '',
  });

  const [prediction, setPrediction] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const averageScore = (formData["math score"] + formData["reading score"] + formData["writing score"]) / 3;
  
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        ...formData,
        average_score: averageScore  // optional if you want to send it too (not needed now since backend calculates it)
      });
  
      setPrediction(response.data.predicted_performance_level);
    } catch (error) {
      console.error("Error fetching prediction", error);
    }
  };
  
  return (
    <div style={{ padding: '20px' }}>
      <h2>Student Performance Prediction</h2>
      <form onSubmit={handleSubmit}>
        <input name="gender" placeholder="Gender" onChange={handleChange} required />
        <input name="race_ethnicity" placeholder="Race/Ethnicity" onChange={handleChange} required />
        <input name="parentalLevelOfEducation" placeholder="Parental Level of Education" onChange={handleChange} required />
        <input name="lunch" placeholder="Lunch" onChange={handleChange} required />
        <input name="testPreparationCourse" placeholder="Test Preparation Course" onChange={handleChange} required />
        <input name="mathScore" placeholder="Math Score" type="number" onChange={handleChange} required />
        <input name="readingScore" placeholder="Reading Score" type="number" onChange={handleChange} required />
        <input name="writingScore" placeholder="Writing Score" type="number" onChange={handleChange} required />
        <br /><br />
        <button type="submit">Predict</button>
      </form>

      {prediction && (
        <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
          Predicted Performance Level: {prediction}
        </div>
      )}
    </div>
  );
};

export default PredictForm;
