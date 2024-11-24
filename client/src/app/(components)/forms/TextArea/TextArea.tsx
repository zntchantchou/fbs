import { TextareaHTMLAttributes } from "react";
import { FieldErrors, RegisterOptions } from "react-hook-form";
import { FormValues } from "../../components.types";
import ValidationError from "../ValidationError/ValidationError";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  errors: FieldErrors<FormValues>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: (arg: string, options: RegisterOptions) => any;
  registerOptions: RegisterOptions;
}

function TextArea({
  register,
  label,
  registerOptions,
  errors,
  ...rest
}: Props) {
  const labelClassnames = "block my-2 text-sm font-medium text-gray-700";
  const inputClassnames =
    "block w-full max-w-2xl border-gray-400 border-2 rounded-md mb-4 mt-2 p-2";
  return (
    <>
      <label className={labelClassnames}>{label}</label>
      <textarea
        className={inputClassnames}
        {...register(rest.name as string, registerOptions)}
        {...rest}
      />
      {errors[rest.name] && (
        <ValidationError
          fieldName={rest.name}
          errors={errors}
          options={registerOptions}
        />
      )}
    </>
  );
}

export default TextArea;
