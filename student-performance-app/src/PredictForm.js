import React, { useState } from "react";
import axios from "axios";
import "./Component/Form.css";
import { useNavigate } from "react-router-dom";

const PredictForm = () => {
  const [formData, setFormData] = useState({
    age: "",
    Medu: "",
    Fedu: "",
    traveltime: "",
    studytime: "",
    failures: "",
    famrel: "",
    freetime: "",
    goout: "",
    Walc: "",
    health: "",
    absences: "",
    G1: "",
    G2: "",
    school: "",
    Mjob: "",
    reason: "",
    guardian: "",
    schoolsup: "",
    paid: "",
    activities: "",
  });

  const [activeTooltip, setActiveTooltip] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleTooltip = (fieldName) => {
    setActiveTooltip(activeTooltip === fieldName ? null : fieldName);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    navigate("/result", { state: { loading: true } });

    try {
      const response = await axios.post(
        "https://student-predictionns.onrender.com/predict",
        formData
      );
      navigate("/result", {
        state: {
          prediction: response.data.performance_level,
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

  const tooltips = {
    age: "Student's age in years (15-22)",
    Medu: "Mother's Education: 0-none, 1-primary, 2-middle, 3-secondary, 4-higher",
    Fedu: "Father's Education: 0-none, 1-primary, 2-middle, 3-secondary, 4-higher",
    traveltime: "Travel Time: 1-<15min, 2-15-30min, 3-30-60min, 4->60min",
    studytime: "Study Time: 1-<2hrs, 2-2-5hrs, 3-5-10hrs, 4->10hrs",
    failures: "Number of past class failures (0-3)",
    famrel: "Family Relationship: 1-very bad, 2-bad, 3-average, 4-good, 5-excellent",
    freetime: "Free Time: 1-very low, 2-low, 3-average, 4-high, 5-very high",
    goout: "Going Out: 1-very low, 2-low, 3-average, 4-high, 5-very high",
    Walc: "Weekend Alcohol: 1-very low, 2-low, 3-average, 4-high, 5-very high",
    health: "Health Status: 1-very bad, 2-bad, 3-average, 4-good, 5-very good",
    absences: "Number of school absences (0-93)",
    G1: "First period grade (0-20)",
    G2: "Second period grade (0-20)"
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
          src="/college-project-pana.png"
          alt="Student Study"
          className="side-image"
        />
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>🎓 Predictor Form</h2>

          {/* Row 1 */}
          <div className="input-row">
            <div className="input-group">
              <div className="input-with-tooltip">
                <input
                  name="age"
                  type="number"
                  placeholder="Age (15-22)"
                  onChange={handleChange}
                  required
                  min="15"
                  max="22"
                  onClick={() => toggleTooltip("age")}
                />
                {activeTooltip === "age" && (
                  <div className="tooltip">
                    {tooltips.age}
                    <button 
                      type="button" 
                      className="close-tooltip"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveTooltip(null);
                      }}
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="input-group">
              <div className="input-with-tooltip">
                <input
                  name="Medu"
                  type="number"
                  placeholder="Mother's Education (0-4)"
                  onChange={handleChange}
                  required
                  min="0"
                  max="4"
                  onClick={() => toggleTooltip("Medu")}
                />
                {activeTooltip === "Medu" && (
                  <div className="tooltip">
                    {tooltips.Medu}
                    <button 
                      type="button" 
                      className="close-tooltip"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveTooltip(null);
                      }}
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="input-row">
            <div className="input-group">
              <div className="input-with-tooltip">
                <input
                  name="Fedu"
                  type="number"
                  placeholder="Father's Education (0-4)"
                  onChange={handleChange}
                  required
                  min="0"
                  max="4"
                  onClick={() => toggleTooltip("Fedu")}
                />
                {activeTooltip === "Fedu" && (
                  <div className="tooltip">
                    {tooltips.Fedu}
                    <button 
                      type="button" 
                      className="close-tooltip"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveTooltip(null);
                      }}
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="input-group">
              <div className="input-with-tooltip">
                <input
                  name="traveltime"
                  type="number"
                  placeholder="Travel Time (1-4)"
                  onChange={handleChange}
                  required
                  min="1"
                  max="4"
                  onClick={() => toggleTooltip("traveltime")}
                />
                {activeTooltip === "traveltime" && (
                  <div className="tooltip">
                    {tooltips.traveltime}
                    <button 
                      type="button" 
                      className="close-tooltip"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveTooltip(null);
                      }}
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Row 3 */}
          <div className="input-row">
            <div className="input-group">
              <div className="input-with-tooltip">
                <input
                  name="studytime"
                  type="number"
                  placeholder="Study Time (1-4)"
                  onChange={handleChange}
                  required
                  min="1"
                  max="4"
                  onClick={() => toggleTooltip("studytime")}
                />
                {activeTooltip === "studytime" && (
                  <div className="tooltip">
                    {tooltips.studytime}
                    <button 
                      type="button" 
                      className="close-tooltip"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveTooltip(null);
                      }}
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="input-group">
              <div className="input-with-tooltip">
                <input
                  name="failures"
                  type="number"
                  placeholder="Past Failures (0-3)"
                  onChange={handleChange}
                  required
                  min="0"
                  max="3"
                  onClick={() => toggleTooltip("failures")}
                />
                {activeTooltip === "failures" && (
                  <div className="tooltip">
                    {tooltips.failures}
                    <button 
                      type="button" 
                      className="close-tooltip"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveTooltip(null);
                      }}
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Row 4 */}
          <div className="input-row">
            <div className="input-group">
              <div className="input-with-tooltip">
                <input
                  name="famrel"
                  type="number"
                  placeholder="Family Quality (1-5)"
                  onChange={handleChange}
                  required
                  min="1"
                  max="5"
                  onClick={() => toggleTooltip("famrel")}
                />
                {activeTooltip === "famrel" && (
                  <div className="tooltip">
                    {tooltips.famrel}
                    <button 
                      type="button" 
                      className="close-tooltip"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveTooltip(null);
                      }}
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="input-group">
              <div className="input-with-tooltip">
                <input
                  name="freetime"
                  type="number"
                  placeholder="Free Time (1-5)"
                  onChange={handleChange}
                  required
                  min="1"
                  max="5"
                  onClick={() => toggleTooltip("freetime")}
                />
                {activeTooltip === "freetime" && (
                  <div className="tooltip">
                    {tooltips.freetime}
                    <button 
                      type="button" 
                      className="close-tooltip"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveTooltip(null);
                      }}
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Row 5 */}
          <div className="input-row">
            <div className="input-group">
              <div className="input-with-tooltip">
                <input
                  name="goout"
                  type="number"
                  placeholder="Going Out (1-5)"
                  onChange={handleChange}
                  required
                  min="1"
                  max="5"
                  onClick={() => toggleTooltip("goout")}
                />
                {activeTooltip === "goout" && (
                  <div className="tooltip">
                    {tooltips.goout}
                    <button 
                      type="button" 
                      className="close-tooltip"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveTooltip(null);
                      }}
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="input-group">
              <div className="input-with-tooltip">
                <input
                  name="Walc"
                  type="number"
                  placeholder="Weekend Alcohol (1-5)"
                  onChange={handleChange}
                  required
                  min="1"
                  max="5"
                  onClick={() => toggleTooltip("Walc")}
                />
                {activeTooltip === "Walc" && (
                  <div className="tooltip">
                    {tooltips.Walc}
                    <button 
                      type="button" 
                      className="close-tooltip"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveTooltip(null);
                      }}
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Row 6 */}
          <div className="input-row">
            <div className="input-group">
              <div className="input-with-tooltip">
                <input
                  name="health"
                  type="number"
                  placeholder="Health Status (1-5)"
                  onChange={handleChange}
                  required
                  min="1"
                  max="5"
                  onClick={() => toggleTooltip("health")}
                />
                {activeTooltip === "health" && (
                  <div className="tooltip">
                    {tooltips.health}
                    <button 
                      type="button" 
                      className="close-tooltip"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveTooltip(null);
                      }}
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="input-group">
              <div className="input-with-tooltip">
                <input
                  name="absences"
                  type="number"
                  placeholder="Absences (0-93)"
                  onChange={handleChange}
                  required
                  min="0"
                  max="93"
                  onClick={() => toggleTooltip("absences")}
                />
                {activeTooltip === "absences" && (
                  <div className="tooltip">
                    {tooltips.absences}
                    <button 
                      type="button" 
                      className="close-tooltip"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveTooltip(null);
                      }}
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Row 7 */}
          <div className="input-row">
            <div className="input-group">
              <div className="input-with-tooltip">
                <input
                  name="G1"
                  type="number"
                  placeholder="Grade 1 (0-20)"
                  onChange={handleChange}
                  required
                  min="0"
                  max="20"
                  onClick={() => toggleTooltip("G1")}
                />
                {activeTooltip === "G1" && (
                  <div className="tooltip">
                    {tooltips.G1}
                    <button 
                      type="button" 
                      className="close-tooltip"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveTooltip(null);
                      }}
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="input-group">
              <div className="input-with-tooltip">
                <input
                  name="G2"
                  type="number"
                  placeholder="Grade 2 (0-20)"
                  onChange={handleChange}
                  required
                  min="0"
                  max="20"
                  onClick={() => toggleTooltip("G2")}
                />
                {activeTooltip === "G2" && (
                  <div className="tooltip">
                    {tooltips.G2}
                    <button 
                      type="button" 
                      className="close-tooltip"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveTooltip(null);
                      }}
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Row 8 - Select Fields */}
          <div className="input-row">
            <div className="input-group">
              <select name="school" onChange={handleChange} required>
                <option value="">Select School</option>
                <option value="MS">MS School</option>
                <option value="GT">GT School</option>
              </select>
            </div>
            <div className="input-group">
              <select name="Mjob" onChange={handleChange} required>
                <option value="">Mother's Job</option>
                <option value="teacher">Teacher</option>
                <option value="health">Healthcare</option>
                <option value="services">Civil Services</option>
                <option value="at_home">At Home</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Row 9 - Select Fields */}
          <div className="input-row">
            <div className="input-group">
              <select name="reason" onChange={handleChange} required>
                <option value="">School Reason</option>
                <option value="home">Close to Home</option>
                <option value="reputation">Reputation</option>
                <option value="course">Course Preference</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="input-group">
              <select name="guardian" onChange={handleChange} required>
                <option value="">Guardian</option>
                <option value="mother">Mother</option>
                <option value="father">Father</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Row 10 - Select Fields */}
          <div className="input-row">
            <div className="input-group">
              <select name="schoolsup" onChange={handleChange} required>
                <option value="">Extra Support</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="input-group">
              <select name="paid" onChange={handleChange} required>
                <option value="">Paid Classes</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>

          {/* Row 11 - Single Select Field */}
          <div className="input-row">
            <div className="input-group">
              <select name="activities" onChange={handleChange} required>
                <option value="">Extracurricular</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <button type="submit">Predict Performance</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PredictForm;