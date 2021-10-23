import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <Spinner
      animation="border"
      variant="info"
      className="d-flex my-auto"
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};

export default Loading;
