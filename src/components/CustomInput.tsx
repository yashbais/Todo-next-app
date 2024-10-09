import React from "react";
import {CustomInputProps} from '../types/types'
const CustomInput: React.FC<CustomInputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  name,
  error,
}) => {
  return (
    <div className="mb-4">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        className={`border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-md p-2 w-full focus:outline-none focus:border-blue-500`}
      />
      {error && <p className="text-red-500 text-sm mt-1 flex">{error}</p>}
    </div>
  );
};

export default CustomInput;
