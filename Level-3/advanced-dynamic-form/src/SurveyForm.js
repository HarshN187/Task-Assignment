import React, { useState, useEffect } from "react";
import "./SurveyForm.css";
import axios from "axios"; // Import axios for API requests

const SurveyForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    surveyTopic: "",
    feedback: "",
  });

  const [errors, setErrors] = useState({});
  const [additionalQuestions, setAdditionalQuestions] = useState([]);
  const [additionalAnswers, setAdditionalAnswers] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAdditionalInputChange = (e) => {
    const { name, value } = e.target;
    setAdditionalAnswers({
      ...additionalAnswers,
      [name]: value,
    });
  };

  useEffect(() => {
    // Fetch additional questions when survey topic changes
    if (formData.surveyTopic) {
      fetchAdditionalQuestions(formData.surveyTopic);
    }
  }, [formData.surveyTopic]);

  const fetchAdditionalQuestions = async (topic) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/questions/${topic}`
      );
      setAdditionalQuestions(response.data);
      setAdditionalAnswers(
        response.data.reduce((acc, question) => {
          acc[question] = "";
          return acc;
        }, {})
      );
    } catch (error) {
      console.error("Error fetching additional questions:", error);
      setAdditionalQuestions([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Prepare submitted data for display
    const submittedData = {
      ...formData,
      additionalAnswers,
    };

    // Display summary of entered data
    setSubmittedData(submittedData);

    // Mock submission for demonstration
    console.log("Form submitted:", submittedData);
  };

  const validate = (data) => {
    let errors = {};
    if (!data.fullName) {
      errors.fullName = "Full Name is required";
    }
    if (!data.email) {
      errors.email = "Email is required";
    } else if (!isValidEmail(data.email)) {
      errors.email = "Invalid email format";
    }
    if (!data.surveyTopic) {
      errors.surveyTopic = "Survey Topic is required";
    }
    // Add more validations as needed

    return errors;
  };

  const isValidEmail = (email) => {
    // Simple email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div>
      {submittedData ? (
        <div className="submission-summary">
          <h3>Thank you for your submission!</h3>
          <h4>Summary:</h4>
          <ul>
            <li>
              <strong>Full Name:</strong> {submittedData.fullName}
            </li>
            <li>
              <strong>Email:</strong> {submittedData.email}
            </li>
            <li>
              <strong>Survey Topic:</strong> {submittedData.surveyTopic}
            </li>
            {submittedData.additionalAnswers &&
              Object.keys(submittedData.additionalAnswers).map((key, index) => (
                <li key={index}>
                  <strong>{key}:</strong> {submittedData.additionalAnswers[key]}
                </li>
              ))}
            <li>
              <strong>Feedback:</strong> {submittedData.feedback}
            </li>
          </ul>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="survey-form">
          <h2>Advanced Survey Form</h2>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
            />
            {errors.fullName && <div className="error">{errors.fullName}</div>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label>Survey Topic</label>
            <select
              name="surveyTopic"
              value={formData.surveyTopic}
              onChange={handleInputChange}
            >
              <option value="">Select survey topic</option>
              <option value="Technology">Technology</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
            </select>
            {errors.surveyTopic && (
              <div className="error">{errors.surveyTopic}</div>
            )}
          </div>

          {additionalQuestions.length > 0 &&
            additionalQuestions.map((question, index) => (
              <div key={index} className="form-group">
                <label>{question}</label>
                <input
                  type="text"
                  name={question}
                  value={additionalAnswers[question]}
                  onChange={handleAdditionalInputChange}
                />
              </div>
            ))}

          <div className="form-group">
            <label>Feedback</label>
            <textarea
              name="feedback"
              value={formData.feedback}
              onChange={handleInputChange}
            ></textarea>
            {errors.feedback && <div className="error">{errors.feedback}</div>}
          </div>

          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default SurveyForm;
