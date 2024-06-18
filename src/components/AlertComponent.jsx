import React from "react";
// import { Alert } from "react-bootstrap";

const AlertComponent = ({ variant, message }) => {
  const styles = {
    position: "fixed",
    top: 10, // Adjust top spacing as needed
    right: 10, // Adjust right spacing as needed
    zIndex: 999, // Ensure alert is on top of other elements
  };

  return (
    <div style={styles}>
      {/* <Alert variant={variant} dismissible>
        {variant === "success" ? "Success!" : "Error"}
        <p>{message}</p>
      </Alert> */}
      <div className="alert alert-success alert-dismissible" role="alert">
        <h5>{message} !! </h5>
        <button className="btn-close" aria-label="close"></button>
      </div>
    </div>
  );
};

export default AlertComponent;
