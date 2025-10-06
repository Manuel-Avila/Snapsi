import { useState } from "react";
import { ValidationError, ObjectSchema } from "yup";

export const useFormSubmit = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submitForm = async (
    data: object,
    validationSchema: ObjectSchema<any>,
    onSubmit: (data: object) => void
  ) => {
    try {
      setIsSubmitting(true);
      await validationSchema.validate(data, { abortEarly: false });
      setErrors({});
      onSubmit(data);
    } catch (error) {
      if (error instanceof ValidationError) {
        const formattedErrors: Record<string, string> = {};
        error.inner.forEach((err) => {
          if (err.path) {
            formattedErrors[err.path] = err.message;
          }
        });
        setErrors(formattedErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitForm, isSubmitting, errors };
};
