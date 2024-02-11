import React from "react";

const InputType = ({
  lableText,
  lableFor,
  inputType,
  value,
  name,
  onChange,
}) => {
  return (
    <>
      <div className="mb-3 form-group">
        <label htmlFor={lableFor}>{lableText}</label>
        <input
          type={inputType}
          className="form-control"
          placeholder=""
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default InputType;
