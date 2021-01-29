import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ContentLoadingPlaceholder from "../../components/ContentLoadingPlaceholder";
import { PROPERTY_ID, USER_TOKEN } from "../../components/LocalStorageInfo";

import KhaltiLogo from "../../assets/img/icons/khalti_logo.svg";

const TAB_NAMES = {
  guestRequest: "guestRequest",
  upcoming: "upcoming",
  inhouse: "inhouse",
  completed: "completed",
  canceled: "canceled",
};

function Bookings() {
  const [propertyId, setPropertyId] = useState(PROPERTY_ID());
  const [userToken, setUserToken] = useState(USER_TOKEN());
  const [isLoading, setIsLoading] = useState(true);
  const [showTabs, setShowTabs] = useState({
    guestRequest: true,
    upcoming: false,
    inhouse: false,
    completed: false,
    canceled: false,
  });
  const [guestRequest, setGuestRequest] = useState([]);
  const [guestRequestCount, setGuestRequestCount] = useState("");
  const [upcoming, setUpcoming] = useState([]);
  const [upcomingCount, setUpcomingCount] = useState("");
  const [inhouse, setInhouse] = useState([]);
  const [inhouseCount, setInhouseCount] = useState("");
  const [completed, setCompleted] = useState([]);
  const [completedCount, setCompletedCount] = useState("");
  const [canceled, setCanceled] = useState([]);
  const [canceledCount, setCanceledCount] = useState("");
  const [pageNumberGuestReq, setPageNumberGuestReq] = useState(1);
  const [pageNumberUpcomming, setPageNumberUpcomming] = useState(1);
  const [pageNumberInhouse, setPageNumberInhouse] = useState(1);
  const [pageNumberCompleted, setPageNumberCompleted] = useState(1);
  const [pageNumberCancel, setPageNumberCancel] = useState(1);
  const [hasMoreGuestReq, setHasMoreGuestReq] = useState(true);
  const [hasMoreUpcomming, setHasMoreUpcomming] = useState(true);
  const [hasMoreInhouse, setHasMoreInhouse] = useState(true);
  const [hasMoreCompleted, setHasMoreCompleted] = useState(true);
  const [hasMoreCancel, setHasMoreCancel] = useState(true);

  const observer = useRef();
  const grLastElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMoreGuestReq)
          setPageNumberGuestReq((prevState) => prevState + 1);
      });
      if (node) observer.current.observe(node);
    },
    [isLoading]
  );
  const upLastElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMoreUpcomming)
          setPageNumberUpcomming((prevState) => prevState + 1);
      });
      if (node) observer.current.observe(node);
    },
    [isLoading]
  );
  const inLastElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMoreInhouse)
          setPageNumberInhouse((prevState) => prevState + 1);
      });
      if (node) observer.current.observe(node);
    },
    [isLoading]
  );
  const cmpLastElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMoreCompleted)
          setPageNumberCompleted((prevState) => prevState + 1);
      });
      if (node) observer.current.observe(node);
    },
    [isLoading]
  );
  const cnlLastElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMoreCancel)
          setPageNumberCancel((prevState) => prevState + 1);
      });
      if (node) observer.current.observe(node);
    },
    [isLoading]
  );

  const handleTabs = (tab) => {
    if (tab === TAB_NAMES.guestRequest)
      setShowTabs({
        guestRequest: true,
        upcoming: false,
        inhouse: false,
        completed: false,
        canceled: false,
      });
    if (tab === TAB_NAMES.upcoming)
      setShowTabs({
        guestRequest: false,
        upcoming: true,
        inhouse: false,
        completed: false,
        canceled: false,
      });
    if (tab === TAB_NAMES.inhouse)
      setShowTabs({
        guestRequest: false,
        upcoming: false,
        inhouse: true,
        completed: false,
        canceled: false,
      });
    if (tab === TAB_NAMES.completed)
      setShowTabs({
        guestRequest: false,
        upcoming: false,
        inhouse: false,
        completed: true,
        canceled: false,
      });
    if (tab === TAB_NAMES.canceled)
      setShowTabs({
        guestRequest: false,
        upcoming: false,
        inhouse: false,
        completed: false,
        canceled: true,
      });
  };

  useEffect(() => {
    document.title = `${process.env.REACT_APP_TITLE} - Booking`;
    const fetchData = async () => {
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/booking-detail-os/?property_id=${propertyId}`,
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
          console.log("data count", data);
          if (data.status_code === 200) {
            setGuestRequestCount(data.result.request);
            setUpcomingCount(data.result.upcomming);
            setInhouseCount(data.result.inhouse);
            setCompletedCount(data.result.completed);
            setCanceledCount(data.result.tocancel);
          }
        })
        .catch((error) => console.error(error));
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (showTabs.guestRequest && hasMoreGuestReq) {
      const fetchData = async () => {
        setIsLoading(true);
        await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/booking-request-details/?property_id=${propertyId}&page_number=${pageNumberGuestReq}`,
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
            console.log("guest req", data);
            if (data.status_code === 200) {
              setGuestRequest((prevState) => [...prevState, ...data.result]);
              setHasMoreGuestReq(data.has_next);
            }
            if (data.status_code === 403) {
              toast.warn(data.message);
              setTimeout(() => {
                localStorage.clear();
                window.location.reload(false);
              }, 1500);
            }
            setIsLoading(false);
          })
          .catch((error) => console.error(error));
      };
      fetchData();
    }
    if (showTabs.upcoming && hasMoreUpcomming) {
      const fetchData = async () => {
        setIsLoading(true);
        await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/upcomming-booking-details/?property_id=${propertyId}&page_number=${pageNumberUpcomming}`,
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
            console.log("data upcoming", data);
            if (data.status_code === 200) {
              setUpcoming((prevState) => [...prevState, ...data.result]);
              setHasMoreUpcomming(data.has_next);
            }
            if (data.status_code === 403) {
              toast.warn(data.message);
              setTimeout(() => {
                localStorage.clear();
                window.location.reload(false);
              }, 1500);
            }
            setIsLoading(false);
          })
          .catch((error) => console.error(error));
      };
      fetchData();
    }
    if (showTabs.inhouse && hasMoreInhouse) {
      const fetchData = async () => {
        setIsLoading(true);
        await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/inhouse-booking-details/?property_id=${propertyId}&page_number=${pageNumberInhouse}`,
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
            console.log("data inhouse", data);
            if (data.status_code === 200) {
              setInhouse((prevState) => [...prevState, ...data.result]);
              setHasMoreInhouse(data.has_next);
            }
            if (data.status_code === 403) {
              toast.warn(data.message);
              setTimeout(() => {
                localStorage.clear();
                window.location.reload(false);
              }, 1500);
            }
            setIsLoading(false);
          })
          .catch((error) => console.error(error));
      };
      fetchData();
    }
    if (showTabs.completed && hasMoreCompleted) {
      const fetchData = async () => {
        setIsLoading(true);
        await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/completed-booking-details/?property_id=${propertyId}&page_number=${pageNumberCompleted}`,
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
            console.log("data completed", data);
            if (data.status_code === 200) {
              setCompleted((prevState) => [...prevState, ...data.result]);
              setHasMoreCompleted(data.has_next);
            }
            if (data.status_code === 403) {
              toast.warn(data.message);
              setTimeout(() => {
                localStorage.clear();
                window.location.reload(false);
              }, 1500);
            }
            setIsLoading(false);
          })
          .catch((error) => console.error(error));
      };
      fetchData();
    }
    if (showTabs.canceled && hasMoreCancel) {
      const fetchData = async () => {
        setIsLoading(true);
        await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/booking-to-cancel-details/?property_id=${propertyId}&page_number=${pageNumberCancel}`,
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
            console.log("data canceled", data);
            if (data.status_code === 200) {
              setCanceled((prevState) => [...prevState, ...data.result]);
              setHasMoreCancel(data.has_next);
            }
            if (data.status_code === 403) {
              toast.warn(data.message);
              setTimeout(() => {
                localStorage.clear();
                window.location.reload(false);
              }, 1500);
            }
            setIsLoading(false);
          })
          .catch((error) => console.error(error));
      };
      fetchData();
    }
  }, [
    showTabs,
    pageNumberGuestReq,
    pageNumberUpcomming,
    pageNumberInhouse,
    pageNumberCompleted,
    pageNumberCancel,
  ]);

  return (
    <>
      <div className="main_tile">
        <h4 className="heading">Bookings</h4>
      </div>

      <div className="tab">
        <div
          className={showTabs.guestRequest ? "tab_links_active" : "tab_links"}
          onClick={() => handleTabs(TAB_NAMES.guestRequest)}
        >
          Guest Request
          <br />
          <span className="mt-3">{guestRequestCount}</span>
        </div>
        <div
          className={showTabs.upcoming ? "tab_links_active" : "tab_links"}
          onClick={() => handleTabs(TAB_NAMES.upcoming)}
        >
          Upcoming
          <br />
          <span className="mt-3">{upcomingCount}</span>
        </div>
        <div
          className={showTabs.inhouse ? "tab_links_active" : "tab_links"}
          onClick={() => handleTabs(TAB_NAMES.inhouse)}
        >
          In House
          <br />
          <span className="mt-3">{inhouseCount}</span>
        </div>
        <div
          className={showTabs.completed ? "tab_links_active" : "tab_links"}
          onClick={() => handleTabs(TAB_NAMES.completed)}
        >
          Completed
          <br />
          <span className="mt-3">{completedCount}</span>
        </div>
        <div
          className={showTabs.canceled ? "tab_links_active" : "tab_links"}
          onClick={() => handleTabs(TAB_NAMES.canceled)}
        >
          Canceled
          <br />
          <span className="mt-3">{canceledCount}</span>
        </div>
      </div>

      <div
        className={showTabs.guestRequest ? "dashboard_wrapper" : "display-none"}
      >
        <div className="row">
          <div className="col-auto mr-auto">
            <p className="font-weight-bold text-dark font16">Guest Request</p>
          </div>
        </div>
        <hr />

        {guestRequest.length > 0
          ? guestRequest.map((gr, index) => (
              <div key={`gr-${index}`} className="mb-4">
                {gr.bookings.length > 0 && (
                  <>
                    <div className="mb-3">
                      <span className="font-weight-bold mr-2">{gr.day}:</span>
                      <span className="mt-1">
                        {gr.total_bookings} Bookings
                        <span className="mx-2">|</span>
                        {gr.total_rooms} Rooms
                        <span className="mx-2">|</span>
                        {gr.total_guests} Guests
                      </span>
                    </div>
                    {gr.bookings.map((book, idx) => {
                      if (gr.bookings.length === idx + 1) {
                        return (
                          <div
                            ref={grLastElementRef}
                            key={`gr-book-${idx}`}
                            className={
                              book.delay_status !== "Delayed"
                                ? "upcoming_details_datewise mb-2"
                                : "completed_details_datewise mb-2"
                            }
                          >
                            <Link
                              to={`/dashboard/reservation/${book.id}`}
                              style={
                                book.delay_status === "Delayed"
                                  ? { width: "100%", pointerEvents: "none" }
                                  : { width: "100%" }
                              }
                            >
                              <div className="row">
                                <div className="col-md-3">
                                  <p className="font-weight-bold text-dark">
                                    {book.full_name}
                                  </p>
                                  <p>
                                    {book.rooms} - {book.guests} - {book.nights}
                                  </p>
                                </div>
                                <div className="col-md-2 mt-3">
                                  <p className="font-weight-bold">
                                    {book.phone_number}
                                  </p>
                                </div>
                                <div className="col-md-2 mt-1">
                                  <p className="rd_timedate_green">
                                    {book.room_type[0]?.room_type__name}
                                  </p>
                                </div>
                                <div className="col-md-2 mt-1">
                                  {book.paid_with === "Khalti" ? (
                                    <img
                                      className="khalti_logo mt-2"
                                      src={KhaltiLogo}
                                      alt="Khalti"
                                    />
                                  ) : (
                                    <p className="rd_timedate_red">
                                      {book.paid_with}
                                    </p>
                                  )}
                                </div>
                                <div className="col-md-2 mt-1">
                                  <p className="rd_timedate">
                                    NRS. {book.paid_price}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </div>
                        );
                      } else {
                        return (
                          <div
                            key={`gr-book-${idx}`}
                            className={
                              book.delay_status !== "Delayed"
                                ? "upcoming_details_datewise mb-2"
                                : "completed_details_datewise mb-2"
                            }
                          >
                            <Link
                              to={`/dashboard/reservation/${book.id}`}
                              style={
                                book.delay_status === "Delayed"
                                  ? { width: "100%", pointerEvents: "none" }
                                  : { width: "100%" }
                              }
                            >
                              <div className="row">
                                <div className="col-md-3">
                                  <p className="font-weight-bold text-dark">
                                    {book.full_name}
                                  </p>
                                  <p>
                                    {book.rooms} - {book.guests} - {book.nights}
                                  </p>
                                </div>
                                <div className="col-md-2 mt-3">
                                  <p className="font-weight-bold">
                                    {book.phone_number}
                                  </p>
                                </div>
                                <div className="col-md-2 mt-1">
                                  <p className="rd_timedate_green">
                                    {book.room_type[0]?.room_type__name}
                                  </p>
                                </div>
                                <div className="col-md-2 mt-1">
                                  {book.paid_with === "Khalti" ? (
                                    <img
                                      className="khalti_logo mt-2"
                                      src={KhaltiLogo}
                                      alt="Khalti"
                                    />
                                  ) : (
                                    <p className="rd_timedate_red">
                                      {book.paid_with}
                                    </p>
                                  )}
                                </div>
                                <div className="col-md-2 mt-1">
                                  <p className="rd_timedate">
                                    NRS. {book.paid_price}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </div>
                        );
                      }
                    })}
                  </>
                )}
              </div>
            ))
          : !isLoading && (
              <h3 className="d-flex justify-content-center mt120 mb120">
                No guest request!
              </h3>
            )}
      </div>

      <div className={showTabs.upcoming ? "dashboard_wrapper" : "display-none"}>
        <div className="row">
          <div className="col-auto mr-auto">
            <p className="font-weight-bold text-dark font16">Upcoming</p>
          </div>
        </div>
        <hr />

        {upcoming.length > 0
          ? upcoming.map((up, index) => (
              <div key={`up-${index}`} className="mb-4">
                {up.bookings.length > 0 && (
                  <>
                    <div className="mb-3">
                      <span className="font-weight-bold mr-2">{up.day}:</span>
                      <span className="mt-1">
                        {up.total_bookings} Bookings
                        <span className="mx-2">|</span>
                        {up.total_rooms} Rooms
                        <span className="mx-2">|</span>
                        {up.total_guests} Guests
                      </span>
                    </div>
                    {up.bookings.map((book, idx) => {
                      if (up.bookings.length === idx + 1) {
                        return (
                          <div
                            ref={upLastElementRef}
                            key={`up-book-${idx}`}
                            className={
                              book.delay_status !== "Delayed"
                                ? "upcoming_details_datewise mb-2"
                                : "completed_details_datewise mb-2"
                            }
                          >
                            <Link
                              to={`/dashboard/guest-details/${book.id}`}
                              style={
                                book.delay_status === "Delayed"
                                  ? { width: "100%", pointerEvents: "none" }
                                  : { width: "100%" }
                              }
                            >
                              <div className="row">
                                <div className="col-md-3">
                                  <p className="font-weight-bold text-dark">
                                    {book.full_name}
                                  </p>
                                  <p>
                                    {book.rooms} - {book.guests} - {book.nights}
                                  </p>
                                </div>
                                <div className="col-md-2 mt-3">
                                  <p className="font-weight-bold">
                                    {book.phone_number}
                                  </p>
                                </div>
                                <div className="col-md-2 mt-1">
                                  <p className="rd_timedate_green">
                                    {book.room_type[0]?.room_type__name}
                                  </p>
                                </div>
                                <div className="col-md-2 mt-1">
                                  {book.paid_with === "Khalti" ? (
                                    <img
                                      className="khalti_logo mt-2"
                                      src={KhaltiLogo}
                                      alt="Khalti"
                                    />
                                  ) : (
                                    <p className="rd_timedate_red">
                                      {book.paid_with}
                                    </p>
                                  )}
                                </div>
                                <div className="col-md-2 mt-1">
                                  <p className="rd_timedate">
                                    NRS. {book.paid_price}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </div>
                        );
                      } else {
                        return (
                          <div
                            key={`up-book-${idx}`}
                            className={
                              book.delay_status !== "Delayed"
                                ? "upcoming_details_datewise mb-2"
                                : "completed_details_datewise mb-2"
                            }
                          >
                            <Link
                              to={`/dashboard/guest-details/${book.id}`}
                              style={
                                book.delay_status === "Delayed"
                                  ? { width: "100%", pointerEvents: "none" }
                                  : { width: "100%" }
                              }
                            >
                              <div className="row">
                                <div className="col-md-3">
                                  <p className="font-weight-bold text-dark">
                                    {book.full_name}
                                  </p>
                                  <p>
                                    {book.rooms} - {book.guests} - {book.nights}
                                  </p>
                                </div>
                                <div className="col-md-2 mt-3">
                                  <p className="font-weight-bold">
                                    {book.phone_number}
                                  </p>
                                </div>
                                <div className="col-md-2 mt-1">
                                  <p className="rd_timedate_green">
                                    {book.room_type[0]?.room_type__name}
                                  </p>
                                </div>
                                <div className="col-md-2 mt-1">
                                  {book.paid_with === "Khalti" ? (
                                    <img
                                      className="khalti_logo mt-2"
                                      src={KhaltiLogo}
                                      alt="Khalti"
                                    />
                                  ) : (
                                    <p className="rd_timedate_red">
                                      {book.paid_with}
                                    </p>
                                  )}
                                </div>
                                <div className="col-md-2 mt-1">
                                  <p className="rd_timedate">
                                    NRS. {book.paid_price}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </div>
                        );
                      }
                    })}
                  </>
                )}
              </div>
            ))
          : !isLoading && (
              <h3 className="d-flex justify-content-center mt120 mb120">
                No upcoming booking!
              </h3>
            )}
      </div>

      <div className={showTabs.inhouse ? "dashboard_wrapper" : "display-none"}>
        <div className="row">
          <div className="col-auto mr-auto">
            <p className="font-weight-bold text-dark font16">In House</p>
          </div>
        </div>
        <hr />

        {inhouse.length > 0
          ? inhouse.map((ih, index) => (
              <div key={`ih-${index}`} className="mb-4">
                {ih.bookings.length > 0 && (
                  <>
                    <div className="mb-3">
                      <span className="font-weight-bold mr-2">{ih.day}:</span>
                      <span className="mt-1">
                        {ih.total_bookings} Bookings
                        <span className="mx-2">|</span>
                        {ih.total_rooms} Rooms
                        <span className="mx-2">|</span>
                        {ih.total_guests} Guests
                      </span>
                    </div>
                    {ih.bookings.map((book, idx) => {
                      if (ih.bookings.length === idx + 1) {
                        return (
                          <div
                            ref={inLastElementRef}
                            key={`ih-book-${idx}`}
                            className="inhouse_details_datewise mb-2"
                          >
                            <Link
                              to={`/dashboard/guest-details/${book.id}`}
                              style={{ width: "100%" }}
                            >
                              <div className="row">
                                <div className="col-md-3">
                                  <p className="font-weight-bold text-dark">
                                    {book.full_name}
                                  </p>
                                  <p>
                                    {book.rooms} - {book.guests} - {book.nights}
                                  </p>
                                </div>
                                <div className="col-md-2 mt-3">
                                  <p className="font-weight-bold">
                                    {book.phone_number}
                                  </p>
                                </div>
                                <div className="col-md-2 mt-1">
                                  <p className="rd_timedate_green">
                                    {book.room_number[0]?.room__room_number}
                                  </p>
                                </div>
                                <div className="col-md-2 mt-1">
                                  {book.paid_with === "Khalti" ? (
                                    <img
                                      className="khalti_logo mt-2"
                                      src={KhaltiLogo}
                                      alt="Khalti"
                                    />
                                  ) : (
                                    <p className="rd_timedate_red">
                                      {book.paid_with}
                                    </p>
                                  )}
                                </div>
                                <div className="col-md-2 mt-1">
                                  <p className="rd_timedate">
                                    NRS. {book.paid_price}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </div>
                        );
                      } else {
                        return (
                          <div
                            key={`ih-book-${idx}`}
                            className="inhouse_details_datewise mb-2"
                          >
                            <Link
                              to={`/dashboard/guest-details/${book.id}`}
                              style={{ width: "100%" }}
                            >
                              <div className="row">
                                <div className="col-md-3">
                                  <p className="font-weight-bold text-dark">
                                    {book.full_name}
                                  </p>
                                  <p>
                                    {book.rooms} - {book.guests} - {book.nights}
                                  </p>
                                </div>
                                <div className="col-md-2 mt-3">
                                  <p className="font-weight-bold">
                                    {book.phone_number}
                                  </p>
                                </div>
                                <div className="col-md-2 mt-1">
                                  <p className="rd_timedate_green">
                                    {book.room_number[0]?.room__room_number}
                                  </p>
                                </div>
                                <div className="col-md-2 mt-1">
                                  {book.paid_with === "Khalti" ? (
                                    <img
                                      className="khalti_logo mt-2"
                                      src={KhaltiLogo}
                                      alt="Khalti"
                                    />
                                  ) : (
                                    <p className="rd_timedate_red">
                                      {book.paid_with}
                                    </p>
                                  )}
                                </div>
                                <div className="col-md-2 mt-1">
                                  <p className="rd_timedate">
                                    NRS. {book.paid_price}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </div>
                        );
                      }
                    })}
                  </>
                )}
              </div>
            ))
          : !isLoading && (
              <h3 className="d-flex justify-content-center mt120 mb120">
                No in house booking!
              </h3>
            )}
      </div>

      <div
        className={showTabs.completed ? "dashboard_wrapper" : "display-none"}
      >
        <div className="row">
          <div className="col-auto mr-auto">
            <p className="font-weight-bold text-dark font16">Completed</p>
          </div>
        </div>
        <hr />

        {completed.length > 0
          ? completed.map((comp, index) => (
              <div key={`comp-${index}`} className="mb-4">
                {comp.bookings.length > 0 && (
                  <>
                    <div className="mb-3">
                      <span className="font-weight-bold mr-2">{comp.day}:</span>
                      <span className="mt-1">
                        {comp.total_bookings} Bookings
                        <span className="mx-2">|</span>
                        {comp.total_rooms} Rooms
                        <span className="mx-2">|</span>
                        {comp.total_guests} Guests
                      </span>
                    </div>
                    {comp.bookings.map((book, idx) => {
                      if (comp.bookings.length === idx + 1) {
                        return (
                          <div
                            ref={cmpLastElementRef}
                            key={`comp-book-${idx}`}
                            className="completed_details_datewise mb-2"
                          >
                            <Link
                              to={`/dashboard/guest-details/${book.id}`}
                              style={{ width: "100%" }}
                            >
                              <div className="row">
                                <div className="col-md-3">
                                  <p className="font-weight-bold text-dark">
                                    {book.full_name}
                                  </p>
                                  <p>
                                    {book.rooms} - {book.guests} - {book.nights}
                                  </p>
                                </div>
                                <div className="col-md-2 mt-3">
                                  <p className="font-weight-bold">
                                    {book.phone_number}
                                  </p>
                                </div>
                                <div className="col-md-2 mt-1">
                                  <p className="rd_timedate_green">
                                    {book.room_type[0]?.room_type__name}
                                  </p>
                                </div>
                                <div className="col-md-2 mt-1">
                                  {book.paid_with === "Khalti" ? (
                                    <img
                                      className="khalti_logo mt-2"
                                      src={KhaltiLogo}
                                      alt="Khalti"
                                    />
                                  ) : (
                                    <p className="rd_timedate_red">
                                      {book.paid_with}
                                    </p>
                                  )}
                                </div>
                                <div className="col-md-2 mt-1">
                                  <p className="rd_timedate">
                                    NRS. {book.paid_price}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </div>
                        );
                      } else {
                        return (
                          <div
                            key={`comp-book-${idx}`}
                            className="completed_details_datewise mb-2"
                          >
                            <Link
                              to={`/dashboard/guest-details/${book.id}`}
                              style={{ width: "100%" }}
                            >
                              <div className="row">
                                <div className="col-md-3">
                                  <p className="font-weight-bold text-dark">
                                    {book.full_name}
                                  </p>
                                  <p>
                                    {book.rooms} - {book.guests} - {book.nights}
                                  </p>
                                </div>
                                <div className="col-md-2 mt-3">
                                  <p className="font-weight-bold">
                                    {book.phone_number}
                                  </p>
                                </div>
                                <div className="col-md-2 mt-1">
                                  <p className="rd_timedate_green">
                                    {book.room_type[0]?.room_type__name}
                                  </p>
                                </div>
                                <div className="col-md-2 mt-1">
                                  {book.paid_with === "Khalti" ? (
                                    <img
                                      className="khalti_logo mt-2"
                                      src={KhaltiLogo}
                                      alt="Khalti"
                                    />
                                  ) : (
                                    <p className="rd_timedate_red">
                                      {book.paid_with}
                                    </p>
                                  )}
                                </div>
                                <div className="col-md-2 mt-1">
                                  <p className="rd_timedate">
                                    NRS. {book.paid_price}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </div>
                        );
                      }
                    })}
                  </>
                )}
              </div>
            ))
          : !isLoading && (
              <h3 className="d-flex justify-content-center mt120 mb120">
                No completed booking!
              </h3>
            )}
      </div>

      <div className={showTabs.canceled ? "dashboard_wrapper" : "display-none"}>
        <div className="row">
          <div className="col-auto mr-auto">
            <p className="font-weight-bold text-dark font16">Canceled</p>
          </div>
        </div>
        <hr />

        {canceled.length > 0
          ? canceled.map((cancel, index) => (
              <div key={`cancel-${index}`} className="mb-4">
                {cancel.bookings.length > 0 && (
                  <>
                    {cancel.day !== null && (
                      <div className="mb-3">
                        <span className="font-weight-bold mr-2">
                          {cancel.day}:
                        </span>
                        <span className="mt-1">
                          {cancel.total_bookings} Bookings
                          <span className="mx-2">|</span>
                          {cancel.total_rooms} Rooms
                          <span className="mx-2">|</span>
                          {cancel.total_guests} Guests
                        </span>
                      </div>
                    )}
                    {cancel.bookings.map((book, idx) => {
                      if (cancel.bookings.length === idx + 1) {
                        return (
                          <div
                            ref={cnlLastElementRef}
                            key={`cancel-book-${idx}`}
                            className="completed_details_datewise mb-2"
                          >
                            <div className="row">
                              <div className="col-md-3">
                                <p className="font-weight-bold text-dark">
                                  {book.full_name}
                                </p>
                                <p>
                                  {book.rooms} - {book.guests} - {book.nights}
                                </p>
                              </div>
                              <div className="col-md-2 mt-3">
                                <p className="font-weight-bold">
                                  {book.phone_number}
                                </p>
                              </div>
                              <div className="col-md-2 mt-1">
                                <p className="rd_timedate_green">
                                  {book.room_type[0]?.room_type__name}
                                </p>
                              </div>
                              <div className="col-md-2 mt-1">
                                {book.paid_with === "Khalti" ? (
                                  <img
                                    className="khalti_logo mt-2"
                                    src={KhaltiLogo}
                                    alt="Khalti"
                                  />
                                ) : (
                                  <p className="rd_timedate_red">
                                    {book.paid_with}
                                  </p>
                                )}
                              </div>
                              <div className="col-md-2 mt-1">
                                <p className="rd_timedate">
                                  NRS. {book.paid_price}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      } else {
                        return (
                          <div
                            key={`cancel-book-${idx}`}
                            className="completed_details_datewise mb-2"
                          >
                            <div className="row">
                              <div className="col-md-3">
                                <p className="font-weight-bold text-dark">
                                  {book.full_name}
                                </p>
                                <p>
                                  {book.rooms} - {book.guests} - {book.nights}
                                </p>
                              </div>
                              <div className="col-md-2 mt-3">
                                <p className="font-weight-bold">
                                  {book.phone_number}
                                </p>
                              </div>
                              <div className="col-md-2 mt-1">
                                <p className="rd_timedate_green">
                                  {book.room_type[0]?.room_type__name}
                                </p>
                              </div>
                              <div className="col-md-2 mt-1">
                                <p className="rd_timedate_red">
                                  {book.paid_with}
                                </p>
                              </div>
                              <div className="col-md-2 mt-1">
                                <p className="rd_timedate">
                                  NRS. {book.paid_price}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </>
                )}
              </div>
            ))
          : !isLoading && (
              <h3 className="d-flex justify-content-center mt120 mb120">
                No cancellation!
              </h3>
            )}
      </div>
      <ContentLoadingPlaceholder isLoading={isLoading} />
    </>
  );
}

export default Bookings;
