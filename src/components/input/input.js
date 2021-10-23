// search.js
import React from "react";
import { Form } from "react-bootstrap";

const Input = ({ val, onSearch, ...props }) => {
  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>{props.label}</Form.Label>
        <Form.Control
          type={props.type}
          name={props.name}
          id={props.id}
          value={props.value}
          onChange={props.onchangeInput}
          isInvalid={props.error}
          maxLength={props.maxLength}
          placeholder={props.placeHolder}
        />
        <Form.Control.Feedback type="invalid">
          {props.errorMessage}
        </Form.Control.Feedback>
      </Form.Group>
    </>
  );
};

export default Input;
