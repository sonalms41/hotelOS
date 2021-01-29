import React from "react";
import { NavLink, useRouteMatch } from "react-router-dom";
import { adminStatus } from "./utility/localStorage";

function SidebarDash({ showSidebar, className }) {
  let { url } = useRouteMatch();

  return (
    <div className={className?className:"", showSidebar ? "sidebar_wrapper" : "sidebar_hide"}>
      <div className="list-menuSidebar">
        <div className="row">
          <div className="col-6">
            <NavLink
              className="list_itemMenu"
              to={
                adminStatus()
                  ? "/admin-property/mgmt/landing"
                  : `${url}/landing`
              }
              activeClassName={"dash_selected"}
            >
              <svg
                id="dashboard"
                xmlns="http://www.w3.org/2000/svg"
                width="29.154"
                height="29.154"
                viewBox="0 0 29.154 29.154"
              >
                <path
                  id="Path_285"
                  data-name="Path 285"
                  d="M11.236,0H2.126A2.128,2.128,0,0,0,0,2.126V7.592A2.128,2.128,0,0,0,2.126,9.718h9.111a2.128,2.128,0,0,0,2.126-2.126V2.126A2.128,2.128,0,0,0,11.236,0Zm0,0"
                  transform="translate(0 0)"
                  fill="#747474"
                />
                <path
                  id="Path_286"
                  data-name="Path 286"
                  d="M11.236,213.332H2.126A2.128,2.128,0,0,0,0,215.458v12.755a2.128,2.128,0,0,0,2.126,2.126h9.111a2.128,2.128,0,0,0,2.126-2.126V215.458A2.128,2.128,0,0,0,11.236,213.332Zm0,0"
                  transform="translate(0 -201.185)"
                  fill="#747474"
                />
                <path
                  id="Path_287"
                  data-name="Path 287"
                  d="M288.569,341.332h-9.111a2.128,2.128,0,0,0-2.126,2.126v5.466a2.128,2.128,0,0,0,2.126,2.126h9.111a2.128,2.128,0,0,0,2.126-2.126v-5.466A2.128,2.128,0,0,0,288.569,341.332Zm0,0"
                  transform="translate(-261.54 -321.896)"
                  fill="#747474"
                />
                <path
                  id="Path_288"
                  data-name="Path 288"
                  d="M288.569,0h-9.111a2.128,2.128,0,0,0-2.126,2.126V14.881a2.128,2.128,0,0,0,2.126,2.126h9.111a2.128,2.128,0,0,0,2.126-2.126V2.126A2.128,2.128,0,0,0,288.569,0Zm0,0"
                  transform="translate(-261.54 0)"
                  fill="#747474"
                />
              </svg>
              <div className="sidebar_menuTitle">Dashboard</div>
            </NavLink>
          </div>
          <div className="col-6">
            <NavLink
              className="list_itemMenu"
              to={
                adminStatus()
                  ? "/admin-property/mgmt/bookings"
                  : `${url}/bookings`
              }
              activeClassName={"dash_selected"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="29.064"
                height="29.015"
                viewBox="0 0 29.064 29.015"
              >
                <g id="booking" transform="translate(-32 -40.737)">
                  <path
                    id="Path_289"
                    data-name="Path 289"
                    d="M64,344v8.983h3.7v-8.869l-.845.37a.528.528,0,0,1-.74-.484Zm2.114,2.642H65.057v-1.057h1.057Z"
                    transform="translate(-29.886 -283.231)"
                    fill="#747474"
                  />
                  <path
                    id="Path_290"
                    data-name="Path 290"
                    d="M376,136h2.114v2.114H376Z"
                    transform="translate(-321.277 -88.97)"
                    fill="#747474"
                  />
                  <path
                    id="Path_291"
                    data-name="Path 291"
                    d="M323.85,411.013a1.888,1.888,0,0,1-.679-1.428c0-.548-.221-1.585-1.057-1.585-.366,0-1.057.331-1.057,1.585a1.888,1.888,0,0,1-.679,1.428c-.262.264-.378.393-.378.7a1.139,1.139,0,0,0,1.057,1.042h2.114a1.139,1.139,0,0,0,1.057-1.042C324.228,411.407,324.112,411.277,323.85,411.013Z"
                    transform="translate(-268.978 -343.004)"
                    fill="#747474"
                  />
                  <path
                    id="Path_292"
                    data-name="Path 292"
                    d="M64,191.4h2.532l1.167-.511V184H64Z"
                    transform="translate(-29.886 -133.8)"
                    fill="#747474"
                  />
                  <path
                    id="Path_293"
                    data-name="Path 293"
                    d="M176,384h2.114v6.341H176Z"
                    transform="translate(-134.488 -320.589)"
                    fill="#747474"
                  />
                  <path
                    id="Path_294"
                    data-name="Path 294"
                    d="M256,400h2.114v1.585H256Z"
                    transform="translate(-209.204 -335.532)"
                    fill="#747474"
                  />
                  <path
                    id="Path_295"
                    data-name="Path 295"
                    d="M148.154,305.667a3.167,3.167,0,0,1,.528-1.8v-4.359l-6.341-2.774L136,299.506v9.331h1.585v-6.87a.528.528,0,0,1,.528-.528h3.171a.528.528,0,0,1,.528.528v6.87h5.576a1.974,1.974,0,0,1-.292-1.042,1.907,1.907,0,0,1,.685-1.445C148.04,306.091,148.154,305.963,148.154,305.667Zm-7.926-5.284h-1.057v-1.057h1.057Zm6.87,5.284a.528.528,0,0,1-.528.528H143.4a.528.528,0,0,1-.528-.528v-2.642a.528.528,0,0,1,.528-.528h3.171a.528.528,0,0,1,.528.528Z"
                    transform="translate(-97.13 -239.085)"
                    fill="#747474"
                  />
                  <path
                    id="Path_296"
                    data-name="Path 296"
                    d="M280,136h2.114v2.114H280Z"
                    transform="translate(-231.619 -88.97)"
                    fill="#747474"
                  />
                  <path
                    id="Path_297"
                    data-name="Path 297"
                    d="M253.739,121.365V96H240v9.695l8.138,3.56a.528.528,0,0,1,.317.484v2.642a.528.528,0,0,1-.74.484l-.845-.37v3.127a1.957,1.957,0,0,1,.528-.071c1.388,0,2.114,1.329,2.114,2.642,0,.3.114.424.372.684a1.908,1.908,0,0,1,.685,1.445,1.975,1.975,0,0,1-.292,1.042Zm-5.813-23.251a.528.528,0,0,1,.528-.528h3.171a.528.528,0,0,1,.529.528v3.171a.528.528,0,0,1-.529.528h-3.171a.528.528,0,0,1-.528-.528Zm-2.114,8.983h-1.057v-2.642h-2.114v1.057h-1.057v-1.585a.528.528,0,0,1,.528-.528h3.171a.528.528,0,0,1,.528.528Zm0-5.813a.528.528,0,0,1-.528.528h-3.171a.528.528,0,0,1-.528-.528V98.114a.528.528,0,0,1,.528-.528h3.171a.528.528,0,0,1,.528.528Zm2.642,6.341a.528.528,0,0,1-.528-.528v-3.171a.528.528,0,0,1,.528-.528h3.171a.528.528,0,0,1,.529.528V107.1a.528.528,0,0,1-.529.528Zm1.057,5.813v-1.057H251.1v-2.114h-1.585v-1.057h2.114a.528.528,0,0,1,.529.528v3.171a.528.528,0,0,1-.529.528Z"
                    transform="translate(-194.261 -51.613)"
                    fill="#747474"
                  />
                  <path
                    id="Path_298"
                    data-name="Path 298"
                    d="M64,121.057h4.537L67.48,120H64Z"
                    transform="translate(-29.886 -74.027)"
                    fill="#747474"
                  />
                  <path
                    id="Path_299"
                    data-name="Path 299"
                    d="M376,224h2.114v2.114H376Z"
                    transform="translate(-321.277 -171.158)"
                    fill="#747474"
                  />
                  <path
                    id="Path_300"
                    data-name="Path 300"
                    d="M232.91,40.737,216,42.229v1.1h16.91Z"
                    transform="translate(-171.846)"
                    fill="#747474"
                  />
                  <path
                    id="Path_301"
                    data-name="Path 301"
                    d="M112,261.688l.528-.231v-.018h.04l7.146-3.126a.528.528,0,0,1,.424,0l7.146,3.126h.04v.018l.528.231V260.2l-7.926-3.468L112,260.2Z"
                    transform="translate(-74.716 -201.728)"
                    fill="#747474"
                  />
                  <path
                    id="Path_302"
                    data-name="Path 302"
                    d="M136,184v6.425l5.813-2.543V184Z"
                    transform="translate(-97.13 -133.8)"
                    fill="#747474"
                  />
                  <path
                    id="Path_303"
                    data-name="Path 303"
                    d="M36.227,162.569H33.585a.528.528,0,0,1-.528-.528v-8.455a.528.528,0,0,1,.528-.528h11.1V152H32v11.625h4.227Z"
                    transform="translate(0 -103.914)"
                    fill="#747474"
                  />
                </g>
              </svg>

              <div className="sidebar_menuTitle">Reservation</div>
            </NavLink>
          </div>
          <div className="col-6">
            <NavLink
              className="list_itemMenu"
              to={
                adminStatus()
                  ? "/admin-property/mgmt/room-list"
                  : `${url}/room-list`
              }
              activeClassName={"dash_selected"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36.024"
                height="29.101"
                viewBox="0 0 36.024 29.101"
              >
                <g id="room" transform="translate(0 -37.528)">
                  <path
                    id="Path_304"
                    data-name="Path 304"
                    d="M36.664,56.969,32.7,50.691V39.142l-1.614-1.614H6.364L4.749,39.142V50.691L.784,56.969ZM29.47,40.756v8.058a43.28,43.28,0,0,0-10.746-1.2,43.28,43.28,0,0,0-10.746,1.2V40.756Z"
                    transform="translate(-0.712 0)"
                    fill="#747474"
                  />
                  <path
                    id="Path_305"
                    data-name="Path 305"
                    d="M0,269.831v3.228H3.761V277.5H6.99v-4.446H29.035V277.5h3.228v-4.446h3.761v-3.228Z"
                    transform="translate(0 -210.876)"
                    fill="#747474"
                  />
                  <path
                    id="Path_306"
                    data-name="Path 306"
                    d="M109.853,90.25V88.369c0-1.116-1.62-2.021-3.618-2.021s-3.618.905-3.618,2.021v2.823a30.372,30.372,0,0,1,3.6-.676C107.538,90.391,109.853,90.25,109.853,90.25Z"
                    transform="translate(-93.151 -44.317)"
                    fill="#747474"
                  />
                  <path
                    id="Path_307"
                    data-name="Path 307"
                    d="M216.718,91.192V88.369c0-1.116-1.62-2.021-3.618-2.021s-3.619.905-3.619,2.021V90.25s2.315.141,3.636.266A30.369,30.369,0,0,1,216.718,91.192Z"
                    transform="translate(-190.159 -44.317)"
                    fill="#747474"
                  />
                </g>
              </svg>

              <div className="sidebar_menuTitle">
                Room {!adminStatus() ? "Management" : ""}
              </div>
            </NavLink>
          </div>
          <div className="col-6">
            <NavLink
              className="list_itemMenu"
              to={
                adminStatus()
                  ? "/admin-property/mgmt/guest-walkin"
                  : `${url}/guest-walkin`
              }
              activeClassName={"dash_selected"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="29.064"
                height="29.015"
                viewBox="0 0 29.064 29.015"
              >
                <g id="booking" transform="translate(-32 -40.737)">
                  <path
                    id="Path_289"
                    data-name="Path 289"
                    d="M64,344v8.983h3.7v-8.869l-.845.37a.528.528,0,0,1-.74-.484Zm2.114,2.642H65.057v-1.057h1.057Z"
                    transform="translate(-29.886 -283.231)"
                    fill="#747474"
                  />
                  <path
                    id="Path_290"
                    data-name="Path 290"
                    d="M376,136h2.114v2.114H376Z"
                    transform="translate(-321.277 -88.97)"
                    fill="#747474"
                  />
                  <path
                    id="Path_291"
                    data-name="Path 291"
                    d="M323.85,411.013a1.888,1.888,0,0,1-.679-1.428c0-.548-.221-1.585-1.057-1.585-.366,0-1.057.331-1.057,1.585a1.888,1.888,0,0,1-.679,1.428c-.262.264-.378.393-.378.7a1.139,1.139,0,0,0,1.057,1.042h2.114a1.139,1.139,0,0,0,1.057-1.042C324.228,411.407,324.112,411.277,323.85,411.013Z"
                    transform="translate(-268.978 -343.004)"
                    fill="#747474"
                  />
                  <path
                    id="Path_292"
                    data-name="Path 292"
                    d="M64,191.4h2.532l1.167-.511V184H64Z"
                    transform="translate(-29.886 -133.8)"
                    fill="#747474"
                  />
                  <path
                    id="Path_293"
                    data-name="Path 293"
                    d="M176,384h2.114v6.341H176Z"
                    transform="translate(-134.488 -320.589)"
                    fill="#747474"
                  />
                  <path
                    id="Path_294"
                    data-name="Path 294"
                    d="M256,400h2.114v1.585H256Z"
                    transform="translate(-209.204 -335.532)"
                    fill="#747474"
                  />
                  <path
                    id="Path_295"
                    data-name="Path 295"
                    d="M148.154,305.667a3.167,3.167,0,0,1,.528-1.8v-4.359l-6.341-2.774L136,299.506v9.331h1.585v-6.87a.528.528,0,0,1,.528-.528h3.171a.528.528,0,0,1,.528.528v6.87h5.576a1.974,1.974,0,0,1-.292-1.042,1.907,1.907,0,0,1,.685-1.445C148.04,306.091,148.154,305.963,148.154,305.667Zm-7.926-5.284h-1.057v-1.057h1.057Zm6.87,5.284a.528.528,0,0,1-.528.528H143.4a.528.528,0,0,1-.528-.528v-2.642a.528.528,0,0,1,.528-.528h3.171a.528.528,0,0,1,.528.528Z"
                    transform="translate(-97.13 -239.085)"
                    fill="#747474"
                  />
                  <path
                    id="Path_296"
                    data-name="Path 296"
                    d="M280,136h2.114v2.114H280Z"
                    transform="translate(-231.619 -88.97)"
                    fill="#747474"
                  />
                  <path
                    id="Path_297"
                    data-name="Path 297"
                    d="M253.739,121.365V96H240v9.695l8.138,3.56a.528.528,0,0,1,.317.484v2.642a.528.528,0,0,1-.74.484l-.845-.37v3.127a1.957,1.957,0,0,1,.528-.071c1.388,0,2.114,1.329,2.114,2.642,0,.3.114.424.372.684a1.908,1.908,0,0,1,.685,1.445,1.975,1.975,0,0,1-.292,1.042Zm-5.813-23.251a.528.528,0,0,1,.528-.528h3.171a.528.528,0,0,1,.529.528v3.171a.528.528,0,0,1-.529.528h-3.171a.528.528,0,0,1-.528-.528Zm-2.114,8.983h-1.057v-2.642h-2.114v1.057h-1.057v-1.585a.528.528,0,0,1,.528-.528h3.171a.528.528,0,0,1,.528.528Zm0-5.813a.528.528,0,0,1-.528.528h-3.171a.528.528,0,0,1-.528-.528V98.114a.528.528,0,0,1,.528-.528h3.171a.528.528,0,0,1,.528.528Zm2.642,6.341a.528.528,0,0,1-.528-.528v-3.171a.528.528,0,0,1,.528-.528h3.171a.528.528,0,0,1,.529.528V107.1a.528.528,0,0,1-.529.528Zm1.057,5.813v-1.057H251.1v-2.114h-1.585v-1.057h2.114a.528.528,0,0,1,.529.528v3.171a.528.528,0,0,1-.529.528Z"
                    transform="translate(-194.261 -51.613)"
                    fill="#747474"
                  />
                  <path
                    id="Path_298"
                    data-name="Path 298"
                    d="M64,121.057h4.537L67.48,120H64Z"
                    transform="translate(-29.886 -74.027)"
                    fill="#747474"
                  />
                  <path
                    id="Path_299"
                    data-name="Path 299"
                    d="M376,224h2.114v2.114H376Z"
                    transform="translate(-321.277 -171.158)"
                    fill="#747474"
                  />
                  <path
                    id="Path_300"
                    data-name="Path 300"
                    d="M232.91,40.737,216,42.229v1.1h16.91Z"
                    transform="translate(-171.846)"
                    fill="#747474"
                  />
                  <path
                    id="Path_301"
                    data-name="Path 301"
                    d="M112,261.688l.528-.231v-.018h.04l7.146-3.126a.528.528,0,0,1,.424,0l7.146,3.126h.04v.018l.528.231V260.2l-7.926-3.468L112,260.2Z"
                    transform="translate(-74.716 -201.728)"
                    fill="#747474"
                  />
                  <path
                    id="Path_302"
                    data-name="Path 302"
                    d="M136,184v6.425l5.813-2.543V184Z"
                    transform="translate(-97.13 -133.8)"
                    fill="#747474"
                  />
                  <path
                    id="Path_303"
                    data-name="Path 303"
                    d="M36.227,162.569H33.585a.528.528,0,0,1-.528-.528v-8.455a.528.528,0,0,1,.528-.528h11.1V152H32v11.625h4.227Z"
                    transform="translate(0 -103.914)"
                    fill="#747474"
                  />
                </g>
              </svg>

              <div className="sidebar_menuTitle">Guest Walk-in</div>
            </NavLink>
          </div>
          <div className="col-6">
            <NavLink
              className="list_itemMenu"
              to={
                adminStatus()
                  ? "/admin-property/mgmt/propmgmt"
                  : `${url}/property-mgmt`
              }
              activeClassName={"dash_selected"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="29.064"
                height="29.015"
                viewBox="0 0 29.064 29.015"
              >
                <g id="booking" transform="translate(-32 -40.737)">
                  <path
                    id="Path_289"
                    data-name="Path 289"
                    d="M64,344v8.983h3.7v-8.869l-.845.37a.528.528,0,0,1-.74-.484Zm2.114,2.642H65.057v-1.057h1.057Z"
                    transform="translate(-29.886 -283.231)"
                    fill="#747474"
                  />
                  <path
                    id="Path_290"
                    data-name="Path 290"
                    d="M376,136h2.114v2.114H376Z"
                    transform="translate(-321.277 -88.97)"
                    fill="#747474"
                  />
                  <path
                    id="Path_291"
                    data-name="Path 291"
                    d="M323.85,411.013a1.888,1.888,0,0,1-.679-1.428c0-.548-.221-1.585-1.057-1.585-.366,0-1.057.331-1.057,1.585a1.888,1.888,0,0,1-.679,1.428c-.262.264-.378.393-.378.7a1.139,1.139,0,0,0,1.057,1.042h2.114a1.139,1.139,0,0,0,1.057-1.042C324.228,411.407,324.112,411.277,323.85,411.013Z"
                    transform="translate(-268.978 -343.004)"
                    fill="#747474"
                  />
                  <path
                    id="Path_292"
                    data-name="Path 292"
                    d="M64,191.4h2.532l1.167-.511V184H64Z"
                    transform="translate(-29.886 -133.8)"
                    fill="#747474"
                  />
                  <path
                    id="Path_293"
                    data-name="Path 293"
                    d="M176,384h2.114v6.341H176Z"
                    transform="translate(-134.488 -320.589)"
                    fill="#747474"
                  />
                  <path
                    id="Path_294"
                    data-name="Path 294"
                    d="M256,400h2.114v1.585H256Z"
                    transform="translate(-209.204 -335.532)"
                    fill="#747474"
                  />
                  <path
                    id="Path_295"
                    data-name="Path 295"
                    d="M148.154,305.667a3.167,3.167,0,0,1,.528-1.8v-4.359l-6.341-2.774L136,299.506v9.331h1.585v-6.87a.528.528,0,0,1,.528-.528h3.171a.528.528,0,0,1,.528.528v6.87h5.576a1.974,1.974,0,0,1-.292-1.042,1.907,1.907,0,0,1,.685-1.445C148.04,306.091,148.154,305.963,148.154,305.667Zm-7.926-5.284h-1.057v-1.057h1.057Zm6.87,5.284a.528.528,0,0,1-.528.528H143.4a.528.528,0,0,1-.528-.528v-2.642a.528.528,0,0,1,.528-.528h3.171a.528.528,0,0,1,.528.528Z"
                    transform="translate(-97.13 -239.085)"
                    fill="#747474"
                  />
                  <path
                    id="Path_296"
                    data-name="Path 296"
                    d="M280,136h2.114v2.114H280Z"
                    transform="translate(-231.619 -88.97)"
                    fill="#747474"
                  />
                  <path
                    id="Path_297"
                    data-name="Path 297"
                    d="M253.739,121.365V96H240v9.695l8.138,3.56a.528.528,0,0,1,.317.484v2.642a.528.528,0,0,1-.74.484l-.845-.37v3.127a1.957,1.957,0,0,1,.528-.071c1.388,0,2.114,1.329,2.114,2.642,0,.3.114.424.372.684a1.908,1.908,0,0,1,.685,1.445,1.975,1.975,0,0,1-.292,1.042Zm-5.813-23.251a.528.528,0,0,1,.528-.528h3.171a.528.528,0,0,1,.529.528v3.171a.528.528,0,0,1-.529.528h-3.171a.528.528,0,0,1-.528-.528Zm-2.114,8.983h-1.057v-2.642h-2.114v1.057h-1.057v-1.585a.528.528,0,0,1,.528-.528h3.171a.528.528,0,0,1,.528.528Zm0-5.813a.528.528,0,0,1-.528.528h-3.171a.528.528,0,0,1-.528-.528V98.114a.528.528,0,0,1,.528-.528h3.171a.528.528,0,0,1,.528.528Zm2.642,6.341a.528.528,0,0,1-.528-.528v-3.171a.528.528,0,0,1,.528-.528h3.171a.528.528,0,0,1,.529.528V107.1a.528.528,0,0,1-.529.528Zm1.057,5.813v-1.057H251.1v-2.114h-1.585v-1.057h2.114a.528.528,0,0,1,.529.528v3.171a.528.528,0,0,1-.529.528Z"
                    transform="translate(-194.261 -51.613)"
                    fill="#747474"
                  />
                  <path
                    id="Path_298"
                    data-name="Path 298"
                    d="M64,121.057h4.537L67.48,120H64Z"
                    transform="translate(-29.886 -74.027)"
                    fill="#747474"
                  />
                  <path
                    id="Path_299"
                    data-name="Path 299"
                    d="M376,224h2.114v2.114H376Z"
                    transform="translate(-321.277 -171.158)"
                    fill="#747474"
                  />
                  <path
                    id="Path_300"
                    data-name="Path 300"
                    d="M232.91,40.737,216,42.229v1.1h16.91Z"
                    transform="translate(-171.846)"
                    fill="#747474"
                  />
                  <path
                    id="Path_301"
                    data-name="Path 301"
                    d="M112,261.688l.528-.231v-.018h.04l7.146-3.126a.528.528,0,0,1,.424,0l7.146,3.126h.04v.018l.528.231V260.2l-7.926-3.468L112,260.2Z"
                    transform="translate(-74.716 -201.728)"
                    fill="#747474"
                  />
                  <path
                    id="Path_302"
                    data-name="Path 302"
                    d="M136,184v6.425l5.813-2.543V184Z"
                    transform="translate(-97.13 -133.8)"
                    fill="#747474"
                  />
                  <path
                    id="Path_303"
                    data-name="Path 303"
                    d="M36.227,162.569H33.585a.528.528,0,0,1-.528-.528v-8.455a.528.528,0,0,1,.528-.528h11.1V152H32v11.625h4.227Z"
                    transform="translate(0 -103.914)"
                    fill="#747474"
                  />
                </g>
              </svg>
              <div className="sidebar_menuTitle">
                Property {!adminStatus() ? "Management" : ""}
              </div>
            </NavLink>
          </div>
          <div className="col-6">
            <NavLink
              className="list_itemMenu"
              to={
                adminStatus()
                  ? "/admin-property/mgmt/staff-management"
                  : `${url}/staff-mgmt`
              }
              activeClassName={"dash_selected"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24.679"
                height="28.668"
                viewBox="0 0 24.679 28.668"
              >
                <g id="staff" transform="translate(-7.035 -3)">
                  <path
                    id="Path_311"
                    data-name="Path 311"
                    d="M35.687,53.41a2.5,2.5,0,0,0,.549-.374l-1.085-.95.382,1.4Z"
                    transform="translate(-14.219 -24.824)"
                    fill="#747474"
                  />
                  <path
                    id="Path_312"
                    data-name="Path 312"
                    d="M36.2,47.286V44.823l-.442-.181a2.482,2.482,0,0,1-.515-.293l-1.78,1.781,2.508,2.2A2.474,2.474,0,0,0,36.2,47.286Z"
                    transform="translate(-13.365 -20.911)"
                    fill="#747474"
                  />
                  <path
                    id="Path_313"
                    data-name="Path 313"
                    d="M25.956,44.349a2.46,2.46,0,0,1-.515.293L25,44.823v2.463a2.466,2.466,0,0,0,.243,1.065l2.5-2.219Z"
                    transform="translate(-9.085 -20.911)"
                    fill="#747474"
                  />
                  <path
                    id="Path_314"
                    data-name="Path 314"
                    d="M27.382,53.522l.373-1.366L26.7,53.09a2.485,2.485,0,0,0,.524.355Z"
                    transform="translate(-9.947 -24.859)"
                    fill="#747474"
                  />
                  <path
                    id="Path_315"
                    data-name="Path 315"
                    d="M28.863,48.185A3.441,3.441,0,0,1,26.95,51.28l-2.536,1.268L21.878,51.28a3.441,3.441,0,0,1-1.912-3.095V46.126L17,47.339v6.138H31.828V47.339l-2.966-1.213Z"
                    transform="translate(-5.04 -21.81)"
                    fill="#747474"
                  />
                  <path
                    id="Path_316"
                    data-name="Path 316"
                    d="M31.958,41.822a2.458,2.458,0,0,1-.335-1.026,9.263,9.263,0,0,1-1.344.57l-.157.052-.156-.052a9.186,9.186,0,0,1-1.344-.57,2.458,2.458,0,0,1-.335,1.026l1.835,1.836Z"
                    transform="translate(-10.748 -19.114)"
                    fill="#747474"
                  />
                  <path
                    id="Path_317"
                    data-name="Path 317"
                    d="M7.035,55.146h3.937V49.425A6.836,6.836,0,0,0,7.035,55.146Z"
                    transform="translate(0 -23.478)"
                    fill="#747474"
                  />
                  <path
                    id="Path_318"
                    data-name="Path 318"
                    d="M18.483,28.055H18.6a9.14,9.14,0,0,1-.6-2.879,1.478,1.478,0,0,0,.478,2.879Z"
                    transform="translate(-5.04 -11.215)"
                    fill="#747474"
                  />
                  <path
                    id="Path_319"
                    data-name="Path 319"
                    d="M17.989,14.5A7.968,7.968,0,0,1,17,13.536V18.72a2.448,2.448,0,0,1,.989-.457Z"
                    transform="translate(-5.04 -5.328)"
                    fill="#747474"
                  />
                  <path
                    id="Path_320"
                    data-name="Path 320"
                    d="M24.88,3h-.073a6.067,6.067,0,0,0-2.406.491l-.854.366a7.7,7.7,0,0,1-3.049.626,7.982,7.982,0,0,1-3-.569l-.419-.168a6.93,6.93,0,0,0,6.88,6.173h4.448a3.463,3.463,0,0,1,3.428,3.012,2.447,2.447,0,0,1,1.021.46V8.975A5.976,5.976,0,0,0,24.88,3Zm3.508,5.149a5.455,5.455,0,0,0-4.944-3.172V3.989a6.447,6.447,0,0,1,5.843,3.748Z"
                    transform="translate(-4.069 0)"
                    fill="#747474"
                  />
                  <path
                    id="Path_321"
                    data-name="Path 321"
                    d="M44.356,25.174a9.163,9.163,0,0,1-.6,2.88h.119a1.479,1.479,0,0,0,.478-2.88Z"
                    transform="translate(-18.572 -11.214)"
                    fill="#747474"
                  />
                  <path
                    id="Path_322"
                    data-name="Path 322"
                    d="M49,49.426v5.721h3.937A6.835,6.835,0,0,0,49,49.426Z"
                    transform="translate(-21.223 -23.479)"
                    fill="#747474"
                  />
                  <path
                    id="Path_323"
                    data-name="Path 323"
                    d="M31.874,20.386A2.474,2.474,0,0,0,29.4,17.914H24.954A7.86,7.86,0,0,1,21,16.853V20.56a8.168,8.168,0,0,0,5.437,7.706,8.169,8.169,0,0,0,5.437-7.706Zm-8.4,0a.494.494,0,1,1,.494-.494A.494.494,0,0,1,23.471,20.386Zm2.966,5.931A1.979,1.979,0,0,1,24.46,24.34h.989a.989.989,0,1,0,1.977,0h.989A1.979,1.979,0,0,1,26.437,26.317ZM29.4,20.386a.494.494,0,1,1,.494-.494A.494.494,0,0,1,29.4,20.386Z"
                    transform="translate(-7.062 -7.006)"
                    fill="#747474"
                  />
                  <path
                    id="Path_324"
                    data-name="Path 324"
                    d="M31.976,52.545l-.826-3.029-.209-.183-.217.193L29.9,52.545l1.038.519Z"
                    transform="translate(-11.563 -23.432)"
                    fill="#747474"
                  />
                </g>
              </svg>
              <div className="sidebar_menuTitle">
                Staff {!adminStatus() ? "Management" : ""}
              </div>
            </NavLink>
          </div>

          <div className="col-6">
            <NavLink
              className="list_itemMenu"
              to={adminStatus()?"/admin-property/mgmt/food":  `${url}/food-mgmt`}
              activeClassName={"dash_selected"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="29.031"
                height="29.049"
                viewBox="0 0 29.031 29.049"
              >
                <g id="kitchen" transform="translate(-0.153)">
                  <g
                    id="Group_560"
                    data-name="Group 560"
                    transform="translate(1.769)"
                  >
                    <g id="Group_559" data-name="Group 559">
                      <path
                        id="Path_308"
                        data-name="Path 308"
                        d="M55.3,24.7,43.914,13.308,30.606,0h-1.04l-.212.54a9.541,9.541,0,0,0-.692,4.213,5.95,5.95,0,0,0,1.668,3.8L40.718,18.942l1.37-1.37,9.6,10.74A2.554,2.554,0,0,0,55.3,24.7Z"
                        transform="translate(-28.636)"
                        fill="#747474"
                      />
                    </g>
                  </g>
                  <g
                    id="Group_562"
                    data-name="Group 562"
                    transform="translate(0.153 16.536)"
                  >
                    <g
                      id="Group_561"
                      data-name="Group 561"
                      transform="translate(0)"
                    >
                      <path
                        id="Path_309"
                        data-name="Path 309"
                        d="M9.037,291.442.9,299.579a2.554,2.554,0,0,0,3.612,3.612l8.137-8.137Z"
                        transform="translate(-0.153 -291.442)"
                        fill="#747474"
                      />
                    </g>
                  </g>
                  <g
                    id="Group_564"
                    data-name="Group 564"
                    transform="translate(15.71 0.02)"
                  >
                    <g id="Group_563" data-name="Group 563">
                      <path
                        id="Path_310"
                        data-name="Path 310"
                        d="M286.6,5.177l-4.616,4.616-1.2-1.2L285.4,3.973l-1.2-1.2L279.58,7.385l-1.2-1.2,4.616-4.616-1.2-1.2-6.02,6.02a4.25,4.25,0,0,0-1.238,2.754,2.452,2.452,0,0,1-.174.769l3.911,3.911a2.451,2.451,0,0,1,.769-.174,4.249,4.249,0,0,0,2.754-1.238l6.02-6.02Z"
                        transform="translate(-274.354 -0.361)"
                        fill="#747474"
                      />
                    </g>
                  </g>
                </g>
              </svg>

              <div className="sidebar_menuTitle">
                Food {!adminStatus() ? "Management" : ""}
              </div>
            </NavLink>
          </div>

          <div className="col-6">
            <NavLink
              className="list_itemMenu"
              to={
                adminStatus()
                  ? "/admin-property/mgmt/rage-management"
                  : `${url}/rate-mgmt`
              }
              activeClassName={"dash_selected"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24.679"
                height="28.668"
                viewBox="0 0 24.679 28.668"
              >
                <g id="staff" transform="translate(-7.035 -3)">
                  <path
                    id="Path_311"
                    data-name="Path 311"
                    d="M35.687,53.41a2.5,2.5,0,0,0,.549-.374l-1.085-.95.382,1.4Z"
                    transform="translate(-14.219 -24.824)"
                    fill="#747474"
                  />
                  <path
                    id="Path_312"
                    data-name="Path 312"
                    d="M36.2,47.286V44.823l-.442-.181a2.482,2.482,0,0,1-.515-.293l-1.78,1.781,2.508,2.2A2.474,2.474,0,0,0,36.2,47.286Z"
                    transform="translate(-13.365 -20.911)"
                    fill="#747474"
                  />
                  <path
                    id="Path_313"
                    data-name="Path 313"
                    d="M25.956,44.349a2.46,2.46,0,0,1-.515.293L25,44.823v2.463a2.466,2.466,0,0,0,.243,1.065l2.5-2.219Z"
                    transform="translate(-9.085 -20.911)"
                    fill="#747474"
                  />
                  <path
                    id="Path_314"
                    data-name="Path 314"
                    d="M27.382,53.522l.373-1.366L26.7,53.09a2.485,2.485,0,0,0,.524.355Z"
                    transform="translate(-9.947 -24.859)"
                    fill="#747474"
                  />
                  <path
                    id="Path_315"
                    data-name="Path 315"
                    d="M28.863,48.185A3.441,3.441,0,0,1,26.95,51.28l-2.536,1.268L21.878,51.28a3.441,3.441,0,0,1-1.912-3.095V46.126L17,47.339v6.138H31.828V47.339l-2.966-1.213Z"
                    transform="translate(-5.04 -21.81)"
                    fill="#747474"
                  />
                  <path
                    id="Path_316"
                    data-name="Path 316"
                    d="M31.958,41.822a2.458,2.458,0,0,1-.335-1.026,9.263,9.263,0,0,1-1.344.57l-.157.052-.156-.052a9.186,9.186,0,0,1-1.344-.57,2.458,2.458,0,0,1-.335,1.026l1.835,1.836Z"
                    transform="translate(-10.748 -19.114)"
                    fill="#747474"
                  />
                  <path
                    id="Path_317"
                    data-name="Path 317"
                    d="M7.035,55.146h3.937V49.425A6.836,6.836,0,0,0,7.035,55.146Z"
                    transform="translate(0 -23.478)"
                    fill="#747474"
                  />
                  <path
                    id="Path_318"
                    data-name="Path 318"
                    d="M18.483,28.055H18.6a9.14,9.14,0,0,1-.6-2.879,1.478,1.478,0,0,0,.478,2.879Z"
                    transform="translate(-5.04 -11.215)"
                    fill="#747474"
                  />
                  <path
                    id="Path_319"
                    data-name="Path 319"
                    d="M17.989,14.5A7.968,7.968,0,0,1,17,13.536V18.72a2.448,2.448,0,0,1,.989-.457Z"
                    transform="translate(-5.04 -5.328)"
                    fill="#747474"
                  />
                  <path
                    id="Path_320"
                    data-name="Path 320"
                    d="M24.88,3h-.073a6.067,6.067,0,0,0-2.406.491l-.854.366a7.7,7.7,0,0,1-3.049.626,7.982,7.982,0,0,1-3-.569l-.419-.168a6.93,6.93,0,0,0,6.88,6.173h4.448a3.463,3.463,0,0,1,3.428,3.012,2.447,2.447,0,0,1,1.021.46V8.975A5.976,5.976,0,0,0,24.88,3Zm3.508,5.149a5.455,5.455,0,0,0-4.944-3.172V3.989a6.447,6.447,0,0,1,5.843,3.748Z"
                    transform="translate(-4.069 0)"
                    fill="#747474"
                  />
                  <path
                    id="Path_321"
                    data-name="Path 321"
                    d="M44.356,25.174a9.163,9.163,0,0,1-.6,2.88h.119a1.479,1.479,0,0,0,.478-2.88Z"
                    transform="translate(-18.572 -11.214)"
                    fill="#747474"
                  />
                  <path
                    id="Path_322"
                    data-name="Path 322"
                    d="M49,49.426v5.721h3.937A6.835,6.835,0,0,0,49,49.426Z"
                    transform="translate(-21.223 -23.479)"
                    fill="#747474"
                  />
                  <path
                    id="Path_323"
                    data-name="Path 323"
                    d="M31.874,20.386A2.474,2.474,0,0,0,29.4,17.914H24.954A7.86,7.86,0,0,1,21,16.853V20.56a8.168,8.168,0,0,0,5.437,7.706,8.169,8.169,0,0,0,5.437-7.706Zm-8.4,0a.494.494,0,1,1,.494-.494A.494.494,0,0,1,23.471,20.386Zm2.966,5.931A1.979,1.979,0,0,1,24.46,24.34h.989a.989.989,0,1,0,1.977,0h.989A1.979,1.979,0,0,1,26.437,26.317ZM29.4,20.386a.494.494,0,1,1,.494-.494A.494.494,0,0,1,29.4,20.386Z"
                    transform="translate(-7.062 -7.006)"
                    fill="#747474"
                  />
                  <path
                    id="Path_324"
                    data-name="Path 324"
                    d="M31.976,52.545l-.826-3.029-.209-.183-.217.193L29.9,52.545l1.038.519Z"
                    transform="translate(-11.563 -23.432)"
                    fill="#747474"
                  />
                </g>
              </svg>
              <div className="sidebar_menuTitle">
                Rate {!adminStatus() ? "Management" : ""}
              </div>
            </NavLink>
          </div>

          <div className="col-6">
            <NavLink
              className="list_itemMenu"
              to={
                adminStatus()
                  ? "/admin-property/mgmt/photos"
                  : `${url}/pictures`
              }
              activeClassName={"dash_selected"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25.277"
                height="25.283"
                viewBox="0 0 25.277 25.283"
              >
                <g
                  id="Icon_ionic-md-photos"
                  data-name="Icon ionic-md-photos"
                  transform="translate(-3.375 -3.375)"
                >
                  <path
                    id="Path_341"
                    data-name="Path 341"
                    d="M24.764,26.669V10.47a2.6,2.6,0,0,0-2.595-2.595H5.97A2.6,2.6,0,0,0,3.375,10.47V26.675A2.6,2.6,0,0,0,5.97,29.27H22.175A2.609,2.609,0,0,0,24.764,26.669ZM10.016,19.541l2.753,3.889L16.822,17.6l5.347,7.778H5.97Z"
                    transform="translate(0 -0.611)"
                    fill="#707070"
                  />
                  <path
                    id="Path_342"
                    data-name="Path 342"
                    d="M26.669,3.375H10.47A2.6,2.6,0,0,0,7.875,5.97v.322H23.752a2.6,2.6,0,0,1,2.595,2.595V24.764h.322a2.6,2.6,0,0,0,2.595-2.595V5.97A2.6,2.6,0,0,0,26.669,3.375Z"
                    transform="translate(-0.611)"
                    fill="#707070"
                  />
                </g>
              </svg>
              <div className="sidebar_menuTitle">Photos</div>
            </NavLink>
          </div>

          <div className="col-6">
            <NavLink
              className="list_itemMenu"
              to={
                adminStatus()
                  ? "/admin-property/mgmt/facilities"
                  : `${url}/facilities`
              }
              activeClassName={"dash_selected"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24.679"
                height="28.668"
                viewBox="0 0 24.679 28.668"
              >
                <g id="staff" transform="translate(-7.035 -3)">
                  <path
                    id="Path_311"
                    data-name="Path 311"
                    d="M35.687,53.41a2.5,2.5,0,0,0,.549-.374l-1.085-.95.382,1.4Z"
                    transform="translate(-14.219 -24.824)"
                    fill="#747474"
                  />
                  <path
                    id="Path_312"
                    data-name="Path 312"
                    d="M36.2,47.286V44.823l-.442-.181a2.482,2.482,0,0,1-.515-.293l-1.78,1.781,2.508,2.2A2.474,2.474,0,0,0,36.2,47.286Z"
                    transform="translate(-13.365 -20.911)"
                    fill="#747474"
                  />
                  <path
                    id="Path_313"
                    data-name="Path 313"
                    d="M25.956,44.349a2.46,2.46,0,0,1-.515.293L25,44.823v2.463a2.466,2.466,0,0,0,.243,1.065l2.5-2.219Z"
                    transform="translate(-9.085 -20.911)"
                    fill="#747474"
                  />
                  <path
                    id="Path_314"
                    data-name="Path 314"
                    d="M27.382,53.522l.373-1.366L26.7,53.09a2.485,2.485,0,0,0,.524.355Z"
                    transform="translate(-9.947 -24.859)"
                    fill="#747474"
                  />
                  <path
                    id="Path_315"
                    data-name="Path 315"
                    d="M28.863,48.185A3.441,3.441,0,0,1,26.95,51.28l-2.536,1.268L21.878,51.28a3.441,3.441,0,0,1-1.912-3.095V46.126L17,47.339v6.138H31.828V47.339l-2.966-1.213Z"
                    transform="translate(-5.04 -21.81)"
                    fill="#747474"
                  />
                  <path
                    id="Path_316"
                    data-name="Path 316"
                    d="M31.958,41.822a2.458,2.458,0,0,1-.335-1.026,9.263,9.263,0,0,1-1.344.57l-.157.052-.156-.052a9.186,9.186,0,0,1-1.344-.57,2.458,2.458,0,0,1-.335,1.026l1.835,1.836Z"
                    transform="translate(-10.748 -19.114)"
                    fill="#747474"
                  />
                  <path
                    id="Path_317"
                    data-name="Path 317"
                    d="M7.035,55.146h3.937V49.425A6.836,6.836,0,0,0,7.035,55.146Z"
                    transform="translate(0 -23.478)"
                    fill="#747474"
                  />
                  <path
                    id="Path_318"
                    data-name="Path 318"
                    d="M18.483,28.055H18.6a9.14,9.14,0,0,1-.6-2.879,1.478,1.478,0,0,0,.478,2.879Z"
                    transform="translate(-5.04 -11.215)"
                    fill="#747474"
                  />
                  <path
                    id="Path_319"
                    data-name="Path 319"
                    d="M17.989,14.5A7.968,7.968,0,0,1,17,13.536V18.72a2.448,2.448,0,0,1,.989-.457Z"
                    transform="translate(-5.04 -5.328)"
                    fill="#747474"
                  />
                  <path
                    id="Path_320"
                    data-name="Path 320"
                    d="M24.88,3h-.073a6.067,6.067,0,0,0-2.406.491l-.854.366a7.7,7.7,0,0,1-3.049.626,7.982,7.982,0,0,1-3-.569l-.419-.168a6.93,6.93,0,0,0,6.88,6.173h4.448a3.463,3.463,0,0,1,3.428,3.012,2.447,2.447,0,0,1,1.021.46V8.975A5.976,5.976,0,0,0,24.88,3Zm3.508,5.149a5.455,5.455,0,0,0-4.944-3.172V3.989a6.447,6.447,0,0,1,5.843,3.748Z"
                    transform="translate(-4.069 0)"
                    fill="#747474"
                  />
                  <path
                    id="Path_321"
                    data-name="Path 321"
                    d="M44.356,25.174a9.163,9.163,0,0,1-.6,2.88h.119a1.479,1.479,0,0,0,.478-2.88Z"
                    transform="translate(-18.572 -11.214)"
                    fill="#747474"
                  />
                  <path
                    id="Path_322"
                    data-name="Path 322"
                    d="M49,49.426v5.721h3.937A6.835,6.835,0,0,0,49,49.426Z"
                    transform="translate(-21.223 -23.479)"
                    fill="#747474"
                  />
                  <path
                    id="Path_323"
                    data-name="Path 323"
                    d="M31.874,20.386A2.474,2.474,0,0,0,29.4,17.914H24.954A7.86,7.86,0,0,1,21,16.853V20.56a8.168,8.168,0,0,0,5.437,7.706,8.169,8.169,0,0,0,5.437-7.706Zm-8.4,0a.494.494,0,1,1,.494-.494A.494.494,0,0,1,23.471,20.386Zm2.966,5.931A1.979,1.979,0,0,1,24.46,24.34h.989a.989.989,0,1,0,1.977,0h.989A1.979,1.979,0,0,1,26.437,26.317ZM29.4,20.386a.494.494,0,1,1,.494-.494A.494.494,0,0,1,29.4,20.386Z"
                    transform="translate(-7.062 -7.006)"
                    fill="#747474"
                  />
                  <path
                    id="Path_324"
                    data-name="Path 324"
                    d="M31.976,52.545l-.826-3.029-.209-.183-.217.193L29.9,52.545l1.038.519Z"
                    transform="translate(-11.563 -23.432)"
                    fill="#747474"
                  />
                </g>
              </svg>
              <div className="sidebar_menuTitle">Amenities & Facilities</div>
            </NavLink>
          </div>
          <div className="col-6">
            <NavLink
              className="list_itemMenu"
              to={
                adminStatus()
                  ? "/admin-property/mgmt/calendar"
                  : `${url}/calendar`
              }
              activeClassName={"dash_selected"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24.679"
                height="28.668"
                viewBox="0 0 24.679 28.668"
              >
                <g id="staff" transform="translate(-7.035 -3)">
                  <path
                    id="Path_311"
                    data-name="Path 311"
                    d="M35.687,53.41a2.5,2.5,0,0,0,.549-.374l-1.085-.95.382,1.4Z"
                    transform="translate(-14.219 -24.824)"
                    fill="#747474"
                  />
                  <path
                    id="Path_312"
                    data-name="Path 312"
                    d="M36.2,47.286V44.823l-.442-.181a2.482,2.482,0,0,1-.515-.293l-1.78,1.781,2.508,2.2A2.474,2.474,0,0,0,36.2,47.286Z"
                    transform="translate(-13.365 -20.911)"
                    fill="#747474"
                  />
                  <path
                    id="Path_313"
                    data-name="Path 313"
                    d="M25.956,44.349a2.46,2.46,0,0,1-.515.293L25,44.823v2.463a2.466,2.466,0,0,0,.243,1.065l2.5-2.219Z"
                    transform="translate(-9.085 -20.911)"
                    fill="#747474"
                  />
                  <path
                    id="Path_314"
                    data-name="Path 314"
                    d="M27.382,53.522l.373-1.366L26.7,53.09a2.485,2.485,0,0,0,.524.355Z"
                    transform="translate(-9.947 -24.859)"
                    fill="#747474"
                  />
                  <path
                    id="Path_315"
                    data-name="Path 315"
                    d="M28.863,48.185A3.441,3.441,0,0,1,26.95,51.28l-2.536,1.268L21.878,51.28a3.441,3.441,0,0,1-1.912-3.095V46.126L17,47.339v6.138H31.828V47.339l-2.966-1.213Z"
                    transform="translate(-5.04 -21.81)"
                    fill="#747474"
                  />
                  <path
                    id="Path_316"
                    data-name="Path 316"
                    d="M31.958,41.822a2.458,2.458,0,0,1-.335-1.026,9.263,9.263,0,0,1-1.344.57l-.157.052-.156-.052a9.186,9.186,0,0,1-1.344-.57,2.458,2.458,0,0,1-.335,1.026l1.835,1.836Z"
                    transform="translate(-10.748 -19.114)"
                    fill="#747474"
                  />
                  <path
                    id="Path_317"
                    data-name="Path 317"
                    d="M7.035,55.146h3.937V49.425A6.836,6.836,0,0,0,7.035,55.146Z"
                    transform="translate(0 -23.478)"
                    fill="#747474"
                  />
                  <path
                    id="Path_318"
                    data-name="Path 318"
                    d="M18.483,28.055H18.6a9.14,9.14,0,0,1-.6-2.879,1.478,1.478,0,0,0,.478,2.879Z"
                    transform="translate(-5.04 -11.215)"
                    fill="#747474"
                  />
                  <path
                    id="Path_319"
                    data-name="Path 319"
                    d="M17.989,14.5A7.968,7.968,0,0,1,17,13.536V18.72a2.448,2.448,0,0,1,.989-.457Z"
                    transform="translate(-5.04 -5.328)"
                    fill="#747474"
                  />
                  <path
                    id="Path_320"
                    data-name="Path 320"
                    d="M24.88,3h-.073a6.067,6.067,0,0,0-2.406.491l-.854.366a7.7,7.7,0,0,1-3.049.626,7.982,7.982,0,0,1-3-.569l-.419-.168a6.93,6.93,0,0,0,6.88,6.173h4.448a3.463,3.463,0,0,1,3.428,3.012,2.447,2.447,0,0,1,1.021.46V8.975A5.976,5.976,0,0,0,24.88,3Zm3.508,5.149a5.455,5.455,0,0,0-4.944-3.172V3.989a6.447,6.447,0,0,1,5.843,3.748Z"
                    transform="translate(-4.069 0)"
                    fill="#747474"
                  />
                  <path
                    id="Path_321"
                    data-name="Path 321"
                    d="M44.356,25.174a9.163,9.163,0,0,1-.6,2.88h.119a1.479,1.479,0,0,0,.478-2.88Z"
                    transform="translate(-18.572 -11.214)"
                    fill="#747474"
                  />
                  <path
                    id="Path_322"
                    data-name="Path 322"
                    d="M49,49.426v5.721h3.937A6.835,6.835,0,0,0,49,49.426Z"
                    transform="translate(-21.223 -23.479)"
                    fill="#747474"
                  />
                  <path
                    id="Path_323"
                    data-name="Path 323"
                    d="M31.874,20.386A2.474,2.474,0,0,0,29.4,17.914H24.954A7.86,7.86,0,0,1,21,16.853V20.56a8.168,8.168,0,0,0,5.437,7.706,8.169,8.169,0,0,0,5.437-7.706Zm-8.4,0a.494.494,0,1,1,.494-.494A.494.494,0,0,1,23.471,20.386Zm2.966,5.931A1.979,1.979,0,0,1,24.46,24.34h.989a.989.989,0,1,0,1.977,0h.989A1.979,1.979,0,0,1,26.437,26.317ZM29.4,20.386a.494.494,0,1,1,.494-.494A.494.494,0,0,1,29.4,20.386Z"
                    transform="translate(-7.062 -7.006)"
                    fill="#747474"
                  />
                  <path
                    id="Path_324"
                    data-name="Path 324"
                    d="M31.976,52.545l-.826-3.029-.209-.183-.217.193L29.9,52.545l1.038.519Z"
                    transform="translate(-11.563 -23.432)"
                    fill="#747474"
                  />
                </g>
              </svg>
              <div className="sidebar_menuTitle">Calendar</div>
            </NavLink>
          </div>
          {/*<div className="col-6">*/}
          {/*  <a*/}
          {/*    className="list_itemMenu"*/}
          {/*    href=""*/}
          {/*    onClick={(e) => e.preventDefault()}*/}
          {/*  >*/}
          {/*    <svg*/}
          {/*      xmlns="http://www.w3.org/2000/svg"*/}
          {/*      width="24.679"*/}
          {/*      height="28.668"*/}
          {/*      viewBox="0 0 24.679 28.668"*/}
          {/*    >*/}
          {/*      <g id="staff" transform="translate(-7.035 -3)">*/}
          {/*        <path*/}
          {/*          id="Path_311"*/}
          {/*          data-name="Path 311"*/}
          {/*          d="M35.687,53.41a2.5,2.5,0,0,0,.549-.374l-1.085-.95.382,1.4Z"*/}
          {/*          transform="translate(-14.219 -24.824)"*/}
          {/*          fill="#747474"*/}
          {/*        />*/}
          {/*        <path*/}
          {/*          id="Path_312"*/}
          {/*          data-name="Path 312"*/}
          {/*          d="M36.2,47.286V44.823l-.442-.181a2.482,2.482,0,0,1-.515-.293l-1.78,1.781,2.508,2.2A2.474,2.474,0,0,0,36.2,47.286Z"*/}
          {/*          transform="translate(-13.365 -20.911)"*/}
          {/*          fill="#747474"*/}
          {/*        />*/}
          {/*        <path*/}
          {/*          id="Path_313"*/}
          {/*          data-name="Path 313"*/}
          {/*          d="M25.956,44.349a2.46,2.46,0,0,1-.515.293L25,44.823v2.463a2.466,2.466,0,0,0,.243,1.065l2.5-2.219Z"*/}
          {/*          transform="translate(-9.085 -20.911)"*/}
          {/*          fill="#747474"*/}
          {/*        />*/}
          {/*        <path*/}
          {/*          id="Path_314"*/}
          {/*          data-name="Path 314"*/}
          {/*          d="M27.382,53.522l.373-1.366L26.7,53.09a2.485,2.485,0,0,0,.524.355Z"*/}
          {/*          transform="translate(-9.947 -24.859)"*/}
          {/*          fill="#747474"*/}
          {/*        />*/}
          {/*        <path*/}
          {/*          id="Path_315"*/}
          {/*          data-name="Path 315"*/}
          {/*          d="M28.863,48.185A3.441,3.441,0,0,1,26.95,51.28l-2.536,1.268L21.878,51.28a3.441,3.441,0,0,1-1.912-3.095V46.126L17,47.339v6.138H31.828V47.339l-2.966-1.213Z"*/}
          {/*          transform="translate(-5.04 -21.81)"*/}
          {/*          fill="#747474"*/}
          {/*        />*/}
          {/*        <path*/}
          {/*          id="Path_316"*/}
          {/*          data-name="Path 316"*/}
          {/*          d="M31.958,41.822a2.458,2.458,0,0,1-.335-1.026,9.263,9.263,0,0,1-1.344.57l-.157.052-.156-.052a9.186,9.186,0,0,1-1.344-.57,2.458,2.458,0,0,1-.335,1.026l1.835,1.836Z"*/}
          {/*          transform="translate(-10.748 -19.114)"*/}
          {/*          fill="#747474"*/}
          {/*        />*/}
          {/*        <path*/}
          {/*          id="Path_317"*/}
          {/*          data-name="Path 317"*/}
          {/*          d="M7.035,55.146h3.937V49.425A6.836,6.836,0,0,0,7.035,55.146Z"*/}
          {/*          transform="translate(0 -23.478)"*/}
          {/*          fill="#747474"*/}
          {/*        />*/}
          {/*        <path*/}
          {/*          id="Path_318"*/}
          {/*          data-name="Path 318"*/}
          {/*          d="M18.483,28.055H18.6a9.14,9.14,0,0,1-.6-2.879,1.478,1.478,0,0,0,.478,2.879Z"*/}
          {/*          transform="translate(-5.04 -11.215)"*/}
          {/*          fill="#747474"*/}
          {/*        />*/}
          {/*        <path*/}
          {/*          id="Path_319"*/}
          {/*          data-name="Path 319"*/}
          {/*          d="M17.989,14.5A7.968,7.968,0,0,1,17,13.536V18.72a2.448,2.448,0,0,1,.989-.457Z"*/}
          {/*          transform="translate(-5.04 -5.328)"*/}
          {/*          fill="#747474"*/}
          {/*        />*/}
          {/*        <path*/}
          {/*          id="Path_320"*/}
          {/*          data-name="Path 320"*/}
          {/*          d="M24.88,3h-.073a6.067,6.067,0,0,0-2.406.491l-.854.366a7.7,7.7,0,0,1-3.049.626,7.982,7.982,0,0,1-3-.569l-.419-.168a6.93,6.93,0,0,0,6.88,6.173h4.448a3.463,3.463,0,0,1,3.428,3.012,2.447,2.447,0,0,1,1.021.46V8.975A5.976,5.976,0,0,0,24.88,3Zm3.508,5.149a5.455,5.455,0,0,0-4.944-3.172V3.989a6.447,6.447,0,0,1,5.843,3.748Z"*/}
          {/*          transform="translate(-4.069 0)"*/}
          {/*          fill="#747474"*/}
          {/*        />*/}
          {/*        <path*/}
          {/*          id="Path_321"*/}
          {/*          data-name="Path 321"*/}
          {/*          d="M44.356,25.174a9.163,9.163,0,0,1-.6,2.88h.119a1.479,1.479,0,0,0,.478-2.88Z"*/}
          {/*          transform="translate(-18.572 -11.214)"*/}
          {/*          fill="#747474"*/}
          {/*        />*/}
          {/*        <path*/}
          {/*          id="Path_322"*/}
          {/*          data-name="Path 322"*/}
          {/*          d="M49,49.426v5.721h3.937A6.835,6.835,0,0,0,49,49.426Z"*/}
          {/*          transform="translate(-21.223 -23.479)"*/}
          {/*          fill="#747474"*/}
          {/*        />*/}
          {/*        <path*/}
          {/*          id="Path_323"*/}
          {/*          data-name="Path 323"*/}
          {/*          d="M31.874,20.386A2.474,2.474,0,0,0,29.4,17.914H24.954A7.86,7.86,0,0,1,21,16.853V20.56a8.168,8.168,0,0,0,5.437,7.706,8.169,8.169,0,0,0,5.437-7.706Zm-8.4,0a.494.494,0,1,1,.494-.494A.494.494,0,0,1,23.471,20.386Zm2.966,5.931A1.979,1.979,0,0,1,24.46,24.34h.989a.989.989,0,1,0,1.977,0h.989A1.979,1.979,0,0,1,26.437,26.317ZM29.4,20.386a.494.494,0,1,1,.494-.494A.494.494,0,0,1,29.4,20.386Z"*/}
          {/*          transform="translate(-7.062 -7.006)"*/}
          {/*          fill="#747474"*/}
          {/*        />*/}
          {/*        <path*/}
          {/*          id="Path_324"*/}
          {/*          data-name="Path 324"*/}
          {/*          d="M31.976,52.545l-.826-3.029-.209-.183-.217.193L29.9,52.545l1.038.519Z"*/}
          {/*          transform="translate(-11.563 -23.432)"*/}
          {/*          fill="#747474"*/}
          {/*        />*/}
          {/*      </g>*/}
          {/*    </svg>*/}
          {/*    <div className="sidebar_menuTitle">Promotion</div>*/}
          {/*  </a>*/}
          {/*</div>*/}
          <div className="col-6">
            <NavLink
              className="list_itemMenu"
              to={
                adminStatus()
                  ? "/admin-property/mgmt/finance"
                  : `${url}/finance`
              }
              activeClassName={"dash_selected"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24.679"
                height="28.668"
                viewBox="0 0 24.679 28.668"
              >
                <g id="staff" transform="translate(-7.035 -3)">
                  <path
                    id="Path_311"
                    data-name="Path 311"
                    d="M35.687,53.41a2.5,2.5,0,0,0,.549-.374l-1.085-.95.382,1.4Z"
                    transform="translate(-14.219 -24.824)"
                    fill="#747474"
                  />
                  <path
                    id="Path_312"
                    data-name="Path 312"
                    d="M36.2,47.286V44.823l-.442-.181a2.482,2.482,0,0,1-.515-.293l-1.78,1.781,2.508,2.2A2.474,2.474,0,0,0,36.2,47.286Z"
                    transform="translate(-13.365 -20.911)"
                    fill="#747474"
                  />
                  <path
                    id="Path_313"
                    data-name="Path 313"
                    d="M25.956,44.349a2.46,2.46,0,0,1-.515.293L25,44.823v2.463a2.466,2.466,0,0,0,.243,1.065l2.5-2.219Z"
                    transform="translate(-9.085 -20.911)"
                    fill="#747474"
                  />
                  <path
                    id="Path_314"
                    data-name="Path 314"
                    d="M27.382,53.522l.373-1.366L26.7,53.09a2.485,2.485,0,0,0,.524.355Z"
                    transform="translate(-9.947 -24.859)"
                    fill="#747474"
                  />
                  <path
                    id="Path_315"
                    data-name="Path 315"
                    d="M28.863,48.185A3.441,3.441,0,0,1,26.95,51.28l-2.536,1.268L21.878,51.28a3.441,3.441,0,0,1-1.912-3.095V46.126L17,47.339v6.138H31.828V47.339l-2.966-1.213Z"
                    transform="translate(-5.04 -21.81)"
                    fill="#747474"
                  />
                  <path
                    id="Path_316"
                    data-name="Path 316"
                    d="M31.958,41.822a2.458,2.458,0,0,1-.335-1.026,9.263,9.263,0,0,1-1.344.57l-.157.052-.156-.052a9.186,9.186,0,0,1-1.344-.57,2.458,2.458,0,0,1-.335,1.026l1.835,1.836Z"
                    transform="translate(-10.748 -19.114)"
                    fill="#747474"
                  />
                  <path
                    id="Path_317"
                    data-name="Path 317"
                    d="M7.035,55.146h3.937V49.425A6.836,6.836,0,0,0,7.035,55.146Z"
                    transform="translate(0 -23.478)"
                    fill="#747474"
                  />
                  <path
                    id="Path_318"
                    data-name="Path 318"
                    d="M18.483,28.055H18.6a9.14,9.14,0,0,1-.6-2.879,1.478,1.478,0,0,0,.478,2.879Z"
                    transform="translate(-5.04 -11.215)"
                    fill="#747474"
                  />
                  <path
                    id="Path_319"
                    data-name="Path 319"
                    d="M17.989,14.5A7.968,7.968,0,0,1,17,13.536V18.72a2.448,2.448,0,0,1,.989-.457Z"
                    transform="translate(-5.04 -5.328)"
                    fill="#747474"
                  />
                  <path
                    id="Path_320"
                    data-name="Path 320"
                    d="M24.88,3h-.073a6.067,6.067,0,0,0-2.406.491l-.854.366a7.7,7.7,0,0,1-3.049.626,7.982,7.982,0,0,1-3-.569l-.419-.168a6.93,6.93,0,0,0,6.88,6.173h4.448a3.463,3.463,0,0,1,3.428,3.012,2.447,2.447,0,0,1,1.021.46V8.975A5.976,5.976,0,0,0,24.88,3Zm3.508,5.149a5.455,5.455,0,0,0-4.944-3.172V3.989a6.447,6.447,0,0,1,5.843,3.748Z"
                    transform="translate(-4.069 0)"
                    fill="#747474"
                  />
                  <path
                    id="Path_321"
                    data-name="Path 321"
                    d="M44.356,25.174a9.163,9.163,0,0,1-.6,2.88h.119a1.479,1.479,0,0,0,.478-2.88Z"
                    transform="translate(-18.572 -11.214)"
                    fill="#747474"
                  />
                  <path
                    id="Path_322"
                    data-name="Path 322"
                    d="M49,49.426v5.721h3.937A6.835,6.835,0,0,0,49,49.426Z"
                    transform="translate(-21.223 -23.479)"
                    fill="#747474"
                  />
                  <path
                    id="Path_323"
                    data-name="Path 323"
                    d="M31.874,20.386A2.474,2.474,0,0,0,29.4,17.914H24.954A7.86,7.86,0,0,1,21,16.853V20.56a8.168,8.168,0,0,0,5.437,7.706,8.169,8.169,0,0,0,5.437-7.706Zm-8.4,0a.494.494,0,1,1,.494-.494A.494.494,0,0,1,23.471,20.386Zm2.966,5.931A1.979,1.979,0,0,1,24.46,24.34h.989a.989.989,0,1,0,1.977,0h.989A1.979,1.979,0,0,1,26.437,26.317ZM29.4,20.386a.494.494,0,1,1,.494-.494A.494.494,0,0,1,29.4,20.386Z"
                    transform="translate(-7.062 -7.006)"
                    fill="#747474"
                  />
                  <path
                    id="Path_324"
                    data-name="Path 324"
                    d="M31.976,52.545l-.826-3.029-.209-.183-.217.193L29.9,52.545l1.038.519Z"
                    transform="translate(-11.563 -23.432)"
                    fill="#747474"
                  />
                </g>
              </svg>
              <div className="sidebar_menuTitle">Finance</div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SidebarDash;
