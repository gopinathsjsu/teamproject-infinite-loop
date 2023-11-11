import React from "react";
import { useFormContext } from "react-hook-form";

type FormInputProps = {
  label: string;
  name: string;
  type?: string;
};

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = "text",
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

//   <div>
//   <label className="label">
//       <span className="text-base label-text">Name</span>
//   </label>
//   <input type="text" placeholder="Name" className="w-full input input-bordered" />
// </div>
  return (
    <div className="">
      <label htmlFor={name} className="label">
        <span className="text-base label-text">{label}</span>
      </label>
      <input
        type={type}
        placeholder=" "
        className="w-full input input-bordered"
        {...register(name)}
      />
      {errors[name] && (
        <span className="text-red-500 text-xs pt-1 block">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};

export default FormInput;
