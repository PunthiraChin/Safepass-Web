import React from "react";

export default function InputDateTime({
  placeholder,
  error,
  value,
  onChange,
  name,
  label = false,
  minDateTime,
  maxDateTime,
  readOnly,
}) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-md font-semibold" htmlFor={name} name={label}>
          {label}
        </label>
      )}
      <input
        className={`w-full px-3 py-2 border rounded-2xl focus:outline-none focus:ring-2 ${
          error
            ? "border-orange-500 focus:ring-orange-300"
            : "border-teal-500 focus:ring-teal-300"
        }`}
        id={name}
        name={name}
        type="datetime-local"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={minDateTime}
        max={maxDateTime}
        readOnly={readOnly}
      ></input>
      {error ? <small className="text-orange-500">{error}</small> : null}
    </div>
  );
}
