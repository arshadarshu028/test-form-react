// search.js
import React from "react";
import { Form } from "react-bootstrap";

const Dropdown = ({ val, onSearch, ...props }) => {
  return (
    <>
      <Form.Label>{props.label}</Form.Label>
      <Form.Select
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
          <option value={val.name}>{val.name}</option>
        ))}
      </Form.Select>
      <Form.Control.Feedback type="invalid">
        {props.errorMessage}
      </Form.Control.Feedback>
    </>
  );
};

export default Dropdown;
