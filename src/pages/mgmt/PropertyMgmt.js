import React, { useEffect, useState } from "react";
import { INIT_PAGES } from "../../components/Sidebar";

const BasicInfo = React.lazy(() => import("../BasicInfo"));
const Contact = React.lazy(() => import("../Contact"));
const Policies = React.lazy(() => import("../Policies"));
const BankDetails = React.lazy(() => import("../BankDetails"));
const LegalInfo = React.lazy(() => import("../LegalInfo"));
const Documents = React.lazy(() => import("../Documents"));
const RoomType = React.lazy(() => import("../RoomType"));

function PropertyMgmt() {
  const [showTabs, setShowTabs] = useState({
    basicInfo: true,
    contact: false,
    roomType: false,
    policies: false,
    bankInfo: false,
    legalInfo: false,
    documents: false,
  });
  const [submitBasicInfo, setSubmitBasicInfo] = useState(false);
  const [submitContact, setSubmitContact] = useState(false);
  const [submitRoomType, setSubmitRoomType] = useState(false);
  const [submitPolicies, setSubmitPolicies] = useState(false);
  const [submitBankInfo, setSubmitBankInfo] = useState(false);
  const [submitLegalInfo, setSubmitLegalInfo] = useState(false);
  const [submitDocuments, setSubmitDocuments] = useState(false);

  useEffect(() => {
    document.title = `${process.env.REACT_APP_TITLE} - Property Mgmt`;
  }, []);

  const handleTabs = (tab) => {
    if (tab === INIT_PAGES.basicInfo)
      setShowTabs({
        basicInfo: true,
        contact: false,
        roomType: false,
        policies: false,
        bankInfo: false,
        legalInfo: false,
        documents: false,
      });
    if (tab === INIT_PAGES.contact)
      setShowTabs({
        basicInfo: false,
        contact: true,
        roomType: false,
        policies: false,
        bankInfo: false,
        legalInfo: false,
        documents: false,
      });
    if (tab === INIT_PAGES.roomType)
      setShowTabs({
        basicInfo: false,
        contact: false,
        roomType: true,
        policies: false,
        bankInfo: false,
        legalInfo: false,
        documents: false,
      });
    if (tab === INIT_PAGES.policies)
      setShowTabs({
        basicInfo: false,
        contact: false,
        roomType: false,
        policies: true,
        bankInfo: false,
        legalInfo: false,
        documents: false,
      });
    if (tab === INIT_PAGES.bankDetails)
      setShowTabs({
        basicInfo: false,
        contact: false,
        roomType: false,
        policies: false,
        bankInfo: true,
        legalInfo: false,
        documents: false,
      });
    if (tab === INIT_PAGES.legalInfo)
      setShowTabs({
        basicInfo: false,
        contact: false,
        roomType: false,
        policies: false,
        bankInfo: false,
        legalInfo: true,
        documents: false,
      });
    if (tab === INIT_PAGES.documents)
      setShowTabs({
        basicInfo: false,
        contact: false,
        roomType: false,
        policies: false,
        bankInfo: false,
        legalInfo: false,
        documents: true,
      });
  };

  return (
    <>
      <div className="main_tile">
        <h4 className="heading">Property Management</h4>
      </div>

      <div className="tab">
        <div
          className={showTabs.basicInfo ? "tab_links_active" : "tab_links"}
          onClick={() => handleTabs(INIT_PAGES.basicInfo)}
        >
          Basic Details
        </div>
        <div
          className={showTabs.contact ? "tab_links_active" : "tab_links"}
          onClick={() => handleTabs(INIT_PAGES.contact)}
        >
          Contact
        </div>
        <div
          className={showTabs.roomType ? "tab_links_active" : "tab_links"}
          onClick={() => handleTabs(INIT_PAGES.roomType)}
        >
          Room Type
        </div>
        <div
          className={showTabs.policies ? "tab_links_active" : "tab_links"}
          onClick={() => handleTabs(INIT_PAGES.policies)}
        >
          Policies
        </div>
        <div
          className={showTabs.bankInfo ? "tab_links_active" : "tab_links"}
          onClick={() => handleTabs(INIT_PAGES.bankDetails)}
        >
          Bank Info
        </div>
        <div
          className={showTabs.legalInfo ? "tab_links_active" : "tab_links"}
          onClick={() => handleTabs(INIT_PAGES.legalInfo)}
        >
          Legal Info
        </div>
        <div
          className={showTabs.documents ? "tab_links_active" : "tab_links"}
          onClick={() => handleTabs(INIT_PAGES.documents)}
        >
          Documents
        </div>
      </div>

      <div className={showTabs.basicInfo ? "" : "display-none"}>
        <BasicInfo dashboard={true} submit={submitBasicInfo} />
        <span
          className="btn_addo"
          onClick={() => setSubmitBasicInfo((prevState) => !prevState)}
        >
          Save
        </span>
      </div>
      <div className={showTabs.contact ? "" : "display-none"}>
        <Contact dashboard={true} submit={submitContact} />
        <span
          className="btn_addo"
          onClick={() => setSubmitContact((prevState) => !prevState)}
        >
          Save
        </span>
      </div>
      <div className={showTabs.roomType ? "" : "display-none"}>
        <RoomType dashboard={true} submit={submitRoomType} />
        <span
          className="btn_addo"
          onClick={() => setSubmitRoomType((prevState) => !prevState)}
        >
          Save
        </span>
      </div>
      <div className={showTabs.policies ? "" : "display-none"}>
        <Policies dashboard={true} submit={submitPolicies} />
        <span
          className="btn_addo"
          onClick={() => setSubmitPolicies((prevState) => !prevState)}
        >
          Save
        </span>
      </div>
      <div className={showTabs.bankInfo ? "" : "display-none"}>
        <BankDetails dashboard={true} submit={submitBankInfo} />
        <span
          className="btn_addo"
          onClick={() => setSubmitBankInfo((prevState) => !prevState)}
        >
          Save
        </span>
      </div>
      <div className={showTabs.legalInfo ? "" : "display-none"}>
        <LegalInfo dashboard={true} submit={submitLegalInfo} />
        <span
          className="btn_addo"
          onClick={() => setSubmitLegalInfo((prevState) => !prevState)}
        >
          Save
        </span>
      </div>
      <div className={showTabs.documents ? "" : "display-none"}>
        <Documents dashboard={true} submit={submitDocuments} />
        <span
          className="btn_addo"
          onClick={() => setSubmitDocuments((prevState) => !prevState)}
        >
          Save
        </span>
      </div>
    </>
  );
}

export default PropertyMgmt;
