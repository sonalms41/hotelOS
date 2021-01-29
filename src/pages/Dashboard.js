import React, { useState } from "react";
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import { adminStatus } from "../components/utility/localStorage";
import { USER_TOKEN } from "../components/LocalStorageInfo";

const HeaderDash = React.lazy(() => import("../components/HeaderDash"));
const SidebarDash = React.lazy(() => import("../components/SidebarDash"));
const DashLanding = React.lazy(() => import("./mgmt/DashLanding"));
const Bookings = React.lazy(() => import("./mgmt/Bookings"));
const GuestWalkin = React.lazy(() => import("./mgmt/GuestWalkin"));
const AddBookingWalkIns = React.lazy(() => import("./mgmt/AddBookingWalkIns"));
const ReservationDetail = React.lazy(() => import("./mgmt/ReservationDetail"));
const RoomList = React.lazy(() => import("./mgmt/RoomList"));
const RoomMgmt = React.lazy(() => import("./mgmt/RoomMgmt"));
const SubRoomType = React.lazy(() => import("./mgmt/SubRoomType"));
const AddRoom = React.lazy(() => import("./mgmt/AddRoom"));
const EditRoom = React.lazy(() => import("./mgmt/EditRoom"));
const RoomDetails = React.lazy(() => import("./mgmt/RoomDetails"));
const GuestDetails = React.lazy(() => import("./mgmt/GuestDetails"));
const GuestBilling = React.lazy(() => import("./mgmt/GuestBilling"));
const PropertyMgmt = React.lazy(() => import("./mgmt/PropertyMgmt"));
const StaffMgmt = React.lazy(() => import("./mgmt/StaffMgmt"));
const AddStaff = React.lazy(() => import("./mgmt/AddStaff"));
const FoodMgmt = React.lazy(() => import("./mgmt/FoodMgmt"));
const OrdersMgmt = React.lazy(() => import("./mgmt/OrdersMgmt"));
const RateMgmt = React.lazy(() => import("./mgmt/RateMgmt"));
const DashPhotos = React.lazy(() => import("./mgmt/DashPhotos"));
const Facilities = React.lazy(() => import("./mgmt/Facilities"));
const Calendar = React.lazy(() => import("./mgmt/Calendar"));
const Notifications = React.lazy(() => import("./mgmt/Notifications"));
const ManageUsers = React.lazy(() => import("./mgmt/ManageUsers"));
const ChangePassword = React.lazy(() => import("./mgmt/ChangePassword"));
const Reviews = React.lazy(() => import("./mgmt/Reviews"));
const Analytics = React.lazy(() => import("./mgmt/Analytics"));
const Finance = React.lazy(() => import("./mgmt/Finance"));

function Dashboard() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [userToken] = useState(USER_TOKEN());

  let { path } = useRouteMatch();

  const toggleSidebar = () => setShowSidebar((prevState) => !prevState);

  if (!userToken) return <Redirect to={"../../"} />;
  else
    return (
      <>
        <HeaderDash toggleSidebar={toggleSidebar} />
        <SidebarDash showSidebar={adminStatus() ? true : showSidebar} />
        <div
          className={showSidebar ? "page_contents" : "page_contents_no_sidebar"}
        >
          <Switch>
            <Route path={`${path}/landing`} component={DashLanding} />
            <Route path={`${path}/bookings`} component={Bookings} />
            <Route path={`${path}/guest-walkin`} component={GuestWalkin} />
            <Route
              path={`${path}/add-booking-walk`}
              component={AddBookingWalkIns}
            />
            <Route
              path={`${path}/reservation/:id`}
              component={ReservationDetail}
            />
            <Route path={`${path}/room-list`} component={RoomList} />
            <Route path={`${path}/room-mgmt`} component={RoomMgmt} />
            <Route path={`${path}/subroom-type/:id`} component={SubRoomType} />
            <Route path={`${path}/add-room/:id`} component={AddRoom} />
            <Route path={`${path}/edit-room/:id`} component={EditRoom} />
            <Route path={`${path}/room-details/:id`} component={RoomDetails} />
            <Route
              path={`${path}/guest-details/:id`}
              component={GuestDetails}
            />
            <Route
              path={`${path}/guest-billing/:id`}
              component={GuestBilling}
            />
            <Route path={`${path}/property-mgmt`} component={PropertyMgmt} />
            <Route path={`${path}/staff-mgmt`} component={StaffMgmt} />
            <Route path={`${path}/add-staff`} component={AddStaff} />
            <Route path={`${path}/food-mgmt`} component={FoodMgmt} />
            <Route path={`${path}/order-history`} component={OrdersMgmt} />
            <Route path={`${path}/rate-mgmt`} component={RateMgmt} />
            <Route path={`${path}/pictures`} component={DashPhotos} />
            <Route path={`${path}/facilities`} component={Facilities} />
            <Route path={`${path}/calendar`} component={Calendar} />
            <Route path={`${path}/notifications`} component={Notifications} />
            <Route path={`${path}/manage-users`} component={ManageUsers} />
            <Route
              path={`${path}/change-password`}
              component={ChangePassword}
            />
            <Route path={`${path}/reviews`} component={Reviews} />
            <Route path={`${path}/analytics`} component={Analytics} />
            <Route path={`${path}/finance`} component={Finance} />
          </Switch>
        </div>
      </>
    );
}

export default Dashboard;
