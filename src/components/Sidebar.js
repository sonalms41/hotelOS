import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { adminStatus } from "./utility/localStorage";

export const INIT_PAGES = {
  basicInfo: "BasicInfo",
  contact: "Contact",
  amenities: "Amenities",
  roomType: "RoomType",
  photos: "Photos",
  policies: "Policies",
  bankDetails: "BankDetails",
  legalInfo: "LegalInfo",
  documents: "Documents",
};

function Sidebar(props) {
  const { pageState, currentPage } = props;
  return (
    <div className="left_tabs">
      <ul>
        <li>
          <Link
            className={
              (pageState &&
                pageState.includes(INIT_PAGES.basicInfo) &&
                currentPage === INIT_PAGES.basicInfo &&
                "active") ||
              (pageState &&
                pageState.includes(INIT_PAGES.basicInfo) &&
                "active completed") ||
              (currentPage === INIT_PAGES.basicInfo ? "active" : "disable-link")
            }
            to={
              adminStatus() ? "/admin-property/add/basic-info" : "./basic-info"
            }
          >
            Basic Info
          </Link>
        </li>
        <li>
          <Link
            className={
              (pageState &&
                pageState.includes(INIT_PAGES.contact) &&
                currentPage === INIT_PAGES.contact &&
                "active") ||
              (pageState &&
                pageState.includes(INIT_PAGES.contact) &&
                "active completed") ||
              (currentPage === INIT_PAGES.contact ? "active" : "disable-link")
            }
            to={adminStatus() ? "/admin-property/add/contact" : "./contact"}
          >
            Contact
          </Link>
        </li>
        <li>
          <Link
            className={
              (pageState &&
                pageState.includes(INIT_PAGES.amenities) &&
                currentPage === INIT_PAGES.amenities &&
                "active") ||
              (pageState &&
                pageState.includes(INIT_PAGES.amenities) &&
                "active completed") ||
              (currentPage === INIT_PAGES.amenities ? "active" : "disable-link")
            }
            to={adminStatus() ? "/admin-property/add/amenities" : "./amenities"}
          >
            Amenities/ Facilities
          </Link>
        </li>
        <li>
          <Link
            className={
              (pageState &&
                pageState.includes(INIT_PAGES.roomType) &&
                currentPage === INIT_PAGES.roomType &&
                "active") ||
              (pageState &&
                pageState.includes(INIT_PAGES.roomType) &&
                "active completed") ||
              (currentPage === INIT_PAGES.roomType ? "active" : "disable-link")
            }
            to={adminStatus() ? "/admin-property/add/roomtype" : "./room-type"}
          >
            Room Type
          </Link>
        </li>
        <li>
          <Link
            className={
              (pageState &&
                pageState.includes(INIT_PAGES.photos) &&
                currentPage === INIT_PAGES.photos &&
                "active") ||
              (pageState &&
                pageState.includes(INIT_PAGES.photos) &&
                "active completed") ||
              (currentPage === INIT_PAGES.photos ? "active" : "disable-link")
            }
            to={adminStatus() ? "/admin-property/add/photos" : "./photos"}
          >
            Photos
          </Link>
        </li>
        <li>
          <Link
            className={
              (pageState &&
                pageState.includes(INIT_PAGES.policies) &&
                currentPage === INIT_PAGES.policies &&
                "active") ||
              (pageState &&
                pageState.includes(INIT_PAGES.policies) &&
                "active completed") ||
              (currentPage === INIT_PAGES.policies ? "active" : "disable-link")
            }
            to={adminStatus() ? "/admin-property/add/policies" : "./policies"}
          >
            Policies
          </Link>
        </li>
        <li>
          <a
            className="disable-link"
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            Tax Settings
          </a>
        </li>
        <li>
          <Link
            className={
              (pageState &&
                pageState.includes(INIT_PAGES.bankDetails) &&
                currentPage === INIT_PAGES.bankDetails &&
                "active") ||
              (pageState &&
                pageState.includes(INIT_PAGES.bankDetails) &&
                "active completed") ||
              (currentPage === INIT_PAGES.bankDetails
                ? "active"
                : "disable-link")
            }
            to={
              adminStatus()
                ? "/admin-property/add/bank-details"
                : "./bank-details"
            }
          >
            Bank Details
          </Link>
        </li>
        <li>
          <Link
            className={
              (pageState &&
                pageState.includes(INIT_PAGES.legalInfo) &&
                currentPage === INIT_PAGES.legalInfo &&
                "active") ||
              (pageState &&
                pageState.includes(INIT_PAGES.legalInfo) &&
                "active completed") ||
              (currentPage === INIT_PAGES.legalInfo ? "active" : "disable-link")
            }
            to={"./legal-info"}
          >
            Legal Info
          </Link>
        </li>

        <li>
          <Link
            className={
              (pageState &&
                pageState.includes(INIT_PAGES.documents) &&
                currentPage === INIT_PAGES.documents &&
                "active") ||
              (pageState &&
                pageState.includes(INIT_PAGES.documents) &&
                "active completed") ||
              (currentPage === INIT_PAGES.documents ? "active" : "disable-link")
            }
            to={adminStatus() ? "/admin-property/add/documents" : "./documents"}
          >
            Documents
          </Link>
        </li>
        <li>
          <a
            className="disable-link"
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            Contract
          </a>
        </li>
      </ul>
    </div>
  );
}
export default Sidebar;
