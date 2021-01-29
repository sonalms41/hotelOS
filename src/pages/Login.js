import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Header from "../components/Header";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailValid, setEmailValid] = useState("");
  const [loginWarning, setLoginWarning] = useState("");
  const [loginError, setLoginError] = useState("");
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [isDashboard, setIsDashboard] = useState(
    localStorage.getItem("user-page")
  );
  const [jwt, setJwt] = useState(localStorage.getItem("con-jwt"));
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("admin-status"));

  const handleSubmit = () => {
    setEmailValid("");
    setLoginWarning("");
    setLoginError("");
    setVerifyEmail(false);
    if (email && password) {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email))
        setEmailValid("Invalid email address!");
      else {
        const fetchData = async () => {
          await fetch(`${process.env.REACT_APP_API_BASE_URL}/vendor-login/`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("data", data);
              if (data.status_code === 200) {
                localStorage.setItem("con-jwt", data.token);
                setJwt(data.token);
                if (!data.result.is_admin) {
                  localStorage.setItem("user-id", data.result.user_id);
                  localStorage.setItem("user-page", data.result.user_pages);
                  localStorage.setItem(
                    "property-id",
                    data.result.property_list[
                      data.result.property_list.length - 1
                    ].property_id
                  );
                  localStorage.setItem(
                    "property-name",
                    data.result.property_list[
                      data.result.property_list.length - 1
                    ].property_name
                  );
                  setIsDashboard(data.result.user_pages);
                } else {
                  localStorage.setItem("admin-status", data.result.is_admin);
                  setIsAdmin(data.result.is_admin);
                }
              } else if (data.status_code === 400) {
                setLoginError(data.message);
                setVerifyEmail(true);
              } else setLoginError(data.message);
            })
            .catch((error) => console.error(error));
        };
        fetchData();
      }
    } else setLoginWarning("Field required!");
  };

  const keyDownHandler = (e) => {
    e.key === "Enter" && handleSubmit();
  };

  if (jwt && isAdmin) return <Redirect to={"./admin-dashboard"} />;
  else if (jwt && isDashboard == 200)
    return <Redirect to={"./dashboard/landing"} />;
  else if (jwt && isDashboard == 400) return <Redirect to={"./basic-info"} />;
  else
    return (
      <>
        <Header page={"Login"} />
        <div className="login_wrapper">
          <div className="container">
            <div className="form-content">
              <div className="head_form">
                <h3 className="textCenter">Login</h3>
              </div>
              <div className="form_wrap">
                {loginError && (
                  <>
                    <div className="text-danger">
                      <strong>Error!</strong> {loginError}
                    </div>
                    {verifyEmail && (
                      <div className="verify_email">
                        <Link to={"./verify-email"}>Verify Email</Link>
                      </div>
                    )}
                  </>
                )}
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
                    onKeyDown={keyDownHandler}
                  />
                  <p
                    className={
                      !email && loginWarning ? "text-danger" : "display-none"
                    }
                  >
                    {loginWarning}
                  </p>
                  <p className={emailValid ? "text-danger" : "display-none"}>
                    {emailValid}
                  </p>
                </div>
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
                    onKeyDown={keyDownHandler}
                  />
                  <img
                    className="cursorPointer eye-password"
                    src={require("../assets/img/icons/icon-awesome-eye.svg")}
                    alt="eye-icon"
                    onClick={() => setShowPassword((prevState) => !prevState)}
                  />
                  <p
                    className={
                      !password && loginWarning ? "text-danger" : "display-none"
                    }
                  >
                    {loginWarning}
                  </p>
                </div>
                <div className="forget_password">
                  <Link to={"./forgot-password"}>Forgot Password?</Link>
                </div>
                <div className="field-wrapper">
                  <button
                    type="submit"
                    className="btn btn-primary font12"
                    onClick={handleSubmit}
                  >
                    Log In
                  </button>
                </div>
                <div className="btn-register">
                  <Link to={"./register"}>Register</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default Login;
