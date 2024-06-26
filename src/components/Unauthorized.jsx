import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <section className="text-center mt-4">
      <h1>Unauthorized</h1>
      <br />
      <p>You don't have permission to access this page</p>
      <button className="btn btn-primary" onClick={goBack}>
        Go Back
      </button>
    </section>
  );
};

export default Unauthorized;
