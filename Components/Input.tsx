import React from "react";

//defines the structure of props
interface InputProps {
  id: string;
  onChange: any;
  value: string;
  label: string;
  type?: string; //optional props
}

//defining the type of this function as React's functional component with it's props to be in a structure mentioned in 'InputProps'
const Input: React.FC<InputProps> = ({ id, onChange, value, label, type }) => {
  return (
    <div className="relative">
      <input
        type={type}
        onChange={onChange}
        value={value}
        id={id}
        className="block rounded-md px-6 pt-6 pb-1 w-full text-md text-white bg-neutral-700 appearance-none focus:outline-none focus:ring-0 peer"
        placeholder=" "
      />
      <label
        className="absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
