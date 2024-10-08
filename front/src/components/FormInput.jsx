import React, { useState } from "react";
const FormInput = (props) => {
  const { id, label, ...inputProps } = props;
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };
  return (
    <div className={props.className}>
      <label htmlFor="username" className="text-white font-bold text-xl">
        {label}
      </label>
      <input
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.onChange}
        onBlur={handleFocus}
        // focused={focused.toString()}
        {...inputProps}
      />
      <span>{props.errormessage}</span>
    </div>
  );
};

export default FormInput;
