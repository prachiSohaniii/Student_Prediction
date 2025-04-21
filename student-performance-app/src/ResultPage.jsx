import React from 'react';
import { useLocation } from 'react-router-dom';
import './Component/ResultPage.css';
import { useNavigate } from 'react-router-dom';
const ResultPage = () => {
  const location = useLocation();
  const { prediction, formData, loading, error } = location.state || {};
  const navigate = useNavigate();

  
  const getImageForPrediction = () => {
    switch (prediction) {
      case 'High':
        return '/high-performance.png';
      case 'Medium':
        return '/medium-performance.png';
      case 'Low':
        return '/low-performance.png';
      default:
        return '/default-performance.png';
    }
  };
  const handleBack = () => {
    // Navigate back with formData preserved
    navigate('/', { state: { formData } });
  };

  return (
    <div className="result-container">
      <div className="form-heading">
  <h2   style={{
      fontSize: '2rem',
      fontWeight: 'bold',
      textAlign: 'left',
      marginLeft: '8%',
      marginTop:'3%',
  }}>Prediction Result </h2>
</div>

      {loading ? ( 
        <div className="loader-overlay">
          <div className="loader"></div>
          <p>Processing your prediction...</p>
        </div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div>
        <div className="result-content-wrapper">
          <div className="image-container">
            <img 
              src={getImageForPrediction()} 
              alt="Performance result" 
              className="result-image"
            />
          </div>
          
          <div className="text-container">
            <div className="result-text">
              <h2>Predicted Performance Level:</h2>
              <p className={`prediction ${prediction?.toLowerCase()}`}>
                {prediction || 'No prediction available'}
              </p>

              {prediction === 'High' && (
                <p>This student shows excellent performance! Keep up the good work!</p>
              )}
              {prediction === 'Medium' && (
                <p>This student has average performance. There's room for improvement.</p>
              )}
              {prediction === 'Low' && (
                <p>This student may need additional support to improve their performance.</p>
              )}

              <div className="input-summary">
                <h3>Input Summary:</h3>
                <ul>
                  <li>Gender: {formData?.gender}</li>
                  <li>Race/Ethnicity: {formData?.race_ethnicity}</li>
                  <li>Parental Education: {formData?.parentalLevelOfEducation}</li>
                  <li>Math Score: {formData?.mathScore}</li>
                  <li>Reading Score: {formData?.readingScore}</li>
                  <li>Writing Score: {formData?.writingScore}</li>
                </ul>
              </div>

              <button onClick={handleBack}lassName="back-button">
                ← Back to Form
              </button>
            </div>
          </div>
        </div>
        </div>
      )}
    </div>
    
  );
};

export default ResultPage;