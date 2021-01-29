import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// ADMIN-PAGES
import DashboardAdmin from "./components/admin/pages/dashboard/DashBoard";
import AdminPrivateRoute from "./components/admin/route/AdminPrivateRoute";
import AdminGuest from "./components/admin/pages/guest";
import AdminGuestRoute from "./components/admin/route/guestRoute";

//import AdminPropRoute from "./components/admin/property/propRoute";
import AdminPropRoute from "./components/admin/route/propertyRoute";
import AdminMasterRoute from "./components/admin/route/masterRoute";
import AdminAddNewBooking from "./components/admin/pages/newBooking";
import AdminPaymentGateway from "./components/admin/pages/paymentGateway";

// ADMIN CONTEXT-API
import AdminContextApi from "./components/admin/contextApi";
import MasterOccupancy from "./components/admin/pages/master/MasterOccupancy";
import OtpVerification from "./pages/OtpVerification";
import ReservationWebContent from "./components/admin/pages/reservationWebContent";

// HOTEL OS
const Login = React.lazy(() => import("./pages/Login"));
const Registration = React.lazy(() => import("./pages/Registration"));
const ForgotPassword = React.lazy(() => import("./pages/ForgotPassword"));
const VerifyEmail = React.lazy(() => import("./pages/VerifyEmail"));
const BasicInfo = React.lazy(() => import("./pages/BasicInfo"));
const Contact = React.lazy(() => import("./pages/Contact"));
const Amenities = React.lazy(() => import("./pages/Amenities"));
const RoomType = React.lazy(() => import("./pages/RoomType"));
const Photos = React.lazy(() => import("./pages/Photos"));
const Policies = React.lazy(() => import("./pages/Policies"));
const BankDetails = React.lazy(() => import("./pages/BankDetails"));
const LegalInfo = React.lazy(() => import("./pages/LegalInfo"));
const Documents = React.lazy(() => import("./pages/Documents"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const TermsNConditions = React.lazy(() => import("./pages/TermsNConditions"));
const TermsNConditionsVendor = React.lazy(() =>
  import("./pages/TermsNConditionsVendor")
);

function App() {
  if (process.env.NODE_ENV === "production") {
    console.log = function () {};
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/token-expire-time/`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("con-jwt")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("-->", data);
          if (data.status_code === 200) {
            const tokenTimeout = parseInt(data.expires_in);
            if (tokenTimeout < 86400) localStorage.clear();
          } else if (data.status_code == 550) localStorage.clear();
        })
        .catch((error) => console.error(error));
    };
    fetchData();
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/verify-email" component={VerifyEmail} />
        <Route path="/register" component={Registration} />
        <Route path="/otp-verification/:email" component={OtpVerification} />
        <Route path="/basic-info" component={BasicInfo} />
        <Route path="/contact" component={Contact} />
        <Route path="/amenities" component={Amenities} />
        <Route path="/room-type" component={RoomType} />
        <Route path="/photos" component={Photos} />
        <Route path="/policies" component={Policies} />
        <Route path="/bank-details" component={BankDetails} />
        <Route path="/legal-info" component={LegalInfo} />
        <Route path="/documents" component={Documents} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/terms-n-conditions" component={TermsNConditions} />
        <Route
          path="/terms-n-conditions-vendor"
          component={TermsNConditionsVendor}
        />

        {/*  ADMIN  */}
        <AdminContextApi>
          <AdminPrivateRoute
            path="/admin-dashboard"
            component={DashboardAdmin}
          />
          <AdminPrivateRoute
            path="/admin-property"
            component={AdminPropRoute}
          />

          <AdminPrivateRoute
            path="/admin-master"
            component={AdminMasterRoute}
          />
          <AdminPrivateRoute
            path="/admin-content"
            component={ReservationWebContent}
          />
          <AdminPrivateRoute
            path="/admin-addnewbooking"
            component={AdminAddNewBooking}
          />
          <AdminPrivateRoute
            path="/admin-paymentgateway"
            component={AdminPaymentGateway}
          />
          <AdminPrivateRoute path="/admin-guest" component={AdminGuestRoute} />
        </AdminContextApi>
      </Switch>
    </Router>
  );
}

export default App;
