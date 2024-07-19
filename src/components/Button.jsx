import React from "react";
const bgMap = {
  primary: "bg-teal-500 hover:bg-teal-600",
  secondary: "bg-sky-500 hover:bg-sky-600",
  orange: "bg-orange-500 hover:bg-orange-600",
  ghost: "bg-none hover:bg-neutral-700",
};
const colorMap = {
  primary: "text-white",
  secondary: "text-white",
  orange: "text-white",
  ghost: "text-teal-500",
};
const borderMap = {
  primary: "",
  secondary: "",
  orange: "",
  ghost: "border border-teal-500",
};
const widthMap = {
  mid: "w-48",
  large: "w-full",
};

export default function Button({
  children,
  bg = "primary",
  color = "primary",
  border,
  width = "mid",
  onClick,
  id = 0,
}) {
  return (
    <button
      className={`px-3 py-3 rounded-2xl ${bgMap[bg]} ${colorMap[color]} ${borderMap[border]} ${widthMap[width]} shadow-md shadow-neutral-950 hover:scale-95`}
      onClick={onClick}
      id={id}
    >
      {children}
    </button>
  );
}
