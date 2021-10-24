// search.js
import React from "react";
import { Form } from "react-bootstrap";

const Checkbox = ({ val, onSearch, ...props }) => {
  return (
    <>
      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          id={props.id}
          label={props.label}
          onChange={props.onChange}
          isInvalid={props.error}
          disabled={props.disabled}
          checked={props.checked}
        />
      </Form.Group>
    </>
  );
};

export default Checkbox;
