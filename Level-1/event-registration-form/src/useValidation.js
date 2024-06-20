import { useState, useEffect } from 'react';

const useValidation = (values) => {
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const validate = () => {
      const validationErrors = {};

      if (!values.name) {
        validationErrors.name = 'Name is required';
      }

      if (!values.email) {
        validationErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        validationErrors.email = 'Email address is invalid';
      }

      if (!values.age) {
        validationErrors.age = 'Age is required';
      } else if (isNaN(values.age) || values.age <= 0) {
        validationErrors.age = 'Age must be a number greater than 0';
      }

      if (values.attendingWithGuest && !values.guestName) {
        validationErrors.guestName = 'Guest name is required';
      }

      setErrors(validationErrors);
    };

    validate();
  }, [values]);

  return errors;
};

export default useValidation;
