import React from "react";

function FormRow({type, name, value, handleChange, labelText = null}) {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText?labelText:name}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        className="form-input"
      />
    </div>
  );
}

export default FormRow;
