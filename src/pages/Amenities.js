import React, { useEffect, useRef, useState } from "react";
import { Redirect } from "react-router-dom";
import HeaderMain from "../components/HeaderMain";
import Sidebar, { INIT_PAGES } from "../components/Sidebar";
import Footer from "../components/Footer";
import CustomSpinner from "../components/CustomSpinner";
import { adminStatus } from "../components/utility/localStorage";
import {
  PROPERTY_ID,
  USER_ID,
  USER_TOKEN,
} from "../components/LocalStorageInfo";
import { adminLocalStorage } from "../components/admin/adminUtility/adminLocalStorage";

function Amenities(props) {
  const hasMount = useRef(false);
  const [propertyId, setPropertyId] = useState(PROPERTY_ID());
  const [userToken, setUserToken] = useState(USER_TOKEN());
  const [userId, setUserId] = useState(USER_ID());
  const [isLoading, setIsLoading] = useState(true);
  const [amenitiesData, setAmenitiesData] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [languagesData, setLanguagesData] = useState([
    "Nepali",
    "English",
    "Hindi",
    "Chinese",
    "Japanese",
    "Korean",
  ]);
  const [loginWarning, setLoginWarning] = useState("");
  const [pageState, setPageState] = useState(null);
  const [prevPage, setPrevPage] = useState(false);
  const [nextPage, setNextPage] = useState(false);

  useEffect(() => {
    document.title = "Amenities";

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
        `${process.env.REACT_APP_API_BASE_URL}/store-hotel-aminities/?property_id=${propertyId}`,
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
          console.log("amenities-data", data);
          if (data.status_code === 200) {
            const {
              aminity,
              languages: languagesInfo,
            } = data.result.aminities_dictionary;
            setAmenitiesData(aminity);
            setLanguages(languagesInfo);
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };

    sendSession();
    fetchData();
  }, []);

  useEffect(() => {
    if (!hasMount.current) {
      hasMount.current = true;
      return;
    }
    handleSubmit();
  }, [props.submit]);

  const handlePrevPage = () => setPrevPage(true);

  const handleAmenitiesChange = (e, i, j) => {
    let updatedData = [...amenitiesData];
    updatedData[i].sub_aminity[j].status = e.target.checked;
    setAmenitiesData(updatedData);
  };

  const handleLanguagesChange = (e) => {
    let updatedData = [...languages];
    if (updatedData.includes(e.target.value))
      updatedData = updatedData.filter((t) => t !== e.target.value);
    else updatedData.push(e.target.value);
    setLanguages(updatedData);
  };

  const handleSubmit = () => {
    console.log('hello')
    setLoginWarning("");
    if (languages.length > 0) {
      const sendSession = async () => {
        await fetch(`${process.env.REACT_APP_API_BASE_URL}/user-session/`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${userToken}`,
          },
          body: JSON.stringify({
            user_id: userId,
            page_name: INIT_PAGES.amenities,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("session", data);
            if (data.status_code === 200) {
            }
          })
          .catch((error) => console.error(error));
      };

      const fetchData = async () => {
        setIsLoading(true);
        await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/store-hotel-aminities/`,
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${userToken}`,
            },
            body: JSON.stringify({
              property_id: propertyId,
              aminities: amenitiesData,
              languages: languages,
            }),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log("data", data);
            if (data.status_code === 200) {
              sendSession();
              setIsLoading(false);
              setNextPage(true);
            }
          })
          .catch((error) => console.error(error));
      };
      fetchData();
    } else setLoginWarning("Field required!");
  };

  if (!userToken) return <Redirect to={"./"} />;
  else if (prevPage) return <Redirect to={"./contact"} />;
  else if (!props.dashboard && nextPage)
    return (
      <Redirect
        to={adminStatus() ? "/admin-property/add/roomtype" : "./room-type"}
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
                  currentPage={INIT_PAGES.amenities}
                />
              )}
              {/* End Sidebar */}

              {/* Main-Content */}
              <div
                className={!props.dashboard ? "company-registerform" : "w-100"}
              >
                <div className="wrapper-formregster">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <div className="info-wrapper">
                        {!props.dashboard && (
                          <div className="main-heading">
                            <h4 className="heading">Amenities</h4>
                          </div>
                        )}
                        <div
                          className={
                            !props.dashboard
                              ? "info-form mb50"
                              : "dashboard_wrapper mb50"
                          }
                        >
                          <div className="row">
                            <div className="col-md-12">
                              {amenitiesData.length > 0 &&
                                amenitiesData.map((amenity, index) => (
                                  <div
                                    key={`amenity-${index}`}
                                    className="mb-4"
                                  >
                                    <div className="sub-heading">
                                      <h5 className="heading">
                                        {amenity.aminity}
                                      </h5>
                                    </div>
                                    <div className="row">
                                      {amenity.sub_aminity.map((sa, idx) => (
                                        <div
                                          key={`sub-amenity-${idx}`}
                                          className={`col-md-3 ${adminLocalStorage.adminStatus()? 'aminity-list':""}`}
                                        >
                                          <label>
                                            <input
                                              type="checkbox"
                                              className="mr-2"
                                              checked={sa.status}
                                              onChange={(e) =>
                                                handleAmenitiesChange(
                                                  e,
                                                  index,
                                                  idx
                                                )
                                              }
                                            />
                                            <span className="mb-2 aminity-item">
                                             {adminLocalStorage.adminStatus()?<span className={ `icon ${sa.icon}`}/> :""} {sa.name}
                                            </span>
                                          </label>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                        <div
                          className={
                            !props.dashboard ? "info-form" : "dashboard_wrapper"
                          }
                        >
                          <div className="row">
                            <div className="col-md-12">
                              <div className="sub-heading">
                                <h5 className="heading">Spoken Language</h5>
                              </div>
                              <div className="tag-check">
                                <ul className="list-inline">
                                  {languagesData.map((language, index) => (
                                    <li key={`language-${index}`}>
                                      <label className="check-tag">
                                        <input
                                          type="checkbox"
                                          value={language}
                                          className="check-tag__input"
                                          checked={languages.includes(language)}
                                          onChange={handleLanguagesChange}
                                        />
                                        <span className="check-tag__text">
                                          {language}
                                        </span>
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <p
                                className={
                                  !(languages.length > 0) && loginWarning
                                    ? "text-danger"
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
              nPage={3}
              handlePrevPage={handlePrevPage}
              handleSubmit={handleSubmit}
            />
          )}
          {/* End Footer Nav */}
        </div>
      </>
    );
}

export default Amenities;
