import React from "react";
import Button from "./Button";
const topicSizeMap = {
  large: "text-4xl",
  small: "text-2xl",
};
const detailsSextSizeMap = {
  large: "text-xl",
  small: "text-lg",
};

export default function TopicAndDetails({
  topic = "topic",
  details = "details",
  textSize = "large",
  withButton = false,
  buttonName = "More Events",
  onClick = null,
}) {
  return (
    <div className="w-full flex justify-between items-center ">
      <div className="flex flex-col gap-2">
        <div
          className={`${topicSizeMap[textSize]} font-semibold text-teal-500`}
        >
          {topic}
        </div>
        <div className={`${detailsSextSizeMap[textSize]} font-semibold `}>
          {details}
        </div>
      </div>
      {withButton ? (
        <Button bg="ghost" color="ghost" border="ghost" onClick={onClick}>
          {buttonName}
        </Button>
      ) : null}
    </div>
  );
}
