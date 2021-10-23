import React from "react";
import { Button } from "react-bootstrap";
const Buttons = (props) => {
  return (
    <Button
      type="submit"
      className="bg-info w-50 rounded text-white"
      rounded
      variant="info"
      disabled={props.disabled}
      onClick={props.onSubmit}
    >
      {props.label}
    </Button>
  );
};

export default Buttons;
