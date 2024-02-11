import React, { useState } from "react";
import InputType from "./InputType";
import { Link } from "react-router-dom";
import { handleLogin, handleRegister } from "../../../services/authService";

const Form = ({ formType, submitBtn, formTitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donar");
  const [name, setName] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <>
      <form
        onSubmit={(e) => {
          if (formType === "Login")
            return handleLogin(e, email, password, role);
          else if (formType === "Register")
            return handleRegister(
              e,
              role,
              email,
              password,
              name,
              organisationName,
              hospitalName,
              website,
              address,
              phone
            );
        }}
      >
        <h1 className="text-center">{formTitle}</h1>
        <hr />
        <div className="d-flex mb-3">
          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="donarRadio"
              value={"donar"}
              onChange={(e) => setRole(e.target.value)}
              defaultChecked
            />
            <lable htmlFor="donarRadio" className="form-check-lable">
              Donar
            </lable>
          </div>
          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="adminRadio"
              value={"admin"}
              onChange={(e) => setRole(e.target.value)}
            />
            <lable htmlFor="adminRadio" className="form-check-lable">
              Admin
            </lable>
          </div>
          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="hospitalRadio"
              value={"hospital"}
              onChange={(e) => setRole(e.target.value)}
            />
            <lable htmlFor="hospitalRadio" className="form-check-lable">
              Hospital
            </lable>
          </div>
          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="organisationRadio"
              value={"organisation"}
              onChange={(e) => setRole(e.target.value)}
            />
            <lable htmlFor="organisationRadio" className="form-check-lable">
              Organisation
            </lable>
          </div>
        </div>
        {(() => {
          switch (true) {
            case formType === "Login": {
              return (
                <>
                  <InputType
                    lableText={"Email Address"}
                    lableFor={"forEmail"}
                    inputType={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <InputType
                    lableText={"Password"}
                    lableFor={"forPassword"}
                    inputType={"password"}
                    name={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </>
              );
            }
            case formType === "Register": {
              return (
                <>
                  {(role === "admin" || role === "donar") && (
                    <InputType
                      lableText={"Name"}
                      lableFor={"forName"}
                      inputType={"text"}
                      name={"name"}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  )}
                  {role === "organisation" && (
                    <InputType
                      lableText={"Organisation Name"}
                      lableFor={"forOrganisationName"}
                      inputType={"text"}
                      name={"organisationName"}
                      value={organisationName}
                      onChange={(e) => setOrganisationName(e.target.value)}
                    />
                  )}
                  {role === "hospital" && (
                    <InputType
                      lableText={"Hospital Name"}
                      lableFor={"forHospitalName"}
                      inputType={"text"}
                      name={"hospitalName"}
                      value={hospitalName}
                      onChange={(e) => setHospitalName(e.target.value)}
                    />
                  )}
                  <InputType
                    lableText={"Email Address"}
                    lableFor={"forEmail"}
                    inputType={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <InputType
                    lableText={"Password"}
                    lableFor={"forPassword"}
                    inputType={"password"}
                    name={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <InputType
                    lableText={"Website"}
                    lableFor={"forWebsite"}
                    inputType={"text"}
                    name={"website"}
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                  <InputType
                    lableText={"Address"}
                    lableFor={"forAddress"}
                    inputType={"text"}
                    name={"address"}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />

                  <InputType
                    lableText={"Phone"}
                    lableFor={"forPhone"}
                    inputType={"number"}
                    name={"phone"}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </>
              );
            }
          }
        })()}

        <div className="d-flex">
          {formType === "Login" ? (
            <p>
              Not Register yet ? <Link to="/register">Register</Link>
            </p>
          ) : (
            <p>
              Already Users Please ? <Link to="/login">Login</Link>
            </p>
          )}
        </div>

        <div className="d-flex">
          <button className="btn btn-primary" type="submit">
            {submitBtn}
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
