import React from "react";
import { LoaderIcon } from "../icons";

export default function Spinner({ transparent }) {
  return (
    <>
      <div className="fixed inset-0 bg-neutral-800 opacity-80 z-50"></div>
      <div className="fixed inset-0 z-60 flex justify-center items-center animate-spin">
        <LoaderIcon className="fill-teal-500 w-12 h-12" />
      </div>
    </>
  );
}
