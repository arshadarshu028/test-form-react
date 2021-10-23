import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Checkbox from "../../components/checkbox/checkbox";
import Input from "../../components/input/input";
import Dropdown from "../../components/Dropdown/dropdown";
import Buttons from "../../components/Button/button";
import TableData from "../../components/Table/table";
import moment from "moment";

const emailRE =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

let regexText = /^([a-zA-Z0-9-]+\s)[a-zA-Z0-9-]$/;
let dobRegx =
  /^(((0[13-9]|1[012])[-/]?(0[1-9]|[12][0-9]|30)|(0[13578]|1[02])[-/]?31|02[-/]?(0[1-9]|1[0-9]|2[0-8]))[-/]?[0-9]{4}|02[-/]?29[-/]?([0-9]{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0[0-9]|1[0-6])00))$/;

const HomePage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dob: "",
    region: "Select",
    tnc: false,
  });

  const [formError, setFormError] = useState({
    fullNameError: false,
    emailError: false,
    regionError: false,
    dobError: false,
    tncError: false,
  });

  const [isAgeValid, setisAgeValid] = useState(false);
  const [isRegionLoader, setisRegionLoader] = useState(false);

  const onchangeInput = (e, id) => {
    console.log(e.target.id, e.target.value);
    if (e.target.id === "fullName") {
      setFormData({ ...formData, fullName: e.target.value });
      setFormError({
        ...formError,
        fullNameError: !regexText.test(e.target.value),
      });
    }
    if (e.target.id === "email") {
      setFormData({ ...formData, email: e.target.value });
      setFormError({ ...formError, emailError: !emailRE.test(e.target.value) });
    }
    if (e.target.id === "dob") {
      const getAge = moment(e.target.value).format("DD/MM/YYYY");
      var age = moment(getAge, "DD/MM/YYYY", true)
        .month(0)
        .from(moment().month(0));
      console.log(age);
      if (age.split(" ")[0] < 18) setisAgeValid(false);
      else setisAgeValid(true);
      setFormData({ ...formData, dob: e.target.value });
      setFormError({
        ...formError,
        dobError:
          e.target.value.length < 10 ||
          age.split(" ")[0] < 18 ||
          age === "a" ||
          age == "Invalid date" ||
          age.includes("in") ||
          age.includes("hours"),
      });
    }
    if (e.target.id === "region") {
      setFormData({ ...formData, region: e.target.value });
    }
    if (e.target.id === "tnc") {
      setFormData({ ...formData, tnc: e.target.checked });
      setFormError({ ...formError, tncError: false });
    }
  };

  const handleSubmit = (e) => {
    if (
      formData.region === "Select" ||
      formData.dob === "" ||
      formData.fullName === "" ||
      !formData.tnc ||
      formData.email === ""
    ) {
      setFormError({
        ...formError,
        regionError: true,
        fullNameError: true,
        emailError: true,
        dobError: true,
        tncError: true,
      });
      fetch(
        `http://restcountries.herokuapp.com/api/v1/region/${formData.region}`
      )
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
        });
    }
  };
  console.log(formData);

  return (
    <section>
      <Container>
        <Row className="justify-content-center my-4">
          <Col lg="8" offset={2}>
            <h2 className="text-center">Create Form Data</h2>
            <Row>
              <Col lg={6}>
                <Input
                  label="Full Name"
                  type="text"
                  id="fullName"
                  onchangeInput={onchangeInput}
                  value={formData.fullName}
                  error={formError.fullNameError}
                  errorMessage={"Enter valid name"}
                  placeHolder={"Please enter your full name"}
                />
              </Col>
              <Col lg={6}>
                <Input
                  label="Email"
                  type="email"
                  id="email"
                  onchangeInput={onchangeInput}
                  value={formData.email}
                  error={formError.emailError}
                  errorMessage={"Enter valid emailId"}
                  placeHolder={"Please enter your emailId"}
                />
              </Col>
            </Row>
            <Row>
              <Col lg={6}>
                <Input
                  label="Date of Birth (MM/DD/YYYY)"
                  type="text"
                  id="dob"
                  onchangeInput={onchangeInput}
                  value={formData.dob}
                  error={formError.dobError}
                  errorMessage={
                    isAgeValid
                      ? "Enter date of birth (MM/DD/YYYY)"
                      : "Age should be 18"
                  }
                  maxLength={10}
                  placeHolder={"MM/DD/YYYY"}
                />
              </Col>
              <Col lg={6}>
                <Dropdown
                  label="Region"
                  options={[
                    { name: "Africa" },
                    { name: "Americas" },
                    { name: "Asia" },
                    { name: "Europe" },
                    { name: "Oceania" },
                  ]}
                  id={"region"}
                  value={formData.region}
                  onChange={onchangeInput}
                  error={formError.regionError}
                  errorMessage={"Select your region"}
                />
              </Col>
            </Row>
            <Row>
              <Col lg={6}>
                <Checkbox
                  id="tnc"
                  label="I agree to Terms and Conditions"
                  checked={formData.tnc}
                  onChange={onchangeInput}
                  error={formError.tncError}
                />
              </Col>
            </Row>
            <Row>
              <Col lg={6}>
                <Buttons
                  label="Submit"
                  className="rounded-5"
                  // disabled={false}
                  onSubmit={handleSubmit}
                />
              </Col>
            </Row>
            <hr />
            <Row>
              <Col lg={12}>
                <TableData label="Submit" />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default HomePage;
