import React from "react";

export default function Modal({
  width = 30,
  title = "Title",
  children,
  onClick,
}) {
  return (
    <>
      <div className="fixed inset-0 bg-neutral-950 opacity-60 z-30"></div>
      <div className="fixed inset-0 z-40">
        <div className="flex min-h-screen justify-center items-center">
          <div
            className="bg-neutral-900 rounded-lg shadow-lg p-12 flex flex-col gap-6"
            style={{ width: `${width}rem` }}
          >
            <div className="flex justify-between">
              <button className="invisible">&#10005;</button>
              <p className="text-4xl font-semibold">{title}</p>
              <button onClick={onClick}>&#10005;</button>
            </div>
            <div>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
