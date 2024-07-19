import React from "react";
import Button from "../../components/Button";

export default function EventCover({ coverImageUrl, handleClickBuy }) {
  return (
    <div className="w-full h-96 relative">
      <div className="w-full h-96 overflow-hidden">
        <img className="w-full h-auto object-cover" src={coverImageUrl} />
      </div>
      <div className="absolute inset-0 flex justify-center items-end mb-10">
        <Button onClick={handleClickBuy}>Buy Now</Button>
      </div>
    </div>
  );
}
