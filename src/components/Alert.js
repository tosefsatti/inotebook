import React from "react";

const Alert = (props) => {
  const capatilize = (word) => {
    if (word === "danger") {
      word = "Error:";
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  return (
    props.alert && (
      <div
        className={`alert alert-${props.alert.type} alert-dismissible fade show`}
        role="alert"
      >
        <strong>{capatilize(props.alert.type)}</strong> {props.alert.message}
      </div>
    )
  );
};

export default Alert;
