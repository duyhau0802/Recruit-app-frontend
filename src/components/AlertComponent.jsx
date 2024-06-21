import React from "react";

const AlertComponent = ({ variant, message }) => {
  const styles = {
    position: "fixed",
    top: 30,
    right: 40,
    zIndex: 999, // Ensure alert is on top of other elements
    minWidth: 300,
  };

  return (
    <div style={styles}>
      <div className="alert alert-success fade show" role="alert">
        <h5>
          <strong>Success</strong> <br />
          <div className="ms-2 mt-3">{message}</div>
        </h5>
      </div>
    </div>
  );
};

export default AlertComponent;
