import React, { useEffect, useRef, useState } from "react";
import { Redirect } from "react-router-dom";
import HeaderMain from "../components/HeaderMain";
import Sidebar, { INIT_PAGES } from "../components/Sidebar";
import Footer from "../components/Footer";
import CustomSpinner from "../components/CustomSpinner";
import { adminStatus } from "../components/utility/localStorage";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import {
  PROPERTY_ID,
  USER_ID,
  USER_TOKEN,
} from "../components/LocalStorageInfo";

function Documents(props) {
  const hasMount = useRef(false);
  const [propertyId, setPropertyId] = useState(PROPERTY_ID());
  const [userToken, setUserToken] = useState(USER_TOKEN());
  const [userId, setUserId] = useState(USER_ID());
  const [isLoading, setIsLoading] = useState(true);
  const [documents, setDocuments] = useState([]);
  const [bankDocuments, setBankDocuments] = useState([]);
  const [legalDocuments, setLegalDocuments] = useState([]);
  const [loginWarning, setLoginWarning] = useState("");
  const [pageState, setPageState] = useState(null);
  const [prevPage, setPrevPage] = useState(false);
  const [nextPage, setNextPage] = useState(false);
  const [refetchData, setRefetchData] = useState(false);

  useEffect(() => {
    document.title = "Documents";
    const sendSession = async () => {
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/user-session/?user_id=${userId}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${userToken}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.status_code === 200) {
            console.log("session", data);
            setPageState(data.user_page);
          }
        })
        .catch((error) => console.error(error));
    };

    const fetchData = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/upload-document/?property_id=${propertyId}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${userToken}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("data", data);
          if (data.status_code === 200) {
            const { Document, Bank, Legal } = data.result.list_documents;
            setDocuments(Document);
            setBankDocuments(Bank);
            setLegalDocuments(Legal);
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };

    sendSession();
    fetchData();
  }, [refetchData]);

  useEffect(() => {
    if (!hasMount.current) {
      hasMount.current = true;
      return;
    }
    handleSubmit();
  }, [props.submit]);

  const handlePrevPage = () => setPrevPage(true);

  const handleUploadDoc = (e) => {
    console.log("documents", e.target.files);
    let temp = [...documents];
    if (e.target.files.length > 0)
      for (let i = 0; i < e.target.files.length; i++) {
        console.log("-->", e.target.files[i]);
        if (
          e.target.files[i].type === "image/png" ||
          e.target.files[i].type === "image/jpeg" ||
          e.target.files[i].type === "application/pdf" ||
          e.target.files[i].type === "application/msword" ||
          e.target.files[i].type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
          if (e.target.files[i].size < 2000000) {
            temp.push(e.target.files[i]);
          } else toast.error("Please upload document of size less than 2MB!");
        } else toast.error("Unsupported Type!");
      }
    setDocuments(temp);
  };

  const handleUploadBankDoc = (e) => {
    console.log("bank documents", e.target.files);
    let temp = [...bankDocuments];
    if (e.target.files.length > 0)
      for (let i = 0; i < e.target.files.length; i++) {
        console.log("-->", e.target.files[i]);
        if (
          e.target.files[i].type === "image/png" ||
          e.target.files[i].type === "image/jpeg" ||
          e.target.files[i].type === "application/pdf" ||
          e.target.files[i].type === "application/msword" ||
          e.target.files[i].type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
          if (e.target.files[i].size < 2000000) {
            temp.push(e.target.files[i]);
          } else toast.error("Please upload document of size less than 2MB!");
        } else toast.error("Unsupported Type!");
      }
    setBankDocuments(temp);
  };

  const handleUploadLegalDoc = (e) => {
    console.log("legal documents", e.target.files);
    let temp = [...legalDocuments];
    if (e.target.files.length > 0)
      for (let i = 0; i < e.target.files.length; i++) {
        console.log("-->", e.target.files[i]);
        if (
          e.target.files[i].type === "image/png" ||
          e.target.files[i].type === "image/jpeg" ||
          e.target.files[i].type === "application/pdf" ||
          e.target.files[i].type === "application/msword" ||
          e.target.files[i].type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
          if (e.target.files[i].size < 2000000) {
            temp.push(e.target.files[i]);
          } else toast.error("Please upload document of size less than 2MB!");
        } else toast.error("Unsupported Type!");
      }
    setLegalDocuments(temp);
  };

  const confirmSubmit = (id) => {
    confirmAlert({
      title: "Are you sure to do this?",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleDelete(id),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const handleDelete = (id) => {
    const deleteData = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/upload-document/?document_id=${id}`,
        {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${userToken}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("data", data);
          if (data.status_code === 200) {
            setIsLoading(false);
            setRefetchData((prevState) => !prevState);
          }
        })
        .catch((error) => console.error(error));
    };
    deleteData();
  };

  const handleSubmit = () => {
    setLoginWarning("");
    if (
      documents.length > 0 &&
      bankDocuments.length > 0 &&
      legalDocuments.length > 0
    ) {
      const sendSession = async () => {
        await fetch(`${process.env.REACT_APP_API_BASE_URL}/user-session/`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${userToken}`,
          },
          body: JSON.stringify({
            user_id: userId,
            page_name: INIT_PAGES.documents,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.status_code === 200) {
              console.log("session", data);
            }
          })
          .catch((error) => console.error(error));
      };

      const fetchData = async () => {
        setIsLoading(true);
        let formBody = new FormData();
        formBody.append("property_id", propertyId);
        documents.forEach((doc) => formBody.append("document", doc));
        bankDocuments.forEach((doc) => formBody.append("bank_doc", doc));
        legalDocuments.forEach((doc) => formBody.append("legal_doc", doc));
        await fetch(`${process.env.REACT_APP_API_BASE_URL}/upload-document/`, {
          method: "post",
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            Authorization: `Token ${userToken}`,
          },
          body: formBody,
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.status_code === 200) {
              console.log("data", data);
              sendSession();
              setIsLoading(false);
              setNextPage(true);
            }
          })
          .catch((error) => console.error(error));
      };
      fetchData();
    } else setLoginWarning("Please upload a document!");
  };

  if (!userToken) return <Redirect to={"./"} />;
  else if (prevPage)
    return (
      <Redirect
        to={adminStatus() ? "/admin-property/add/legal-info" : "./legal-info"}
      />
    );
  else if (!props.dashboard && nextPage)
    return (
      <Redirect
        to={adminStatus() ? "/admin-property/" : "./dashboard/landing"}
      />
    );
  else
    return (
      <>
        <CustomSpinner isLoading={isLoading} />
        {!props.dashboard && <HeaderMain />}
        <div className="basicinfo-wrapper sectionPB">
          <div className={!props.dashboard ? "container-fluid" : ""}>
            <div className="wrapper-wh">
              {/* Sidebar */}
              {!props.dashboard && (
                <Sidebar
                  pageState={pageState}
                  currentPage={INIT_PAGES.documents}
                />
              )}
              {/* End Sidebar */}

              {/* Main-Content */}
              <div className={!props.dashboard ? "company-registerform" : ""}>
                <div className="wrapper-formregster">
                  <div className="row">
                    <div className="col-lg-8 col-md-12 col-sm-12">
                      <div className="info-wrapper">
                        {!props.dashboard && (
                          <div className="main-heading">
                            <h4 className="heading">Documents</h4>
                          </div>
                        )}
                        <div
                          className={
                            !props.dashboard ? "info-form" : "dashboard_wrapper"
                          }
                        >
                          <div className="row">
                            <div className="col-md-12 mb-2">
                              <h5 className="heading">Documents</h5>
                            </div>

                            <div className="col-md-12 bg-color-light2 drag-drop-box">
                              <div className="drag-drop-area">
                                <input
                                  type="file"
                                  multiple
                                  onChange={handleUploadDoc}
                                />
                              </div>
                              <div className="text-center my-5 drag-drop-infotxt">
                                <p>Drop file hear or upload</p>
                              </div>
                            </div>
                            <div className="col-md-12 mb-4 file-ext-info">
                              (eg. certificate of GST, VAT, Service Tax etc.)
                            </div>
                            <div className="col-md-12 ">
                              <table className="table table-sm table-hover">
                                <thead>
                                  <tr className="table-active">
                                    <th scope="col">Document Name</th>
                                    <th scope="col">Last Modified At</th>
                                    <th scope="col">Verification Status</th>
                                    <th scope="col">Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {documents.length > 0 &&
                                    documents.map((doc, index) => (
                                      <tr
                                        key={`doc-${index}`}
                                        className="bg-color-table-row text-secondary"
                                      >
                                        <td>{doc.name}</td>
                                        <td>
                                          {typeof doc?.lastModifiedDate ===
                                          "string"
                                            ? doc.lastModifiedDate
                                            : doc.lastModifiedDate
                                                ?.toISOString()
                                                .slice(0, 10)}
                                        </td>
                                        <td>
                                          {doc.verification_status ||
                                            "To be reviewed"}
                                        </td>
                                        <td>
                                          <a
                                            href={`${process.env.REACT_APP_API_BASE_URL}${doc.document}/`}
                                            target="_blank"
                                          >
                                            <img
                                              className="mr-3"
                                              src={require("../assets/img/icons/icon-awesome-eye-main.svg")}
                                              alt="eye-icon"
                                            />
                                          </a>
                                          <a
                                            href={`${process.env.REACT_APP_API_BASE_URL}/download-document/${doc.id}/`}
                                          >
                                            <img
                                              className="mr-3"
                                              src={require("../assets/img/icons/icon-feather-download.svg")}
                                              alt="download-icon"
                                            />
                                          </a>
                                          <img
                                            className="cursorPointer"
                                            src={require("../assets/img/icons/icon-material-delete-sweep-red.svg")}
                                            alt="delete-icon"
                                            onClick={() =>
                                              confirmSubmit(doc.id)
                                            }
                                          />
                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                              </table>
                              <p
                                className={
                                  !documents.length > 0 && loginWarning
                                    ? "text-danger text-center"
                                    : "display-none"
                                }
                              >
                                {loginWarning}
                              </p>
                            </div>

                            <div className="col-md-12 mt-4 mb-2">
                              <h5 className="heading">Bank Documents</h5>
                            </div>

                            <div className="col-md-12 bg-color-light2 drag-drop-box">
                              <div className="drag-drop-area">
                                <input
                                  type="file"
                                  multiple
                                  onChange={handleUploadBankDoc}
                                />
                              </div>
                              <div className="text-center my-5 drag-drop-infotxt">
                                <p>Drop file hear or upload</p>
                              </div>
                            </div>
                            <div className="col-md-12 mb-4 file-ext-info">
                              (eg. cancel check or bank account details on the
                              letterhead of property)
                            </div>
                            <div className="col-md-12">
                              <table className="table table-sm table-hover">
                                <thead>
                                  <tr className="table-active">
                                    <th scope="col">Document Name</th>
                                    <th scope="col">Last Modified At</th>
                                    <th scope="col">Verification Status</th>
                                    <th scope="col">Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {bankDocuments.length > 0 &&
                                    bankDocuments.map((doc, index) => (
                                      <tr
                                        key={`bankDoc-${index}`}
                                        className="bg-color-table-row text-secondary"
                                      >
                                        <td>{doc.name}</td>
                                        <td>
                                          {typeof doc?.lastModifiedDate ===
                                          "string"
                                            ? doc.lastModifiedDate
                                            : doc.lastModifiedDate
                                                ?.toISOString()
                                                .slice(0, 10)}
                                        </td>
                                        <td>
                                          {doc.verification_status ||
                                            "To be reviewed"}
                                        </td>
                                        <td>
                                          <a
                                            href={`${process.env.REACT_APP_API_BASE_URL}${doc.document}/`}
                                            target="_blank"
                                          >
                                            <img
                                              className="mr-3"
                                              src={require("../assets/img/icons/icon-awesome-eye-main.svg")}
                                              alt="eye-icon"
                                            />
                                          </a>
                                          <a
                                            href={`${process.env.REACT_APP_API_BASE_URL}/download-document/${doc.id}/`}
                                          >
                                            <img
                                              className="mr-3"
                                              src={require("../assets/img/icons/icon-feather-download.svg")}
                                              alt="download-icon"
                                            />
                                          </a>
                                          <img
                                            className="cursorPointer"
                                            src={require("../assets/img/icons/icon-material-delete-sweep-red.svg")}
                                            alt="delete-icon"
                                            onClick={() =>
                                              confirmSubmit(doc.id)
                                            }
                                          />
                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                              </table>
                              <p
                                className={
                                  !bankDocuments.length > 0 && loginWarning
                                    ? "text-danger text-center"
                                    : "display-none"
                                }
                              >
                                {loginWarning}
                              </p>
                            </div>

                            <div className="col-md-12 mt-4 mb-2">
                              <h5 className="heading">Legal Documents</h5>
                            </div>

                            <div className="col-md-12 bg-color-light2 drag-drop-box">
                              <div className="drag-drop-area ">
                                <input
                                  type="file"
                                  multiple
                                  onChange={handleUploadLegalDoc}
                                />
                              </div>
                              <div className="text-center drag-drop-infotxt my-5">
                                <p>Drop file hear or upload</p>
                              </div>
                            </div>
                            <div className="col-md-12 mb-4 file-ext-info">
                              Address proof (property registration certificate,
                              property lease agreement etc.)
                            </div>
                            <div className="col-md-12">
                              <table className="table table-sm table-hover">
                                <thead>
                                  <tr className="table-active">
                                    <th scope="col">Document Name</th>
                                    <th scope="col">Last Modified At</th>
                                    <th scope="col">Verification Status</th>
                                    <th scope="col">Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {legalDocuments.length > 0 &&
                                    legalDocuments.map((doc, index) => (
                                      <tr
                                        key={`legalDoc-${index}`}
                                        className="bg-color-table-row text-secondary"
                                      >
                                        <td>{doc.name}</td>
                                        <td>
                                          {typeof doc?.lastModifiedDate ===
                                          "string"
                                            ? doc.lastModifiedDate
                                            : doc.lastModifiedDate
                                                ?.toISOString()
                                                .slice(0, 10)}
                                        </td>
                                        <td>
                                          {doc.verification_status ||
                                            "To be reviewed"}
                                        </td>
                                        <td>
                                          <a
                                            href={`${process.env.REACT_APP_API_BASE_URL}${doc.document}/`}
                                            target="_blank"
                                          >
                                            <img
                                              className="mr-3"
                                              src={require("../assets/img/icons/icon-awesome-eye-main.svg")}
                                              alt="eye-icon"
                                            />
                                          </a>
                                          <a
                                            href={`${process.env.REACT_APP_API_BASE_URL}/download-document/${doc.id}/`}
                                          >
                                            <img
                                              className="mr-3"
                                              src={require("../assets/img/icons/icon-feather-download.svg")}
                                              alt="download-icon"
                                            />
                                          </a>
                                          <img
                                            className="cursorPointer"
                                            src={require("../assets/img/icons/icon-material-delete-sweep-red.svg")}
                                            alt="delete-icon"
                                            onClick={() =>
                                              confirmSubmit(doc.id)
                                            }
                                          />
                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                              </table>
                              <p
                                className={
                                  !legalDocuments.length > 0 && loginWarning
                                    ? "text-danger text-center"
                                    : "display-none"
                                }
                              >
                                {loginWarning}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Main-Content */}
            </div>
          </div>

          {/* Footer Nav */}
          {!props.dashboard && (
            <Footer
              nPage={10}
              handlePrevPage={handlePrevPage}
              handleSubmit={handleSubmit}
            />
          )}
          {/* End Footer Nav */}
        </div>
      </>
    );
}

export default Documents;
