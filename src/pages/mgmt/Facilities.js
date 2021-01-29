import React, { useState } from "react";
import Amenities from "../Amenities";

function Facilities() {
  const [submitAmenities, setSubmitAmenities] = useState(false);
  return (
    <>
      <div className="main_tile">
        <h4 className="heading">Amenities & Facilities</h4>
      </div>
      <Amenities dashboard={true} submit={submitAmenities} />
      <span
        className="btn_addo"
        onClick={() => setSubmitAmenities((prevState) => !prevState)}
      >
        Save
      </span>
    </>
  );
}

export default Facilities;
