import React from "react";
import Form from "../../component/shared/Form/Form";
import { useSelector } from "react-redux";
import Spinner from "../../component/shared/Spinner";
import { toast } from "react-toastify";

const Login = () => {
  const { loading, error } = useSelector((state) => state.auth);
  return (
    <>
      {error && toast.error(error)}
      {loading ? (
        <Spinner />
      ) : (
        <div className="row g-0">
          <div className="col-md-8 form-banner">
            <img src="./assests/images/banner1.jpg" alt="loginImagebg" />
          </div>
          <div className="col-md-4 form-container">
            <Form
              formTitle={"Login Page"}
              submitBtn={"Login"}
              formType={"Login"}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
