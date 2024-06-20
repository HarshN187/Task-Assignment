import { useState } from 'react';

const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleDropdownChange = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  return {
    values,
    errors,
    handleChange,
    handleDropdownChange,
    setErrors,
    setValues,
  };
};

export default useForm;
