import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <div style={{ position: "absolute", top: "50%", left: "50%" }}>
      <Spinner
        animation="border"
        variant="info"
        className="d-flex my-auto"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loading;
