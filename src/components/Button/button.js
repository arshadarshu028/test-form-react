import React from "react";
import { Button, Spinner } from "react-bootstrap";
const Buttons = (props) => {
  return (
    <Button
      type="submit"
      className="bg-info w-50 rounded text-white py-2"
      rounded
      variant="info"
      disabled={props.disabled}
      onClick={props.onSubmit}
    >
      {props.label}
      {props.loading && (
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
          className="pl-3"
          style={{ marginLeft: "20px" }}
        />
      )}
    </Button>
  );
};

export default Buttons;
