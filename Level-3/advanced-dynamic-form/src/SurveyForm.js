import React, { useState } from "react";
import "./SurveyForm.css";

const SurveyForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    surveyTopic: "",
    favoriteProgrammingLanguage: "",
    yearsOfExperience: "",
    exerciseFrequency: "",
    dietPreference: "",
    highestQualification: "",
    fieldOfStudy: "",
    feedback: "",
  });

  const [errors, setErrors] = useState({});
  const [additionalQuestions, setAdditionalQuestions] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const fetchAdditionalQuestions = async (topic) => {
    try {
      const response = await fetch(`/api/questions/${topic}`);
      if (!response.ok) {
        throw new Error("Failed to fetch questions");
      }
      const data = await response.json();
      setAdditionalQuestions(data);
    } catch (error) {
      console.error("Error fetching additional questions:", error);
      setAdditionalQuestions({});
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

    // Fetch additional questions based on survey topic
    await fetchAdditionalQuestions(formData.surveyTopic);

    // Prepare submitted data for display
    const submittedData = {
      fullName: formData.fullName,
      email: formData.email,
      surveyTopic: formData.surveyTopic,
      favoriteProgrammingLanguage: formData.favoriteProgrammingLanguage,
      yearsOfExperience: formData.yearsOfExperience,
      exerciseFrequency: formData.exerciseFrequency,
      dietPreference: formData.dietPreference,
      highestQualification: formData.highestQualification,
      fieldOfStudy: formData.fieldOfStudy,
      feedback: formData.feedback,
      additionalQuestions: additionalQuestions,
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
    if (data.surveyTopic === "Technology") {
      if (!data.favoriteProgrammingLanguage) {
        errors.favoriteProgrammingLanguage =
          "Favorite Programming Language is required";
      }
      if (!data.yearsOfExperience || data.yearsOfExperience <= 0) {
        errors.yearsOfExperience = "Years of Experience must be greater than 0";
      }
    } else if (data.surveyTopic === "Health") {
      if (!data.exerciseFrequency) {
        errors.exerciseFrequency = "Exercise Frequency is required";
      }
      if (!data.dietPreference) {
        errors.dietPreference = "Diet Preference is required";
      }
    } else if (data.surveyTopic === "Education") {
      if (!data.highestQualification) {
        errors.highestQualification = "Highest Qualification is required";
      }
      if (!data.fieldOfStudy) {
        errors.fieldOfStudy = "Field of Study is required";
      }
    }
    if (!data.feedback || data.feedback.length < 50) {
      errors.feedback =
        "Feedback is required and must be at least 50 characters";
    }
    return errors;
  };

  const isValidEmail = (email) => {
    // Simple email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div className="survey-form-container">
      <h2>Survey Form</h2>
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
            {submittedData.surveyTopic === "Technology" && (
              <>
                <li>
                  <strong>Favorite Programming Language:</strong>{" "}
                  {submittedData.favoriteProgrammingLanguage}
                </li>
                <li>
                  <strong>Years of Experience:</strong>{" "}
                  {submittedData.yearsOfExperience}
                </li>
              </>
            )}
            {submittedData.surveyTopic === "Health" && (
              <>
                <li>
                  <strong>Exercise Frequency:</strong>{" "}
                  {submittedData.exerciseFrequency}
                </li>
                <li>
                  <strong>Diet Preference:</strong>{" "}
                  {submittedData.dietPreference}
                </li>
              </>
            )}
            {submittedData.surveyTopic === "Education" && (
              <>
                <li>
                  <strong>Highest Qualification:</strong>{" "}
                  {submittedData.highestQualification}
                </li>
                <li>
                  <strong>Field of Study:</strong> {submittedData.fieldOfStudy}
                </li>
              </>
            )}
            <li>
              <strong>Feedback:</strong> {submittedData.feedback}
            </li>
          </ul>
          {Object.keys(submittedData.additionalQuestions).length > 0 && (
            <>
              <h4>Additional Questions:</h4>
              <ul>
                {Object.keys(submittedData.additionalQuestions).map(
                  (question) => (
                    <li key={question}>
                      <strong>{question}:</strong>{" "}
                      {submittedData.additionalQuestions[question]}
                    </li>
                  )
                )}
              </ul>
            </>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="survey-form">
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

          {formData.surveyTopic === "Technology" && (
            <div className="form-group">
              <label>Favorite Programming Language</label>
              <select
                name="favoriteProgrammingLanguage"
                value={formData.favoriteProgrammingLanguage}
                onChange={handleInputChange}
              >
                <option value="">Select language</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="C#">C#</option>
              </select>
              {errors.favoriteProgrammingLanguage && (
                <div className="error">
                  {errors.favoriteProgrammingLanguage}
                </div>
              )}

              <label>Years of Experience</label>
              <input
                type="number"
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleInputChange}
              />
              {errors.yearsOfExperience && (
                <div className="error">{errors.yearsOfExperience}</div>
              )}
            </div>
          )}

          {formData.surveyTopic === "Health" && (
            <div className="form-group">
              <label>Exercise Frequency</label>
              <select
                name="exerciseFrequency"
                value={formData.exerciseFrequency}
                onChange={handleInputChange}
              >
                <option value="">Select frequency</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Rarely">Rarely</option>
              </select>
              {errors.exerciseFrequency && (
                <div className="error">{errors.exerciseFrequency}</div>
              )}

              <label>Diet Preference</label>
              <select
                name="dietPreference"
                value={formData.dietPreference}
                onChange={handleInputChange}
              >
                <option value="">Select preference</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
              </select>
              {errors.dietPreference && (
                <div className="error">{errors.dietPreference}</div>
              )}
            </div>
          )}

          {formData.surveyTopic === "Education" && (
            <div className="form-group">
              <label>Highest Qualification</label>
              <select
                name="highestQualification"
                value={formData.highestQualification}
                onChange={handleInputChange}
              >
                <option value="">Select qualification</option>
                <option value="High School">High School</option>
                <option value="Bachelor's">Bachelor's</option>
                <option value="Master's">Master's</option>
                <option value="PhD">PhD</option>
              </select>
              {errors.highestQualification && (
                <div className="error">{errors.highestQualification}</div>
              )}

              <label>Field of Study</label>
              <input
                type="text"
                name="fieldOfStudy"
                value={formData.fieldOfStudy}
                onChange={handleInputChange}
              />
              {errors.fieldOfStudy && (
                <div className="error">{errors.fieldOfStudy}</div>
              )}
            </div>
          )}

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
