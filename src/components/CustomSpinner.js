import React from "react";
import TopBarProgress from "react-topbar-progress-indicator";

TopBarProgress.config({
  barColors: {
    "0": "#6A6FF9",
    "1.0": "#6A6FF9",
  },
  shadowBlur: 5,
});

function CustomSpinner({ isLoading }) {
  return <div>{isLoading && <TopBarProgress />}</div>;
}

export default CustomSpinner;
