import React, { useState } from "react";
import useForm from "./useForm";
import useValidation from "./useValidation";
import "./App.css";

const JobApplicationForm = () => {
  const initialValues = {
    fullName: "",
    email: "",
    phoneNumber: "",
    position: "",
    relevantExperience: "",
    portfolioURL: "",
    managementExperience: "",
    additionalSkills: {
      JavaScript: false,
      CSS: false,
      Python: false,
    },
    preferredInterviewTime: "",
  };

  const { values, errors, handleChange, handleCheckboxChange, setErrors } =
    useForm(initialValues);

  const validationErrors = useValidation(values);

  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Store submitted data for display
      const submittedData = {
        fullName: values.fullName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        position: values.position,
        relevantExperience: values.relevantExperience,
        portfolioURL: values.portfolioURL,
        managementExperience: values.managementExperience,
        additionalSkills: Object.keys(values.additionalSkills).filter(
          (skill) => values.additionalSkills[skill]
        ),
        preferredInterviewTime: values.preferredInterviewTime,
      };

      setSubmittedData(submittedData);
    }
  };

  return (
    <div className="container">
      <h2>Job Application Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={values.fullName}
            onChange={handleChange}
          />
          {errors.fullName && (
            <p className="error-message">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={values.phoneNumber}
            onChange={handleChange}
          />
          {errors.phoneNumber && (
            <p className="error-message">{errors.phoneNumber}</p>
          )}
        </div>

        <div>
          <label>Applying for Position:</label>
          <select
            name="position"
            value={values.position}
            onChange={handleChange}
          >
            <option value="">Select a position</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
          </select>
          {errors.position && (
            <p className="error-message">{errors.position}</p>
          )}
        </div>

        {(values.position === "Developer" ||
          values.position === "Designer") && (
          <div>
            <label>Relevant Experience (in years):</label>
            <input
              type="number"
              name="relevantExperience"
              value={values.relevantExperience}
              onChange={handleChange}
            />
            {errors.relevantExperience && (
              <p className="error-message">{errors.relevantExperience}</p>
            )}
          </div>
        )}

        {values.position === "Designer" && (
          <div>
            <label>Portfolio URL:</label>
            <input
              type="text"
              name="portfolioURL"
              value={values.portfolioURL}
              onChange={handleChange}
            />
            {errors.portfolioURL && (
              <p className="error-message">{errors.portfolioURL}</p>
            )}
          </div>
        )}

        {values.position === "Manager" && (
          <div>
            <label>Management Experience:</label>
            <input
              type="text"
              name="managementExperience"
              value={values.managementExperience}
              onChange={handleChange}
            />
            {errors.managementExperience && (
              <p className="error-message">{errors.managementExperience}</p>
            )}
          </div>
        )}

        <div className="additional-skills">
          <label>Additional Skills:</label>
          <div>
            <label>
              <input
                type="checkbox"
                name="additionalSkills"
                value="JavaScript"
                checked={values.additionalSkills.JavaScript}
                onChange={handleCheckboxChange}
              />
              JavaScript
            </label>
            <label>
              <input
                type="checkbox"
                name="additionalSkills"
                value="CSS"
                checked={values.additionalSkills.CSS}
                onChange={handleCheckboxChange}
              />
              CSS
            </label>
            <label>
              <input
                type="checkbox"
                name="additionalSkills"
                value="Python"
                checked={values.additionalSkills.Python}
                onChange={handleCheckboxChange}
              />
              Python
            </label>
          </div>
          {errors.additionalSkills && (
            <p className="error-message">{errors.additionalSkills}</p>
          )}
        </div>

        <div>
          <label>Preferred Interview Time:</label>
          <input
            type="datetime-local"
            name="preferredInterviewTime"
            value={values.preferredInterviewTime}
            onChange={handleChange}
          />
          {errors.preferredInterviewTime && (
            <p className="error-message">{errors.preferredInterviewTime}</p>
          )}
        </div>

        <button type="submit">Submit</button>
      </form>

      {/* Display submitted data */}
      {submittedData && (
        <div className="submission-summary">
          <h3>Submitted Data Summary</h3>
          <p>
            <strong>Full Name:</strong> {submittedData.fullName}
          </p>
          <p>
            <strong>Email:</strong> {submittedData.email}
          </p>
          <p>
            <strong>Phone Number:</strong> {submittedData.phoneNumber}
          </p>
          <p>
            <strong>Applying for Position:</strong> {submittedData.position}
          </p>
          {submittedData.position === "Developer" && (
            <p>
              <strong>Relevant Experience:</strong>{" "}
              {submittedData.relevantExperience} years
            </p>
          )}
          {submittedData.position === "Designer" && (
            <p>
              <strong>Portfolio URL:</strong> {submittedData.portfolioURL}
            </p>
          )}
          {submittedData.position === "Manager" && (
            <p>
              <strong>Management Experience:</strong>{" "}
              {submittedData.managementExperience}
            </p>
          )}
          <div>
            <strong>Additional Skills:</strong>{" "}
            {submittedData.additionalSkills.join(", ")}
          </div>

          <div>
            <strong>Preferred Interview Time:</strong>{" "}
            {submittedData.preferredInterviewTime}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobApplicationForm;
