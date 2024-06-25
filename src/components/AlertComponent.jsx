import React from "react";

const AlertComponent = ({ variant = "success", message }) => {
  const baseStyles = {
    position: "fixed",
    top: 30,
    right: 40,
    zIndex: 999, // Ensure alert is on top of other elements
    minWidth: 300,
    padding: "1rem",
    borderRadius: "4px",
  };

  const variantStyles = {
    success: {
      backgroundColor: "#dff0d8",
      borderColor: "#d0e9c6",
      color: "#28a745",
    },
    error: {
      backgroundColor: "#ffcdd2",
      borderColor: "#dc3545",
      color: "#dc3545",
    },
  };

  const combinedStyles = { ...baseStyles, ...variantStyles[variant] };

  return (
    <div style={combinedStyles}>
      <h5>
        <strong>{variant.toUpperCase()}</strong> <br />
        <div className="ms-2 mt-3">{message}</div>
      </h5>
    </div>
  );
};

export default AlertComponent;

// example usage
// <AlertComponent variant="success" message="Operation completed successfully!" />
// <AlertComponent variant="error" message="An error occurred. Please try again later." />
