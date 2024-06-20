import React from "react";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // If the form is valid, display the summary
      alert(JSON.stringify(values, null, 2));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
        />
        {errors.name && <p>{errors.name}</p>}
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
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={values.age}
          onChange={handleChange}
        />
        {errors.age && <p>{errors.age}</p>}
      </div>

      <div>
        <label>Are you attending with a guest?</label>
        <input
          type="checkbox"
          name="attendingWithGuest"
          checked={values.attendingWithGuest}
          onChange={handleChange}
        />
      </div>

      {values.attendingWithGuest && (
        <div>
          <label>Guest Name:</label>
          <input
            type="text"
            name="guestName"
            value={values.guestName}
            onChange={handleChange}
          />
          {errors.guestName && <p>{errors.guestName}</p>}
        </div>
      )}

      <button type="submit">Submit</button>
    </form>
  );
};

export default EventRegistrationForm;
