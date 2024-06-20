import React, { useState } from "react";
import useForm from "./useForm";
import useValidation from "./useValidation";
import "./App.css"; // Import the CSS file here

const EventRegistrationForm = () => {
  const initialValues = {
    name: "",
    email: "",
    age: "",
    attendingWithGuest: false,
    guestName: "",
  };

  const { values, errors, handleChange, setErrors } = useForm(initialValues);

  const validationErrors = useValidation(values);

  const [showSummaryFlag, setShowSummaryFlag] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // If the form is valid, display the summary
      setShowSummaryFlag(true);
    }
  };

  return (
    <div className="event-registration-form">
      <h2>Event Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            className={errors.name ? "input-error" : ""}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            className={errors.email ? "input-error" : ""}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={values.age}
            onChange={handleChange}
            className={errors.age ? "input-error" : ""}
          />
          {errors.age && <p className="error">{errors.age}</p>}
        </div>

        <div className="form-group">
          <label>
            Are you attending with a guest?
            <input
              type="checkbox"
              name="attendingWithGuest"
              checked={values.attendingWithGuest}
              onChange={handleChange}
            />
          </label>
        </div>

        {values.attendingWithGuest && (
          <div className="form-group">
            <label>Guest Name:</label>
            <input
              type="text"
              name="guestName"
              value={values.guestName}
              onChange={handleChange}
              className={errors.guestName ? "input-error" : ""}
            />
            {errors.guestName && <p className="error">{errors.guestName}</p>}
          </div>
        )}

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>

      {/* Display summary */}
      {showSummaryFlag && (
        <div className="summary">
          <h3>Registration Summary</h3>
          <p>
            <strong>Name:</strong> {values.name}
          </p>
          <p>
            <strong>Email:</strong> {values.email}
          </p>
          <p>
            <strong>Age:</strong> {values.age}
          </p>
          {values.attendingWithGuest && (
            <p>
              <strong>Guest Name:</strong> {values.guestName}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default EventRegistrationForm;
