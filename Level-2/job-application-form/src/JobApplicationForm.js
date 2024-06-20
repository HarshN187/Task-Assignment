import React from 'react';
import useForm from './useForm';
import useValidation from './useValidation';
import './App.css';

const JobApplicationForm = () => {
  const initialValues = {
    fullName: '',
    email: '',
    phoneNumber: '',
    position: '',
    relevantExperience: '',
    portfolioURL: '',
    managementExperience: '',
    additionalSkills: {
      JavaScript: false,
      CSS: false,
      Python: false,
    },
    preferredInterviewTime: '',
  };

  const {
    values,
    errors,
    handleChange,
    handleCheckboxChange,
    setErrors,
  } = useForm(initialValues);

  const validationErrors = useValidation(values);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      alert(JSON.stringify(values, null, 2));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Full Name:</label>
        <input
          type="text"
          name="fullName"
          value={values.fullName}
          onChange={handleChange}
        />
        {errors.fullName && <p>{errors.fullName}</p>}
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <p>{errors.email}</p>}
      </div>

      <div>
        <label>Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          value={values.phoneNumber}
          onChange={handleChange}
        />
        {errors.phoneNumber && <p>{errors.phoneNumber}</p>}
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
        {errors.position && <p>{errors.position}</p>}
      </div>

      {(values.position === 'Developer' || values.position === 'Designer') && (
        <div>
          <label>Relevant Experience (in years):</label>
          <input
            type="number"
            name="relevantExperience"
            value={values.relevantExperience}
            onChange={handleChange}
          />
          {errors.relevantExperience && <p>{errors.relevantExperience}</p>}
        </div>
      )}

      {values.position === 'Designer' && (
        <div>
          <label>Portfolio URL:</label>
          <input
            type="text"
            name="portfolioURL"
            value={values.portfolioURL}
            onChange={handleChange}
          />
          {errors.portfolioURL && <p>{errors.portfolioURL}</p>}
        </div>
      )}

      {values.position === 'Manager' && (
        <div>
          <label>Management Experience:</label>
          <input
            type="text"
            name="managementExperience"
            value={values.managementExperience}
            onChange={handleChange}
          />
          {errors.managementExperience && <p>{errors.managementExperience}</p>}
        </div>
      )}

      <div>
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
        {errors.additionalSkills && <p>{errors.additionalSkills}</p>}
      </div>

      <div>
        <label>Preferred Interview Time:</label>
        <input
          type="datetime-local"
          name="preferredInterviewTime"
          value={values.preferredInterviewTime}
          onChange={handleChange}
        />
        {errors.preferredInterviewTime && <p>{errors.preferredInterviewTime}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default JobApplicationForm;
