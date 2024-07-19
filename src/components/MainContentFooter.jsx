import React from "react";

export default function MainContentFooter({ children }) {
  return (
    <div className="w-full min-h-48 flex gap-8 justify-center items-center">
      {children}
    </div>
  );
}
