import { useState } from "react";

const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues({
      ...values,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setValues({
      ...values,
      [name]: {
        ...values[name],
        [e.target.value]: checked,
      },
    });
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleChange,
    handleCheckboxChange,
  };
};

export default useForm;
