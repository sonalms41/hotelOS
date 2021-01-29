import React from "react";

function Footer(props) {
  const { nPage, handlePrevPage, handleSubmit } = props;
  return (
    <div className="nav-footer">
      <div className="container-fluid">
        <div className="left_num fLeft">
          <div className="current_page">
            <span className="crt-num">{nPage}</span>
            <span className="whole-num">of 11</span>
          </div>
        </div>
        <div className="left-actionbtn fRight">
          <div className="btn-sub">
            <span
              className="btn_submit bg-color-light-blue mr-3"
              onClick={handlePrevPage}
            >
              Back
            </span>
            <span className="btn_submit" onClick={handleSubmit}>
              Save & Next
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
