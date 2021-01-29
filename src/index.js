import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import CustomSpinner from "./components/CustomSpinner";
import "./assets/css/bootstrap.min.css";
import "./assets/css/element.css";
import "./assets/css/style.css";
import "./scss/admin/main.scss";
import "./assets/css/extra.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./assets/css/responsive.css";

ReactDOM.render(
  <React.StrictMode>
    <Suspense
      fallback={
        <div>
          <CustomSpinner isLoading={ true } />
        </div>
      }
    >
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);
