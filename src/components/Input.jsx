import React from "react";

export default function Input({
  id = null,
  placeholder,
  type = "text",
  error,
  value,
  onChange,
  name,
  label = false,
  readOnly = false,
}) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-md font-semibold" name={label}>
          {label}
        </label>
      )}
      <input
        className={`text-gray-500 w-full px-3 py-2 border rounded-2xl focus:outline-none focus:ring-2 ${
          error
            ? "border-orange-500 focus:ring-orange-300"
            : "border-teal-500 focus:ring-teal-300"
        }`}
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
      ></input>
      {error ? <small className="text-orange-500">{error}</small> : null}
    </div>
  );
}
