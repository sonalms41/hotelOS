import React, { useState, useRef } from "react";
import { Redirect } from "react-router-dom";
import Header from "../components/Header";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [OTP, setOTP] = useState("");
  const [OTP2, setOTP2] = useState("");
  const [OTP3, setOTP3] = useState("");
  const [OTP4, setOTP4] = useState("");
  const [OTP5, setOTP5] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [OTPDone, setOTPDone] = useState(false);
  const [emailValid, setEmailValid] = useState("");
  const [loginWarning, setLoginWarning] = useState("");
  const [loginError, setLoginError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [redirection, setRedirection] = useState(false);
  const [jwt, setJwt] = useState(localStorage.getItem("con-jwt"));

  const otp2 = useRef();
  const otp3 = useRef();
  const otp4 = useRef();
  const otp5 = useRef();
  const confirmBtn = useRef();

  const otpInput = (e, i) => {
    if (i === 1) {
      setOTP(e.target.value);
      otp2.current.focus();
    }
    if (i === 2) {
      setOTP2(e.target.value);
      otp3.current.focus();
    }
    if (i === 3) {
      setOTP3(e.target.value);
      otp4.current.focus();
    }
    if (i === 4) {
      setOTP4(e.target.value);
      otp5.current.focus();
    }
    if (i === 5) {
      setOTP5(e.target.value);
      confirmBtn.current.focus();
    }
  };
  const otpPaste = (e) => {
    setOTP(e.clipboardData.getData("Text").slice(0, 1));
    setOTP2(e.clipboardData.getData("Text").slice(1, 2));
    setOTP3(e.clipboardData.getData("Text").slice(2, 3));
    setOTP4(e.clipboardData.getData("Text").slice(3, 4));
    setOTP5(e.clipboardData.getData("Text").slice(4, 5));
  };

  const handleRequest = () => {
    setEmailValid("");
    setLoginWarning("");
    setLoginError("");
    if (email) {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email))
        setEmailValid("Invalid email address!");
      else {
        const fetchData = async () => {
          await fetch(`${process.env.REACT_APP_API_BASE_URL}/send-otp/`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: email,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("data", data);
              if (data.status_code === 200) setChangePassword(true);
              else setLoginError(data.message);
            })
            .catch((error) => console.error(error));
        };
        fetchData();
      }
    } else setLoginWarning("Field required!");
  };
  const handleOTP = () => {
    setLoginError("");
    const OTPCode = OTP.concat(OTP2, OTP3, OTP4, OTP5);
    const fetchData = async () => {
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/verify-email/`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          number: OTPCode,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data", data);
          if (data.status_code === 200) setOTPDone(true);
          else setLoginError(data.message);
        })
        .catch((error) => console.error(error));
    };
    fetchData();
  };
  const handleSubmit = () => {
    setLoginWarning("");
    setLoginError("");
    setPasswordError("");
    if (password) {
      if (password === rePassword) {
        const fetchData = async () => {
          await fetch(
            `${process.env.REACT_APP_API_BASE_URL}/change-password/`,
            {
              method: "post",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: email,
                password: password,
              }),
            }
          )
            .then((res) => res.json())
            .then((data) => {
              console.log("data", data);
              if (data.status_code === 200) setRedirection(true);
            })
            .catch((error) => console.error(error));
        };
        fetchData();
      } else setPasswordError("Please retype your password correctly!");
    } else setLoginWarning("Field required!");
  };

  const keyDownHandlerRequest = (e) => {
    e.key === "Enter" && handleRequest();
  };
  const keyDownHandlerSubmit = (e) => {
    e.key === "Enter" && handleSubmit();
  };

  const formEmail = (
    <>
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
            !email && loginWarning ? "text-danger text-center" : "display-none"
          }
        >
          {loginWarning}
        </p>
        <p className={emailValid ? "text-danger text-center" : "display-none"}>
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
    </>
  );

  const formOTP = (
    <>
      <div className="field-wrapper text-center">
        <h5 className="mt-2">{email}</h5>
        <p className="mt-3 mb-4">
          Please enter the verification code from the email we just send you.
        </p>
        <div className="otp__input">
          <input
            type="text"
            maxLength={1}
            value={OTP && OTP}
            className="form-control otp__code"
            onChange={(e) => otpInput(e, 1)}
            onPaste={otpPaste}
          />
          <input
            type="text"
            maxLength={1}
            value={OTP2 && OTP2}
            ref={otp2}
            className="form-control otp__code"
            onChange={(e) => otpInput(e, 2)}
            onPaste={otpPaste}
          />
          <input
            type="text"
            maxLength={1}
            value={OTP3 && OTP3}
            ref={otp3}
            className="form-control otp__code"
            onChange={(e) => otpInput(e, 3)}
            onPaste={otpPaste}
          />
          <input
            type="text"
            maxLength={1}
            value={OTP4 && OTP4}
            ref={otp4}
            className="form-control otp__code"
            onChange={(e) => otpInput(e, 4)}
            onPaste={otpPaste}
          />
          <input
            type="text"
            maxLength={1}
            value={OTP5 && OTP5}
            ref={otp5}
            className="form-control otp__code"
            onChange={(e) => otpInput(e, 5)}
            onPaste={otpPaste}
          />
        </div>
        <p className="mt-4">
          Didn't got it!{" "}
          <strong className="cursorPointer" onClick={handleRequest}>
            Resend code
          </strong>
        </p>
      </div>
      <div className="field-wrapper">
        <button
          type="submit"
          ref={confirmBtn}
          className="btn btn-primary font12"
          onClick={handleOTP}
        >
          Confirm
        </button>
      </div>
    </>
  );

  const formPassword = (
    <>
      <div id="password-field" className="field-wrapper input">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          className={
            !password && loginWarning
              ? "form-control error-input"
              : "form-control"
          }
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={keyDownHandlerSubmit}
        />
        <img
          className="cursorPointer eye-password"
          src={require("../assets/img/icons/icon-awesome-eye.svg")}
          alt="eye-icon"
          onClick={() => setShowPassword(!showPassword)}
        />
        <p
          className={
            !password && loginWarning
              ? "text-danger text-center"
              : "display-none"
          }
        >
          {loginWarning}
        </p>
      </div>
      <div id="password2-field" className="field-wrapper input">
        <label htmlFor="rePassword">Re-type Password</label>
        <input
          id="rePassword"
          type={showRePassword ? "text" : "password"}
          className={
            (!rePassword && loginWarning) || passwordError
              ? "form-control error-input"
              : "form-control"
          }
          placeholder="******"
          onChange={(e) => setRePassword(e.target.value)}
          onKeyDown={keyDownHandlerSubmit}
        />
        <img
          className="cursorPointer eye-password"
          src={require("../assets/img/icons/icon-awesome-eye.svg")}
          alt="eye-icon"
          onClick={() => setShowRePassword(!showRePassword)}
        />
        <p
          className={
            !rePassword && loginWarning
              ? "text-danger text-center"
              : "display-none"
          }
        >
          {loginWarning}
        </p>
        <p
          className={passwordError ? "text-danger text-center" : "display-none"}
        >
          {passwordError}
        </p>
      </div>
      <div className="field-wrapper">
        <button
          type="submit"
          className="btn btn-primary font12"
          onClick={handleSubmit}
        >
          Change
        </button>
      </div>
    </>
  );

  if (jwt) return <Redirect to={"./basicInfo"} />;
  else if (redirection) return <Redirect to={"./"} />;
  else
    return (
      <>
        <Header />
        <div className="login_wrapper">
          <div className="container">
            <div className="form-content">
              <div className="head_form">
                <h3 className="textCenter">
                  {!changePassword && "Forgot Password"}
                  {changePassword && !OTPDone && "Verification"}
                  {changePassword && OTPDone && "Change Password"}
                </h3>
              </div>
              <div className="form_wrap">
                {loginError && (
                  <div className="text-danger text-center">
                    <strong>Error!</strong> {loginError}
                  </div>
                )}
                {!changePassword && formEmail}
                {changePassword && !OTPDone && formOTP}
                {changePassword && OTPDone && formPassword}
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default ForgotPassword;
