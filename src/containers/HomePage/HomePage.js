import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Checkbox from "../../components/checkbox/checkbox";
import Input from "../../components/input/input";
import Dropdown from "../../components/Dropdown/dropdown";
import Buttons from "../../components/Button/button";
import TableData from "../../components/Table/table";
import moment from "moment";
import axios from "axios";

const emailRE =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

let regexText = /^[a-zA-Z\s]*$/;
let dobText = /^[0-9/]*$/;

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
  const [regionData, setregionData] = useState([]);
  const [ageErrorMessage, setAgeErrorMessage] = useState(
    "Enter valid date of birth (MM/DD/YYYY)"
  );

  const onchangeInput = (e, id) => {
    if (e.target.id === "fullName") {
      let value = e.target.value.replace("  ", " ");
      setFormData({ ...formData, fullName: value });
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
      if (!dobText.test(e.target.value)) return;
      const getAge = moment(e.target.value, "MM/DD/YYYY").format("DD/MM/YYYY");
      var age = moment(getAge, "DD/MM/YYYY", true)
        .month(0)
        .from(moment().month(0));
      if (age.split(" ")[0] < 18 || age === "Invalid date") {
        setisAgeValid(false);
        setAgeErrorMessage("Enter valid date of birth (MM/DD/YYYY)");
      } else {
        setisAgeValid(true);
        setAgeErrorMessage("Age should be 18");
      }
      setFormData({ ...formData, dob: e.target.value });

      setFormError({
        ...formError,
        dobError:
          e.target.value.length < 10 ||
          age.split(" ")[0] < 18 ||
          age.split(" ")[0] === "a" ||
          age.split(" ")[0] === "in" ||
          age.split(" ")[1] === "days" ||
          !dobText.test(e.target.value) ||
          age === "Invalid date",
      });
    }
    if (e.target.id === "region") {
      setFormData({ ...formData, region: e.target.value });
      if (e.target.value === "Select")
        setFormError({ ...formError, regionError: true });
      else setFormError({ ...formError, regionError: false });
    }
    if (e.target.id === "tnc") {
      setFormData({ ...formData, tnc: e.target.checked });
      setFormError({ ...formError, tncError: false });
    }
  };

  const handleSubmit = (e) => {
    if (
      formData.region === "Select" &&
      formData.dob === "" &&
      formData.fullName === "" &&
      !formData.tnc &&
      formData.email === ""
    ) {
      setFormError({
        ...formError,
        fullNameError: true,
        dobError: true,
        tncError: true,
        emailError: true,
        regionError: true,
      });
      return;
    }
    if (
      formError.fullNameError ||
      formError.dobError ||
      formError.tncError ||
      formError.emailError ||
      formError.regionError
    ) {
      return;
    }
    if (
      formData.region === "Select" ||
      formData.dob === "" ||
      formData.fullName === "" ||
      !formData.tnc ||
      formData.email === ""
    ) {
      if (formData.fullName === "")
        setFormError({
          ...formError,
          fullNameError: true,
        });
      if (formData.email === "")
        setFormError({
          ...formError,
          emailError: true,
        });
      if (formData.dob === "")
        setFormError({
          ...formError,
          dobError: true,
        });
      if (formData.region === "Select")
        setFormError({
          ...formError,
          regionError: true,
        });
      if (!formData.tnc)
        setFormError({
          ...formError,
          tncError: true,
        });
      return;
    }
    setisRegionLoader(true);
    axios
      .get(`https://restcountries.com/v3.1/region/${formData.region}`)
      .then((res) => {
        setregionData(res.data);
        setisRegionLoader(false);
        setFormData({
          ...formData,
          fullName: "",
          email: "",
          dob: "",
          region: "Select",
          tnc: false,
        });
      });
  };

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
                  disabled={isRegionLoader}
                  maxLength={60}
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
                  disabled={isRegionLoader}
                  maxLength={30}
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
                  errorMessage={ageErrorMessage}
                  maxLength={10}
                  placeHolder={"MM/DD/YYYY"}
                  disabled={isRegionLoader}
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
                  disabled={isRegionLoader}
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
                  disabled={isRegionLoader}
                />
              </Col>
            </Row>
            <Row>
              <Col lg={6}>
                <Buttons
                  label="Submit"
                  className="rounded-5"
                  disabled={isRegionLoader}
                  loading={isRegionLoader}
                  onSubmit={handleSubmit}
                />
              </Col>
            </Row>
            {regionData.length > 0 && (
              <Row className="mt-3">
                <hr />
                <Col lg={12}>
                  <TableData label="Submit" data={regionData} />
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default HomePage;
