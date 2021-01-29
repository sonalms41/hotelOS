import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../components/Header";
import CustomSpinner from "../components/CustomSpinner";

function VerifyEmail() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState("");
  const [verifiedEmail, setVerifiedEmail] = useState(false);
  const [loginWarning, setLoginWarning] = useState("");

  const handleRequest = () => {
    setEmailValid("");
    setLoginWarning("");
    if (email) {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email))
        setEmailValid("Invalid email address!");
      else {
        const fetchData = async () => {
          setIsLoading(true);
          await fetch(`${process.env.REACT_APP_API_BASE_URL}/re-send-email/`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: email,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("data", data);
              if (data.status_code === 200) {
                toast.success(data.message);
                setVerifiedEmail(true);
                setIsLoading(false);
              }
            })
            .catch((error) => console.error(error));
        };
        fetchData();
      }
    } else setLoginWarning("Field required!");
  };

  const keyDownHandlerRequest = (e) => {
    e.key === "Enter" && handleRequest();
  };

  if (verifiedEmail) return <Redirect to={`/otp-verification/${email}`} />;
  else
    return (
      <>
        <CustomSpinner isLoading={isLoading} />
        <Header />
        <div className="login_wrapper">
          <div className="container">
            <div className="form-content">
              <div className="head_form">
                <h3 className="textCenter">Verify Email</h3>
              </div>
              <div className="form_wrap">
                <div id="username-field" className="field-wrapper input">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="text"
                    className={
                      (!email && loginWarning) || emailValid
                        ? "form-control error-input"
                        : "form-control"
                    }
                    placeholder="Enter Your Email"
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={keyDownHandlerRequest}
                  />
                  <p
                    className={
                      !email && loginWarning
                        ? "text-danger text-center"
                        : "display-none"
                    }
                  >
                    {loginWarning}
                  </p>
                  <p
                    className={
                      emailValid ? "text-danger text-center" : "display-none"
                    }
                  >
                    {emailValid}
                  </p>
                </div>
                <div className="field-wrapper">
                  <button
                    type="submit"
                    className="btn btn-primary font12"
                    onClick={handleRequest}
                  >
                    Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default VerifyEmail;
