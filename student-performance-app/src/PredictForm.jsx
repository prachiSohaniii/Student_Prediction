import React, { useState } from "react";
import axios from "axios";
import style from "./Component/Form.css";
import { useNavigate } from "react-router-dom";

const PredictForm = () => {
  const [formData, setFormData] = useState({
    gender: "",
    race_ethnicity: "",
    parentalLevelOfEducation: "",
    lunch: "",
    testPreparationCourse: "",
    mathScore: "",
    readingScore: "",
    writingScore: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const averageScore =
      (Number(formData.mathScore) +
        Number(formData.readingScore) +
        Number(formData.writingScore)) /
      3;

    // Navigate early with a loading state
    navigate("/result", { state: { loading: true } });

    try {
      const response = await axios.post(
        "https://student-predictionns.onrender.com/predict",
        {
          ...formData,
          average_score: averageScore,
        }
      );

      // Send prediction data after API call
      navigate("/result", {
        state: {
          prediction: response.data.predicted_performance_level,
          formData: formData,
          loading: false,
        },
      });
    } catch (error) {
      console.error("Error fetching prediction", error);
      navigate("/result", {
        state: {
          error: "Failed to get prediction. Please try again.",
          loading: false,
        },
      });
    }
  };

  return (
    <div className="container">
      <div className="left-side">
        <h2>Student Performance Prediction</h2>
        <p>
          Understanding student performance can help educators and parents
          better support learners. This tool predicts performance levels based
          on student background and test scores.
        </p>
        <img
          src="/college project-pana.png"
          alt="Student Study"
          className="side-image"
        />
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>🎓 Predictor Form</h2>

          <select name="gender" onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <select name="race_ethnicity" onChange={handleChange} required>
            <option value="">Race/Ethnicity</option>
            <option value="group A">Group A</option>
            <option value="group B">Group B</option>
            <option value="group C">Group C</option>
            <option value="group D">Group D</option>
            <option value="group E">Group E</option>
          </select>

          <select
            name="parentalLevelOfEducation"
            onChange={handleChange}
            required
          >
            <option value="">Parental Education</option>
            <option value="high school">High School</option>
            <option value="some high school">Some High School</option>
            <option value="some college">Some College</option>
            <option value="associate's degree">Associate's Degree</option>
            <option value="bachelor's degree">Bachelor's Degree</option>
            <option value="master's degree">Master's Degree</option>
          </select>

          <select name="lunch" onChange={handleChange} required>
            <option value="">Lunch</option>
            <option value="standard">Standard</option>
            <option value="free/reduced">Free/Reduced</option>
          </select>

          <select name="testPreparationCourse" onChange={handleChange} required>
            <option value="">Test Preparation Course</option>
            <option value="none">None</option>
            <option value="completed">Completed</option>
          </select>

          <input
            name="mathScore"
            type="number"
            placeholder="Math Score"
            onChange={handleChange}
            required
            style={{
              width: "94.5%",
              // padding: "10px",
              // margin: "10px 0",
              borderRadius: "8px",
            }}
          />
          <input
            name="readingScore"
            type="number"
            placeholder="Reading Score"
            onChange={handleChange}
            required
            style={{
              width: "94.5%",
              // padding: "10px",
              // margin: "10px 0",
              borderRadius: "8px",
            }}
          />
          <input
            name="writingScore"
            type="number"
            placeholder="Writing Score"
            onChange={handleChange}
            required
            
            style={{
              width: "94.5%",
              // padding: "10px",
              // margin: "10px 0",
              borderRadius: "8px",
            }}
          />

          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                backgroundColor: "#007BFF",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              Predict
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PredictForm;
