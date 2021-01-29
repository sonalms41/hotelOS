import React, { useState } from "react";
import Popover from "react-tiny-popover";
import { Link } from "react-router-dom";

function HeaderMain() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  return (
    <nav className="header_wrapper clearfix">
      <div className="container-fluid">
        <div className="header_contain">
          <div className="logo fLeft">
            <Link to={"/"}>
              <img src={require("../assets/img/logo.svg")} alt="Logo" />
            </Link>
          </div>
          <div className="right_menu fRight">
            <ul>
              <li className="fLeft">
                <Popover
                  isOpen={isPopoverOpen}
                  position={"bottom"} // preferred position
                  onClickOutside={() => setIsPopoverOpen(false)}
                  content={
                    <div className="avatar_dropdown">
                      <div className="font12 font-weight-bold">
                        {localStorage.getItem("property-name")}
                      </div>
                      <hr />
                      <a href="" onClick={() => localStorage.clear()}>
                        Logout
                      </a>
                    </div>
                  }
                >
                  <div
                    className="hotel_profileAvatar cursorPointer"
                    onClick={() => setIsPopoverOpen((prevState) => !prevState)}
                  >
                    <img
                      src={require("../assets/img/icons/build.svg")}
                      alt="Profile Dropdown"
                    />
                    <span className="ml-2">
                      {localStorage.getItem("property-name").length < 12
                        ? localStorage.getItem("property-name")
                        : localStorage.getItem("property-name").slice(0, 12) +
                          "..."}
                    </span>
                  </div>
                </Popover>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default HeaderMain;
