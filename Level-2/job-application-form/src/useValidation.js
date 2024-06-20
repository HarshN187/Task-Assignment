import { useState, useEffect } from 'react';

const useValidation = (values) => {
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const validate = () => {
      const validationErrors = {};

      if (!values.fullName) {
        validationErrors.fullName = 'Full Name is required';
      }

      if (!values.email) {
        validationErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        validationErrors.email = 'Email address is invalid';
      }

      if (!values.phoneNumber) {
        validationErrors.phoneNumber = 'Phone Number is required';
      } else if (!/^\d+$/.test(values.phoneNumber)) {
        validationErrors.phoneNumber = 'Phone Number must be a valid number';
      }

      if ((values.position === 'Developer' || values.position === 'Designer') && (!values.relevantExperience || values.relevantExperience <= 0)) {
        validationErrors.relevantExperience = 'Relevant Experience is required and must be a number greater than 0';
      }

      if (values.position === 'Designer' && !values.portfolioURL) {
        validationErrors.portfolioURL = 'Portfolio URL is required';
      } else if (values.position === 'Designer' && !/^https?:\/\/.*\..*/.test(values.portfolioURL)) {
        validationErrors.portfolioURL = 'Portfolio URL must be a valid URL';
      }

      if (values.position === 'Manager' && !values.managementExperience) {
        validationErrors.managementExperience = 'Management Experience is required';
      }

      if (!Object.values(values.additionalSkills).includes(true)) {
        validationErrors.additionalSkills = 'At least one skill must be selected';
      }

      if (!values.preferredInterviewTime) {
        validationErrors.preferredInterviewTime = 'Preferred Interview Time is required';
      }

      setErrors(validationErrors);
    };

    validate();
  }, [values]);

  return errors;
};

export default useValidation;
