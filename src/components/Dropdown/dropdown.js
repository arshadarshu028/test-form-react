// search.js
import React from "react";
import { Form } from "react-bootstrap";

const Dropdown = ({ val, onSearch, ...props }) => {
  return (
    <div className="mb-3">
      <Form.Label>{props.label}</Form.Label>
      <Form.Select
        disabled={props.disabled}
        className="me-sm-2  "
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        isInvalid={props.error}
      >
        <option disabled value={"Select"}>
          Select
        </option>
        {props.options.map((val) => (
          <option key={val.name} value={val.name}>
            {val.name}
          </option>
        ))}
      </Form.Select>
      <Form.Control.Feedback type="invalid">
        {props.errorMessage}
      </Form.Control.Feedback>
    </div>
  );
};

export default Dropdown;
