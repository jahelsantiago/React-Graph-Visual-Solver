import * as React from "react";

export interface IStepContainerProps {
  focused: boolean;
  children: React.ReactNode;
  onStepClick: () => void;
  className?: string;
}

const classes = {
  focused: "border-blue-500 shadow-lg",
  unfocused: "border-gray-200",
};

export default function StepContainer(props: IStepContainerProps) {
  return (
    <div
      onClick={props.onStepClick}
      className={
        "border-2 rounded-xl hover:border-gray-400 cursor-pointer" +
        "  " +
        (props.focused ? classes.focused : classes.unfocused) +
        " " +
        props.className
      }
    >
      {props.children}
    </div>
  );
}
