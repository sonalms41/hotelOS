import React from "react";
import { Link } from "react-router-dom";

function Header({ page }) {
  return (
    <nav className="header_wrapper clearfix">
      <div className="container">
        <div className="header_contain">
          <div className="logo fLeft">
            <img src={require("../assets/img/logo.svg")} alt="Logo" />
          </div>
          <div className="right_menu fRight">
            {page === "OtpVerification" ? (
              <ul>
                <li className="fLeft mt-3">
                  <Link to={"/"}>Login</Link>
                </li>
                <li className="fLeft mt-3">
                  <Link to={"/register"}>Register</Link>
                </li>
              </ul>
            ) : (
              <ul>
                <li className="fLeft mt-3">
                  {page !== "Login" ? (
                    <Link to={"/"}>Login</Link>
                  ) : (
                    <Link to={"/register"}>Register</Link>
                  )}
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Header;
