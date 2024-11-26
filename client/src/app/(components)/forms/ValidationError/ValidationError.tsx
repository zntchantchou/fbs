import { FieldErrors, RegisterOptions } from "react-hook-form";
import { FormValues } from "../../components.types";
import { useCallback, useEffect, useState } from "react";

type Props = {
  fieldName: string;
  errors?: FieldErrors<FormValues>;
  options?: RegisterOptions;
  label?: string;
};

const errorsMessages = {
  required: (fieldName: string) => `"${fieldName}" is required.`,
  min: (fieldName: string, min: number) =>
    `"${fieldName}" must be greater than ${min}`,
  max: (fieldName: string, max: number) =>
    `"${fieldName}" must be smaller than ${max}`,
  maxLength: (fieldName: string, maxLength: number) =>
    `"${fieldName}" should not exceed ${maxLength} characters`,
  minLength: (fieldName: string, minLength: number) =>
    `"${fieldName}" should contain at least ${minLength} characters`,
};

function ValidationError({ fieldName, errors, options, label }: Props) {
  const error = errors ? errors[fieldName] : null;
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const updateValidation = useCallback(() => {
    if (error) {
      switch (error.type) {
        case "required": {
          setErrorMessage(errorsMessages.required(fieldName));
          break;
        }
        case "min": {
          setErrorMessage(
            errorsMessages.min(
              fieldName,
              Number.parseInt(options.min.toString())
            )
          );
          break;
        }
        case "max": {
          setErrorMessage(
            errorsMessages.max(
              fieldName,
              Number.parseInt(options.max.toString())
            )
          );
          break;
        }
        case "minLength": {
          setErrorMessage(
            errorsMessages.minLength(
              fieldName,
              Number.parseInt(options.minLength.toString())
            )
          );
          break;
        }
        case "maxLength": {
          setErrorMessage(
            errorsMessages.maxLength(
              fieldName,
              Number.parseInt(options.maxLength.toString())
            )
          );
          break;
        }
        default:
          break;
      }
    }
  }, [error, fieldName, options]);

  useEffect(() => {
    updateValidation();
  }, [error, updateValidation]);

  return errorMessage || label ? (
    <div className="bg-red-200 rounded p-4 text-red-700 max-w-2xl mb-2">
      {errorMessage || label}
    </div>
  ) : null;
}

export default ValidationError;
