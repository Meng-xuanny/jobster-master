import React from "react";

const FormRowSelect = ({ name, value, handleChange, labelText, list }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {" "}
        {/* when use label in a form remember to add id */}
        {labelText || name}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        className="form-select"
      >
        {list.map((listItem, index) => (
          <option key={index} value={listItem}>
            {listItem}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormRowSelect;
