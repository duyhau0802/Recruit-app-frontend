import React from "react";

const Footer = () => {
  return (
    <>
      <div
        style={{
          position: "fix",
          bottom: "0",
          width: "100%",
          height: "15px",
          textAlign: "center",
          backgroundColor: "black",
          color: "white",
          minHeight: "20px",
        }}
        className="fixed-bottom"
      >
        <footer>
          <p> © 2024. Copyright by Nguyen Duy Hau</p>
        </footer>
      </div>
    </>
  );
};

export default Footer;
