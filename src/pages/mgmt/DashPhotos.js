import React, { useState } from "react";
import Photos from "../Photos";

function DashPhotos() {
  const [submitPhotos, setSubmitPhotos] = useState(false);
  return (
    <>
      <div className="main_tile">
        <h4 className="heading">Photos</h4>
      </div>
      <Photos dashboard={true} submit={submitPhotos} />
      <span
        className="btn_addo"
        onClick={() => setSubmitPhotos((prevState) => !prevState)}
      >
        Save
      </span>
    </>
  );
}

export default DashPhotos;
