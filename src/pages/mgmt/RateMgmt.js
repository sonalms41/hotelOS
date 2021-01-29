import React, { useEffect, useState } from "react";
import CustomSpinner from "../../components/CustomSpinner";
import BulkEditRoom from "../../components/BulkEditRoom";
import BulkEditRate from "../../components/BulkEditRate";
import { INIT_DATES } from "../../components/InitializeDate";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function RateMgmt() {
  const [propertyId, setPropertyId] = useState(() => {
    return localStorage.getItem("property-id");
  });
  const [userToken, setUserToken] = useState(() => {
    return localStorage.getItem("con-jwt");
  });
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState(INIT_DATES(Date.now()));
  const [endDate, setEndDate] = useState(
    INIT_DATES(Date.now() + 8 * 24 * 60 * 60 * 1000)
  );
  const [roomType, setRoomType] = useState("");
  const [roomTypeOption, setRoomTypeOption] = useState([]);
  const [roomInfo, setRoomInfo] = useState([]);
  const [basePriceInfo, setBasePriceInfo] = useState([]);
  const [marketInfo, setMarketInfo] = useState([]);
  const [restriction, setRestriction] = useState(false);
  const [market, setMarket] = useState(false);
  const [dateData, setDateData] = useState([]);
  const [sendDateData, setSendDateData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const [roomStatusData, setRoomStatusData] = useState([]);
  const [priceData, setPriceData] = useState([]);
  const [restrictMinData, setRestrictMinData] = useState([]);
  const [restrictMaxData, setRestrictMaxData] = useState([]);
  const [restrictClosedArrival, setRestrictClosedArrival] = useState([]);
  const [restrictClosedDeparture, setRestrictClosedDeparture] = useState([]);
  const [neighbourStatusData, setNeighbourStatusData] = useState([]);
  const [neighbourPriceData, setNeighbourPriceData] = useState([]);
  const [southAsiaStatusData, setSouthAsiaStatusData] = useState([]);
  const [southAsiaPriceData, setSouthAsiaPriceData] = useState([]);
  const [othersStatusData, setOthersStatusData] = useState([]);
  const [othersPriceData, setOthersPriceData] = useState([]);
  const [isBulkEditRoom, setIsBulkEditRoom] = useState(false);
  const [isBulkEditRate, setIsBulkEditRate] = useState(false);
  const [refetchData, setRefetchData] = useState(false);

  useEffect(() => {
    document.title = `${process.env.REACT_APP_TITLE} - Rate Mgmt`;
    const fetchData = async () => {
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/property-subs/?property_id=${propertyId}`,
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
          console.log("data room type", data);
          if (data.status_code === 200) {
            setRoomTypeOption(data.result);
            setRoomType(data.result[0]);
          }
        })
        .catch((error) => console.error(error));
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchDataRoom = async () => {
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/specific-guest-inroom/?property_id=${propertyId}&room_type=${roomType}`,
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
          console.log("data room", data);
          if (data.status_code === 200) {
            setRoomInfo(data.result.number_of_people);
            setBasePriceInfo(data.result.guest_price);
          }
        })
        .catch((error) => console.error(error));
    };

    const fetchMarketInfo = async () => {
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/rate-plan-market/?property_id=${propertyId}&room_type=${roomType}`,
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
          console.log("market info", data);
          if (data.status_code) setMarketInfo(data.result);
        })
        .catch((error) => console.error(error));
    };

    roomType && fetchDataRoom();
    roomType && fetchMarketInfo();
  }, [roomType]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/rate-plan-occupancy/?property_id=${propertyId}&room_type=${roomType}&starting_date=${startDate}&ending_date=${endDate}`,
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
          console.log("data rate", data);
          if (data.status_code === 200) {
            modifyRateData(data.result);
          }
          setIsLoading(false);
        })
        .catch((error) => console.error(error));
    };
    const fetchDataRestriction = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/rate-plan-restriction/?property_id=${propertyId}&room_type=${roomType}&starting_date=${startDate}&ending_date=${endDate}`,
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
          console.log("data rate restriction", data);
          if (data.status_code === 200) {
            modifyRestrictionData(data.result);
          }
          setIsLoading(false);
        })
        .catch((error) => console.error(error));
    };
    const fetchDataMarketNeighbour = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/rate-plan-market-get-neighbour/?property_id=${propertyId}&room_type=${roomType}&starting_date=${startDate}&ending_date=${endDate}`,
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
          console.log("market get neighbour", data);
          if (data.status_code === 200) {
            modifyMarketNeighbourData(data.result);
          }
          setIsLoading(false);
        })
        .catch((error) => console.error(error));
    };
    const fetchDataMarketSouthAsia = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/rate-plan-market-get-south-asia/?property_id=${propertyId}&room_type=${roomType}&starting_date=${startDate}&ending_date=${endDate}`,
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
          console.log("market get south asia", data);
          if (data.status_code === 200) {
            modifyMarketSAData(data.result);
          }
          setIsLoading(false);
        })
        .catch((error) => console.error(error));
    };
    const fetchDataMarketOthers = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/rate-plan-market-get-others/?property_id=${propertyId}&room_type=${roomType}&starting_date=${startDate}&ending_date=${endDate}`,
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
          console.log("market get others", data);
          if (data.status_code === 200) {
            modifyMarketOthersData(data.result);
          }
          setIsLoading(false);
        })
        .catch((error) => console.error(error));
    };

    fetchData();
    fetchDataRestriction();
    fetchDataMarketNeighbour();
    fetchDataMarketSouthAsia();
    fetchDataMarketOthers();
  }, [roomInfo, startDate, endDate, refetchData]);

  const closeBulkEditRoom = () => setIsBulkEditRoom(false);
  const closeBulkEditRate = () => setIsBulkEditRate(false);
  const refetchFunc = () => setRefetchData((prevState) => !prevState);

  const modifyRateData = (data) => {
    let tempDate = [];
    let tempSendDate = [];
    let tempInv = [];
    let tempSts = [];
    data.forEach((d) => {
      const { date, send_date } = d;
      const { inventory, room_status } = d.basic;
      const room_bool_status = room_status === "True";
      tempSts = [...tempSts, room_bool_status];
      tempDate = [...tempDate, date];
      tempSendDate = [...tempSendDate, send_date];
      tempInv = [...tempInv, inventory];
    });
    let tempPrc = [];
    for (let i = 0; i < roomInfo.length; i++) {
      let tempSq = [];
      data.forEach((d) => {
        const { price } = d.guest[i];
        tempSq = [...tempSq, price];
      });
      tempPrc = [...tempPrc, tempSq];
    }
    setDateData(tempDate);
    setSendDateData(tempSendDate);
    setInventoryData(tempInv);
    setRoomStatusData(tempSts);
    setPriceData(tempPrc);
    console.log("prc-->", tempPrc);
  };

  const modifyRestrictionData = (data) => {
    let tempMin = [];
    let tempMax = [];
    let tempCA = [];
    let tempCD = [];
    data.forEach((d) => {
      const {
        min_length_of_stay,
        max_length_of_stay,
        closed_to_arrival,
        closed_to_departure,
      } = d.event;
      tempMin = [...tempMin, min_length_of_stay];
      tempMax = [...tempMax, max_length_of_stay];
      tempCA = [...tempCA, closed_to_arrival];
      tempCD = [...tempCD, closed_to_departure];
    });
    setRestrictMinData(tempMin);
    setRestrictMaxData(tempMax);
    setRestrictClosedArrival(tempCA);
    setRestrictClosedDeparture(tempCD);
  };

  const modifyMarketNeighbourData = (data) => {
    let tempSts = [];
    data.forEach((d) => {
      const { market_status } = d.basic;
      tempSts = [...tempSts, market_status];
    });
    let tempData = [];
    for (let i = 0; i < roomInfo.length; i++) {
      let tempPc = [];
      data.forEach((d) => {
        const { price } = d.guest[i];
        tempPc = [...tempPc, price];
      });
      tempData = [...tempData, tempPc];
    }
    setNeighbourStatusData(tempSts);
    setNeighbourPriceData(tempData);
  };

  const modifyMarketSAData = (data) => {
    let tempSts = [];
    data.forEach((d) => {
      const { market_status } = d.basic;
      tempSts = [...tempSts, market_status];
    });
    let tempData = [];
    for (let i = 0; i < roomInfo.length; i++) {
      let tempPc = [];
      data.forEach((d) => {
        const { price } = d.guest[i];
        tempPc = [...tempPc, price];
      });
      tempData = [...tempData, tempPc];
    }
    setSouthAsiaStatusData(tempSts);
    setSouthAsiaPriceData(tempData);
  };

  const modifyMarketOthersData = (data) => {
    let tempSts = [];
    data.forEach((d) => {
      const { market_status } = d.basic;
      tempSts = [...tempSts, market_status];
    });
    let tempData = [];
    for (let i = 0; i < roomInfo.length; i++) {
      let tempPc = [];
      data.forEach((d) => {
        const { price } = d.guest[i];
        tempPc = [...tempPc, price];
      });
      tempData = [...tempData, tempPc];
    }
    setOthersStatusData(tempSts);
    setOthersPriceData(tempData);
  };

  const handleStatusChange = (e, idx) => {
    let temp = [...roomStatusData];
    temp[idx] = e.target.checked;
    setRoomStatusData(temp);
  };

  const handleInventoryChange = (e, idx) => {
    let temp = [...inventoryData];
    temp[idx] = e.target.value;
    setInventoryData(temp);
  };

  const handleRateChange = (e, li, di) => {
    let temp = [...priceData];
    temp[li][di] = e.target.value;
    setPriceData(temp);
  };

  const handleMinDataChange = (e, idx) => {
    let temp = [...restrictMinData];
    temp[idx] = e.target.value;
    setRestrictMinData(temp);
  };

  const handleMaxDataChange = (e, idx) => {
    let temp = [...restrictMaxData];
    temp[idx] = e.target.value;
    setRestrictMaxData(temp);
  };

  const handleClosedArrivalChange = (e, idx) => {
    let temp = [...restrictClosedArrival];
    temp[idx] = e.target.checked;
    setRestrictClosedArrival(temp);
  };

  const handleClosedDepartureChange = (e, idx) => {
    let temp = [...restrictClosedDeparture];
    temp[idx] = e.target.checked;
    setRestrictClosedDeparture(temp);
  };

  const handleNeighbourStatusChange = (e, idx) => {
    let temp = [...neighbourStatusData];
    temp[idx] = e.target.checked;
    setNeighbourStatusData(temp);
  };

  const handleNeighbourRateChange = (e, li, di) => {
    let temp = [...neighbourPriceData];
    temp[li][di] = e.target.value;
    setNeighbourPriceData(temp);
  };

  const handleSouthAsiaStatusChange = (e, idx) => {
    let temp = [...southAsiaStatusData];
    temp[idx] = e.target.checked;
    setSouthAsiaStatusData(temp);
  };

  const handleSouthAsiaRateChange = (e, li, di) => {
    let temp = [...southAsiaPriceData];
    temp[li][di] = e.target.value;
    setSouthAsiaPriceData(temp);
  };

  const handleOthersStatusChange = (e, idx) => {
    let temp = [...othersStatusData];
    temp[idx] = e.target.checked;
    setOthersStatusData(temp);
  };

  const handleOthersRateChange = (e, li, di) => {
    let temp = [...othersPriceData];
    temp[li][di] = e.target.value;
    setOthersPriceData(temp);
  };

  const confirmSubmit = () => {
    let temp = "";
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h2 className="text-dark mb-2">Please enter your password!</h2>
            <input
              type="password"
              className="form-control mb-2"
              onChange={(e) => (temp = e.target.value)}
            />
            <div className="d-flex justify-content-end">
              <span
                className="btn_addo mr-4"
                onClick={() => {
                  handlePassword(temp);
                  onClose();
                }}
              >
                Yes
              </span>
              <span className="btn_erado" onClick={onClose}>
                No
              </span>
            </div>
          </div>
        );
      },
    });
  };

  const handlePassword = (pass) => {
    const fetchData = async () => {
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/user-validate/`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${userToken}`,
        },
        body: JSON.stringify({
          password: pass,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("password", data);
          if (data.status_code === 200) {
            handleSubmit();
            toast.success(data.message);
          } else toast.error(data.message);
        })
        .catch((error) => console.error(error));
    };
    fetchData();
  };

  const handleSubmit = () => {
    const ratePlan = [];
    const restrictData = [];
    const neighbourData = [];
    const southAsiaData = [];
    const othersData = [];
    for (let i = 0; i < dateData.length; i++) {
      const guest = [];
      for (let j = 0; j < roomInfo.length; j++) {
        const tmp = { no_of_guest: j + 1, price: priceData[j][i] };
        guest.push(tmp);
      }
      const temp = {
        date: sendDateData[i],
        inventory: inventoryData[i],
        room_status: roomStatusData[i],
        guest,
      };
      if (restriction) {
        const tempSq = {
          date_time: sendDateData[i],
          datas: {
            min_length_stay: restrictMinData[i],
            max_length_stay: restrictMaxData[i],
            closed_to_arrival: restrictClosedArrival[i],
            closed_to_departure: restrictClosedDeparture[i],
          },
        };
        restrictData.push(tempSq);
      }
      ratePlan.push(temp);
    }

    if (market) {
      for (let i = 0; i < dateData.length; i++) {
        const guest = [];
        const guestSA = [];
        const guestOt = [];
        for (let j = 0; j < roomInfo.length; j++) {
          const tmp = { no_of_adults: j + 1, price: neighbourPriceData[j][i] };
          const tmpSA = {
            no_of_adults: j + 1,
            price: southAsiaPriceData[j][i],
          };
          const tmpOt = { no_of_adults: j + 1, price: othersPriceData[j][i] };
          guest.push(tmp);
          guestSA.push(tmpSA);
          guestOt.push(tmpOt);
        }
        const temp = {
          date: sendDateData[i],
          market_status: neighbourStatusData[i],
          guest,
        };
        const tempSA = {
          date: sendDateData[i],
          market_status: southAsiaStatusData[i],
          guest: guestSA,
        };
        const tempOt = {
          date: sendDateData[i],
          market_status: othersStatusData[i],
          guest: guestOt,
        };
        neighbourData.push(temp);
        southAsiaData.push(tempSA);
        othersData.push(tempOt);
      }
    }

    const fetchData = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/rate-plan-occupancy/`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${userToken}`,
          },
          body: JSON.stringify({
            property_id: propertyId,
            room_type: roomType,
            rate_plans: ratePlan,
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.status_code === 200) {
            console.log("post rate", data);
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };
    const fetchDataRestriction = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/rate-plan-restriction/`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${userToken}`,
          },
          body: JSON.stringify({
            property_id: propertyId,
            room_type: roomType,
            restriction_plan: restrictData,
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.status_code === 200) {
            console.log("post restriction", data);
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };
    const fetchDataNeighbour = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/rate-plan-market-post-neighbour/`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${userToken}`,
          },
          body: JSON.stringify({
            property_id: propertyId,
            room_type: roomType,
            market_plan: neighbourData,
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.status_code === 200) {
            console.log("post neighbour", data);
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };
    const fetchDataSouthAsia = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/rate-plan-market-post-south-asia/`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${userToken}`,
          },
          body: JSON.stringify({
            property_id: propertyId,
            room_type: roomType,
            market_plan: southAsiaData,
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.status_code === 200) {
            console.log("post south asia", data);
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };
    const fetchDataOthers = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/rate-plan-market-post-others/`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${userToken}`,
          },
          body: JSON.stringify({
            property_id: propertyId,
            room_type: roomType,
            market_plan: othersData,
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.status_code === 200) {
            console.log("post south asia", data);
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };

    fetchData();
    restriction && fetchDataRestriction();
    if (market) {
      fetchDataNeighbour();
      fetchDataSouthAsia();
      fetchDataOthers();
    }
  };

  return (
    <>
      <CustomSpinner isLoading={isLoading} />
      <div className="main_tile">
        <h4 className="heading">Rate Management</h4>
      </div>

      <div className="rate_header_wrap">
        <div className="row font14 mb-3">
          <div className="col-auto">
            <label htmlFor="startDate" className="bulk_edit_label">
              From
            </label>
            <input
              id="startDate"
              type="date"
              className="form-control bulk_edit_date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="col-auto">
            <label htmlFor="endDate" className="bulk_edit_label">
              To
            </label>
            <input
              id="endDate"
              type="date"
              className="form-control bulk_edit_date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="col-auto">
            <input
              type="checkbox"
              id="restrict"
              className="mr-1"
              onChange={() => setRestriction((prevState) => !prevState)}
            />
            <label htmlFor="restrict" className="mr-3">
              Restriction
            </label>
            <input
              type="checkbox"
              id="market"
              className="mr-1"
              onChange={() => setMarket((prevState) => !prevState)}
            />
            <label htmlFor="market" className="mr-3">
              Market
            </label>
          </div>
          <div className="col-auto ml-auto">
            <span className="non_bookable_legend" />
            Non-bookable
            <span className="bookable_legend" />
            Bookable
            <span className="restricted_legend" />
            Restriction
            <span className="non_refundable_legend">N</span>
            Non-refundable
          </div>
        </div>
      </div>

      <div className="rate_table_wrapper font14">
        <div className="rate_tableMenu">
          <div className="mb14">
            <select
              id="room_type"
              className="rate_type_selection"
              onChange={(e) => setRoomType(e.target.value)}
            >
              {roomTypeOption.length > 0 &&
                roomTypeOption.map((rt, idx) => (
                  <option key={`rop-${idx}`}>{rt}</option>
                ))}
            </select>
            <div>
              <span
                className="ml-1 bulkEditToggle"
                onClick={() => setIsBulkEditRoom((prevState) => !prevState)}
              >
                Edit Bulk
              </span>
            </div>
          </div>
          <div className="rate_table_label">
            <div className="rate_table_checkbox_label">
              <div className="row">
                <div className="col">Room Status</div>
                <div className="col float-right">
                  <span
                    className="bulkEditToggle"
                    onClick={() => setIsBulkEditRate((prevState) => !prevState)}
                  >
                    Bulk edit rate
                  </span>
                </div>
              </div>
            </div>
            <div className="rate_table_data_label">
              <div className="row">
                <div className="col">Inventory</div>
                <div className="col float-right">
                  <Link
                    to={`/dashboard/edit-room/${roomType}`}
                    style={{ color: "#6A6FF9", fontSize: "14px" }}
                  >
                    Edit base rate
                  </Link>
                </div>
              </div>
            </div>
            {roomInfo.length > 0 &&
              roomInfo.map((ri, idx) => (
                <div key={`nPeople-${idx}`} className="rate_table_data_label">
                  <span className="mr-5">Rate रू</span>
                  {ri}{" "}
                  <img
                    src={require("../../assets/img/icons/people-black-icon.svg")}
                    alt="People"
                  />
                  <span className="float-right mr-5">
                    रू {basePriceInfo[idx]?.price}
                  </span>
                </div>
              ))}
            {restriction && (
              <div className="restriction_bgc">
                <div className="rate_table_data_label">
                  Minimum Length of Stay
                </div>
                <div className="rate_table_data_label">
                  Maximum Length of Stay
                </div>
                <div className="rate_table_checkbox_label">
                  Closed to arrival
                </div>
                <div className="rate_table_checkbox_label">
                  Closed to departure
                </div>
              </div>
            )}
            {market &&
              marketInfo.length > 0 &&
              marketInfo.map((mi, idx) => (
                <div key={`marketInfo-${idx}`} className="market_bgc">
                  <div className="rate_table_checkbox_label">
                    {mi.market_name}
                  </div>
                  {mi.occ.length > 0 &&
                    mi.occ.map((o, i) => (
                      <div
                        key={`marketOcc-${idx}-${i}`}
                        className="rate_table_data_label"
                      >
                        <span className="mr-5">Rate</span>
                        {o}{" "}
                        <img
                          src={require("../../assets/img/icons/people-black-icon.svg")}
                          alt="People"
                        />
                      </div>
                    ))}
                </div>
              ))}
          </div>
        </div>
        <div className="rate_tableCalendar">
          <div className="rate_table_display">
            <div className="tableheader_calendar">
              {dateData.length > 0 &&
                dateData.map((date, idx) => (
                  <div key={`date-${idx}`} className="rate_table_header">
                    <strong>{date.split(" ")[0]}</strong>
                    <br />
                    {date.split(" ")[1]} {date.split(" ")[2]}
                  </div>
                ))}
            </div>
            <div className="d-flex">
              {roomStatusData.length > 0 &&
                roomStatusData.map((sts, idx) => (
                  <span key={`rstatus-${idx}`} className="rate_table_checkbox">
                    <label>
                      <input
                        type="checkbox"
                        className="check-custom"
                        checked={sts}
                        onChange={(e) => handleStatusChange(e, idx)}
                      />
                      <span className="rate_custom_check" />
                    </label>
                  </span>
                ))}
            </div>
            <div className="d-flex">
              {inventoryData.length > 0 &&
                inventoryData.map((inv, idx) => (
                  <span
                    key={`inv-${idx}`}
                    className={
                      roomStatusData[idx]
                        ? "rate_table_header"
                        : "rate_table_header rate_input_disabled"
                    }
                  >
                    <input
                      min={0}
                      className="rate_input_no_style"
                      value={inv}
                      disabled={!roomStatusData[idx]}
                      onChange={(e) => handleInventoryChange(e, idx)}
                    />
                  </span>
                ))}
            </div>

            {roomInfo.length > 0 &&
              roomInfo.map((ri, idx) => (
                <div key={`rinfo-${idx}`} className="d-flex">
                  {priceData.length === roomInfo.length &&
                    priceData[idx].map((prc, index) => (
                      <span
                        key={`price-${index}`}
                        className={
                          roomStatusData[index]
                            ? "rate_table_header"
                            : "rate_table_header rate_input_disabled"
                        }
                      >
                        <span>
                          {basePriceInfo[idx]?.price !== prc &&
                            basePriceInfo[idx]?.price !== 0 && (
                              <small>
                                {Math.floor(
                                  ((prc - basePriceInfo[idx]?.price) /
                                    basePriceInfo[idx]?.price) *
                                    100
                                )}
                                %
                              </small>
                            )}
                          <span className="ml-4">रू</span>
                        </span>
                        <br />
                        <input
                          min={0}
                          className={
                            basePriceInfo[idx]?.price > prc
                              ? "rate_input_no_style text_main_color"
                              : basePriceInfo[idx]?.price < prc
                              ? "rate_input_no_style text-danger"
                              : "rate_input_no_style"
                          }
                          value={prc}
                          disabled={!roomStatusData[index]}
                          onChange={(e) => handleRateChange(e, idx, index)}
                        />
                      </span>
                    ))}
                </div>
              ))}
            {restriction && (
              <>
                <div className="d-flex">
                  {restrictMinData.length > 0 &&
                    restrictMinData.map((min, idx) => (
                      <span
                        key={`min-${idx}`}
                        className={
                          roomStatusData[idx]
                            ? "rate_table_header rate_table_restriction_mark"
                            : "rate_table_header rate_table_restriction_mark rate_input_disabled"
                        }
                      >
                        <input
                          min={0}
                          className="rate_input_no_style"
                          value={min}
                          disabled={!roomStatusData[idx]}
                          onChange={(e) => handleMinDataChange(e, idx)}
                        />
                      </span>
                    ))}
                </div>
                <div className="d-flex">
                  {restrictMaxData.length > 0 &&
                    restrictMaxData.map((max, idx) => (
                      <span
                        key={`max-${idx}`}
                        className={
                          roomStatusData[idx]
                            ? "rate_table_header rate_table_restriction_mark"
                            : "rate_table_header rate_table_restriction_mark rate_input_disabled"
                        }
                      >
                        <input
                          min={0}
                          className="rate_input_no_style"
                          value={max}
                          disabled={!roomStatusData[idx]}
                          onChange={(e) => handleMaxDataChange(e, idx)}
                        />
                      </span>
                    ))}
                </div>
                <div className="d-flex">
                  {restrictClosedArrival.length > 0 &&
                    restrictClosedArrival.map((sts, idx) => (
                      <span key={`rca-${idx}`} className="rate_table_checkbox">
                        <label>
                          <input
                            type="checkbox"
                            className="check-custom"
                            checked={sts}
                            disabled={!roomStatusData[idx]}
                            onChange={(e) => handleClosedArrivalChange(e, idx)}
                          />
                          <span className="rate_custom_check" />
                        </label>
                      </span>
                    ))}
                </div>
                <div className="d-flex">
                  {restrictClosedDeparture.length > 0 &&
                    restrictClosedDeparture.map((sts, idx) => (
                      <span key={`rcd-${idx}`} className="rate_table_checkbox">
                        <label>
                          <input
                            type="checkbox"
                            className="check-custom"
                            checked={sts}
                            disabled={!roomStatusData[idx]}
                            onChange={(e) =>
                              handleClosedDepartureChange(e, idx)
                            }
                          />
                          <span className="rate_custom_check" />
                        </label>
                      </span>
                    ))}
                </div>
              </>
            )}
            {market && (
              <>
                <div className="d-flex">
                  {neighbourStatusData.length > 0 &&
                    neighbourStatusData.map((sts, idx) => (
                      <span key={`ns-${idx}`} className="rate_table_checkbox">
                        <label>
                          <input
                            type="checkbox"
                            className="check-custom"
                            checked={sts}
                            disabled={!roomStatusData[idx]}
                            onChange={(e) =>
                              handleNeighbourStatusChange(e, idx)
                            }
                          />
                          <span className="rate_custom_check" />
                        </label>
                      </span>
                    ))}
                </div>
                {roomInfo.length > 0 &&
                  roomInfo.map((ri, idx) => (
                    <div key={`rinfoNei-${idx}`} className="d-flex">
                      {neighbourPriceData.length === roomInfo.length &&
                        neighbourPriceData[idx].map((prc, index) => (
                          <span
                            key={`priceNei-${index}`}
                            className={
                              !neighbourStatusData[index] ||
                              !roomStatusData[index]
                                ? "rate_table_header rate_input_disabled"
                                : "rate_table_header"
                            }
                          >
                            <span className="ml-5">$</span>
                            <br />
                            <input
                              min={0}
                              className="rate_input_no_style"
                              value={prc}
                              disabled={
                                !roomStatusData[index] ||
                                !neighbourStatusData[index]
                              }
                              onChange={(e) =>
                                handleNeighbourRateChange(e, idx, index)
                              }
                            />
                          </span>
                        ))}
                    </div>
                  ))}

                <div className="d-flex">
                  {southAsiaStatusData.length > 0 &&
                    southAsiaStatusData.map((sts, idx) => (
                      <span key={`sas-${idx}`} className="rate_table_checkbox">
                        <label>
                          <input
                            type="checkbox"
                            className="check-custom"
                            checked={sts}
                            disabled={!roomStatusData[idx]}
                            onChange={(e) =>
                              handleSouthAsiaStatusChange(e, idx)
                            }
                          />
                          <span className="rate_custom_check" />
                        </label>
                      </span>
                    ))}
                </div>
                {roomInfo.length > 0 &&
                  roomInfo.map((ri, idx) => (
                    <div key={`rinfoSA-${idx}`} className="d-flex">
                      {southAsiaPriceData.length === roomInfo.length &&
                        southAsiaPriceData[idx].map((prc, index) => (
                          <span
                            key={`priceSA-${index}`}
                            className={
                              !roomStatusData[index] ||
                              !southAsiaStatusData[index]
                                ? "rate_table_header rate_input_disabled"
                                : "rate_table_header"
                            }
                          >
                            <span className="ml-5">$</span>
                            <br />
                            <input
                              min={0}
                              className="rate_input_no_style"
                              value={prc}
                              disabled={
                                !roomStatusData[index] ||
                                !southAsiaStatusData[index]
                              }
                              onChange={(e) =>
                                handleSouthAsiaRateChange(e, idx, index)
                              }
                            />
                          </span>
                        ))}
                    </div>
                  ))}

                <div className="d-flex">
                  {othersStatusData.length > 0 &&
                    othersStatusData.map((sts, idx) => (
                      <span
                        key={`othersts-${idx}`}
                        className="rate_table_checkbox"
                      >
                        <label>
                          <input
                            type="checkbox"
                            className="check-custom"
                            checked={sts}
                            disabled={!roomStatusData[idx]}
                            onChange={(e) => handleOthersStatusChange(e, idx)}
                          />
                          <span className="rate_custom_check" />
                        </label>
                      </span>
                    ))}
                </div>
                {roomInfo.length > 0 &&
                  roomInfo.map((ri, idx) => (
                    <div key={`rinfoOthers-${idx}`} className="d-flex">
                      {othersPriceData.length === roomInfo.length &&
                        othersPriceData[idx].map((prc, index) => (
                          <span
                            key={`priceOthers-${index}`}
                            className={
                              !roomStatusData[index] || !othersStatusData[index]
                                ? "rate_table_header rate_input_disabled"
                                : "rate_table_header"
                            }
                          >
                            <span className="ml-5">$</span>
                            <br />
                            <input
                              min={0}
                              className="rate_input_no_style"
                              value={prc}
                              disabled={
                                !roomStatusData[index] ||
                                !othersStatusData[index]
                              }
                              onChange={(e) =>
                                handleOthersRateChange(e, idx, index)
                              }
                            />
                          </span>
                        ))}
                    </div>
                  ))}
              </>
            )}
          </div>
        </div>
      </div>

      <span className="mt-3 btn_addo" onClick={confirmSubmit}>
        Submit
      </span>

      <BulkEditRoom
        className="modal"
        show={isBulkEditRoom}
        close={closeBulkEditRoom}
        roomType={roomType}
        days={DAYS}
        refetch={refetchFunc}
      />
      <BulkEditRate
        className="modal"
        show={isBulkEditRate}
        close={closeBulkEditRate}
        roomType={roomType}
        days={DAYS}
        market={market}
        refetch={refetchFunc}
      />
    </>
  );
}

export default RateMgmt;
