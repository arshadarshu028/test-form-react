import React from "react";
import { Table } from "react-bootstrap";

const TableData = (props) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Country</th>
          <th>Capital</th>
          <th>Sub Region</th>
          <th>Language</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((val, id) => (
          <tr key={id + 1}>
            <td>{id + 1}</td>
            <td>{val.name.official}</td>
            <td>{val.capital ? val.capital : "-"}</td>
            <td>{val.subregion}</td>
            <td>{Object.values(val.languages).toString()}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableData;
