import React, { useEffect, useRef, useState } from "react";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import HeaderMain from "../components/HeaderMain";
import Sidebar, { INIT_PAGES } from "../components/Sidebar";
import Footer from "../components/Footer";
import CustomSpinner from "../components/CustomSpinner";
import { adminStatus } from "../components/utility/localStorage";
import ConnectingImageGallery from "../components/utility/ConnectingImageGallery";
import propertyServices from "../components/admin/adminServices/property";
import {
  PROPERTY_ID,
  USER_ID,
  USER_TOKEN,
} from "../components/LocalStorageInfo";
import { confirmAlert } from "react-confirm-alert";

function Photos(props) {
  const hasMount = useRef(false);
  const [propertyId, setPropertyId] = useState(PROPERTY_ID());
  const [userToken, setUserToken] = useState(USER_TOKEN());
  const [userId, setUserId] = useState(USER_ID());
  const [isLoading, setIsLoading] = useState(true);
  const [photos, setPhotos] = useState([]);
  const [photosDB, setPhotosDB] = useState([]);
  const [photoGallery, setPhotoGallery] = useState({
    data: [],
    errors: "",
  });
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryUpdate, setGalleryUpdate] = useState(false);
  const [photoFiles, setPhotoFiles] = useState([]);
  const [roomTypeOption, setRoomTypeOption] = useState([]);
  const [roomType, setRoomType] = useState([]);
  const [tag, setTag] = useState([]);
  const [refetchData, setRefetchData] = useState(false);
  const [loginWarning, setLoginWarning] = useState("");
  const [pageState, setPageState] = useState(null);
  const [prevPage, setPrevPage] = useState(false);
  const [nextPage, setNextPage] = useState(false);

  useEffect(() => {
    document.title = "Photos";
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

    const fetchDataRT = async () => {
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/add-room-type/?property_id=${propertyId}`,
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
            const temp = data.result.room_type;
            temp.forEach((r) =>
              setRoomTypeOption((prevState) => [...prevState, r.room_type_name])
            );
          }
        })
        .catch((error) => console.error(error));
    };

    sendSession();
    fetchDataRT();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/image-adder/?property_id=${propertyId}`,
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
            setPhotosDB(data.result.property_images);
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };
    fetchData();
  }, [refetchData]);

  useEffect(() => {
    propertyServices.get
      .photos(propertyId)
      .then((response) => {
        const images = response.data.result.property_images;
        const arrTags = [];
        const arrRoomTypes = [];

        for (let i = 0; i < images.length; i++) {
          if (!arrTags.includes(images[i].tags)) {
            const tempRoomTypeObj = {
              tags: images[i].tags,
              images: [],
            };
            arrTags.push(images[i].tags);
            for (let j = 0; j < images.length; j++) {
              if (images[i].tags == images[j].tags) {
                tempRoomTypeObj.images.push(images[j].image);
              }
            }
            arrRoomTypes.push(tempRoomTypeObj);
          }
        }
        setPhotoGallery({ data: arrRoomTypes });
      })
      .catch((errors) => {
        setPhotoGallery({ errors: `${errors}` });
      });
  }, [galleryUpdate]);

  useEffect(() => {
    if (!hasMount.current) {
      hasMount.current = true;
      return;
    }
    handleSubmit();
  }, [props.submit]);

  const handlePrevPage = () => setPrevPage(true);

  const handleUpload = (e) => {
    let imageLinks = [...photos];
    let imageFiles = [...photoFiles];
    for (let i = 0; i < e.target.files.length; i++) {
      console.log("-->", e.target.files[i]);
      if (
        e.target.files[i].type === "image/png" ||
        e.target.files[i].type === "image/jpeg"
      ) {
        if (e.target.files[i].size < 10000000) {
          imageLinks.push(URL.createObjectURL(e.target.files[i]));
          imageFiles.push(e.target.files[i]);
        } else toast.error("Please upload image of size less than 10MB!");
      } else toast.error("Unsupported Type!");
    }
    console.log("photo array", e.target.files);
    console.log("image files", imageFiles);
    imageLinks.length && setPhotos(imageLinks);
    imageLinks.length && setPhotoFiles(imageFiles);
  };

  const handleRoomTypeChange = (e, index) => {
    const updatedData = [...roomType];
    updatedData[index] = e.target.value;
    setRoomType(updatedData);
  };

  const handleTagChange = (e, index) => {
    const updatedData = [...tag];
    updatedData[index] = e.target.value;
    setTag(updatedData);
  };

  const updateRoomTypeChange = (e, index) => {
    const updatedData = [...photosDB];
    updatedData[index].room_tags = e.target.value;
    setPhotosDB(updatedData);
  };

  const updateTagChange = (e, index) => {
    const updatedData = [...photosDB];
    updatedData[index].tags = e.target.value;
    setPhotosDB(updatedData);
  };

  const confirmSubmit = (id) => {
    confirmAlert({
      title: "Are you sure to do this?",
      buttons: [
        {
          label: "Yes",
          onClick: () => handlePhotoDelete(id),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const handlePhotoDelete = (id) => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/del-image/`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${userToken}`,
        },
        body: JSON.stringify({
          property_id: propertyId,
          photo_id: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data delete", data);
          if (data.status_code === 200) {
            setRefetchData((prevState) => !prevState);
            setGalleryUpdate((prevState) => !prevState);
            toast.success(data.message);
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };
    fetchData();
  };

  const handleSubmit = () => {
    setLoginWarning("");

    const updateData = async () => {
      setIsLoading(true);
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/image-update/`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${userToken}`,
        },
        body: JSON.stringify({
          property_id: propertyId,
          image_array: photosDB,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data", data);
          if (data.status_code === 200) {
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };
    photosDB.length > 0 && updateData();

    if (photos.length > 0 && roomType.length > 0 && tag.length > 0) {
      const sendSession = async () => {
        await fetch(`${process.env.REACT_APP_API_BASE_URL}/user-session/`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${userToken}`,
          },
          body: JSON.stringify({
            user_id: userId,
            page_name: INIT_PAGES.photos,
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
        photoFiles.forEach((photo) => formBody.append("photos", photo));
        tag.forEach((t) => formBody.append("tags", t));
        roomType.forEach((rt) => formBody.append("room_type", rt));
        await fetch(`${process.env.REACT_APP_API_BASE_URL}/image-adder/`, {
          method: "post",
          headers: {
            Authorization: `Token ${userToken}`,
          },
          body: formBody,
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("data", data);
            if (data.status_code === 200) {
              sendSession();
              setIsLoading(false);
              setRefetchData((prevState) => !prevState);
              setGalleryUpdate((prevState) => !prevState);
              setPhotos([]);
              setPhotoFiles([]);
              setNextPage(true);
            }
          })
          .catch((error) => console.error(error));
      };
      fetchData();
    } else {
      setLoginWarning("Field required!");
      photosDB.length > 0 && setNextPage(true);
    }
  };

  if (!userToken) return <Redirect to={"./"} />;
  else if (prevPage)
    return (
      <Redirect
        to={adminStatus() ? "/admin-property/add/room-type" : "./room-type"}
      />
    );
  else if (!props.dashboard && nextPage)
    return (
      <Redirect
        to={adminStatus() ? "/admin-property/add/policies" : "./policies"}
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
                  currentPage={INIT_PAGES.photos}
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
                            <h4 className="heading">Photos</h4>
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
                              <div className="drag-drop-area">
                                <input
                                  type="file"
                                  multiple
                                  accept="image/*"
                                  onChange={handleUpload}
                                />
                              </div>
                              <div className="text-center my-5">
                                <p>Drag & Drop Photos</p>
                                <p className="small">
                                  Upload recommendation size is 10 MB
                                </p>
                              </div>
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
                              <div className="row">
                                <div className="col-auto sub-heading">
                                  <h5 className="heading">Photos</h5>
                                </div>
                                <div className="col-auto ml-auto font14 text-success">
                                  <span
                                    className="cursorPointer"
                                    onClick={() =>
                                      setGalleryOpen((prevState) => !prevState)
                                    }
                                  >
                                    {!galleryOpen ? "Show" : "Hide"} Gallery
                                  </span>
                                </div>
                              </div>
                            </div>
                            {photos &&
                              photos.map((photo, index) => {
                                return (
                                  <div
                                    key={`photo-${index}`}
                                    className="col-md-3 mt-4"
                                  >
                                    <div className="card">
                                      <img
                                        className="card-img-top photoWidthHeight"
                                        src={photo}
                                        alt="Card image cap"
                                      />
                                      <div className="card-body">
                                        <div className="field-wrapper input">
                                          <label htmlFor="roomType">
                                            Room Type
                                          </label>
                                          <select
                                            id="roomType"
                                            className={
                                              !roomType[index] && loginWarning
                                                ? "form-control error-input"
                                                : "form-control"
                                            }
                                            onChange={(e) =>
                                              handleRoomTypeChange(e, index)
                                            }
                                          >
                                            <option selected disabled>
                                              Select Room Type
                                            </option>
                                            <option>None</option>
                                            {roomTypeOption.length > 0 &&
                                              roomTypeOption.map((rt, idx) => (
                                                <option key={`rop-${idx}`}>
                                                  {rt}
                                                </option>
                                              ))}
                                          </select>
                                          <p
                                            className={
                                              !roomType[index] && loginWarning
                                                ? "text-danger"
                                                : "display-none"
                                            }
                                          >
                                            {loginWarning}
                                          </p>
                                        </div>

                                        <div className="field-wrapper input">
                                          <label htmlFor="tag">Tag</label>
                                          <select
                                            id="tag"
                                            className={
                                              !tag[index] && loginWarning
                                                ? "form-control error-input"
                                                : "form-control"
                                            }
                                            onChange={(e) =>
                                              handleTagChange(e, index)
                                            }
                                          >
                                            <option selected disabled>
                                              Select Tag
                                            </option>
                                            <option>Bedroom</option>
                                            <option>Balcony</option>
                                            <option>Front Lawn</option>
                                            <option>Backyard</option>
                                          </select>
                                          <p
                                            className={
                                              !tag[index] && loginWarning
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
                                );
                              })}

                            {photosDB.length > 0 &&
                              photosDB.map((photo, index) => {
                                return (
                                  <div
                                    key={`photoDB-${index}`}
                                    className="col-md-3 mt-4"
                                  >
                                    <div className="card">
                                      <img
                                        className="card-img-top photoWidthHeight"
                                        src={`${process.env.REACT_APP_API_BASE_URL}${photo.image}`}
                                        alt="Card image cap"
                                      />
                                      <img
                                        className="photoDeleteBtn cursorPointer"
                                        src={require("../assets/img/icons/icon-material-delete-sweep.svg")}
                                        alt="Delete"
                                        onClick={() => confirmSubmit(photo.id)}
                                      />
                                      <div className="card-body">
                                        <div className="field-wrapper input">
                                          <label htmlFor="roomType">
                                            Room Type
                                          </label>
                                          <select
                                            id="roomType"
                                            value={photo.room_tags || ""}
                                            className={
                                              !photo.room_tags && loginWarning
                                                ? "form-control error-input"
                                                : "form-control"
                                            }
                                            onChange={(e) =>
                                              updateRoomTypeChange(e, index)
                                            }
                                          >
                                            <option>None</option>
                                            {roomTypeOption.length > 0 &&
                                              roomTypeOption.map((rt, idx) => (
                                                <option key={`rop-${idx}`}>
                                                  {rt}
                                                </option>
                                              ))}
                                          </select>
                                        </div>

                                        <div className="field-wrapper input">
                                          <label htmlFor="tag">Tag</label>
                                          <select
                                            id="tag"
                                            value={photo.tags}
                                            className={
                                              !photo.tags && loginWarning
                                                ? "form-control error-input"
                                                : "form-control"
                                            }
                                            onChange={(e) =>
                                              updateTagChange(e, index)
                                            }
                                          >
                                            <option>Bedroom</option>
                                            <option>Balcony</option>
                                            <option>Front Lawn</option>
                                            <option>Backyard</option>
                                          </select>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
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
              nPage={5}
              handlePrevPage={handlePrevPage}
              handleSubmit={handleSubmit}
            />
          )}
          {/* End Footer Nav */}
        </div>
        {galleryOpen && (
          <div className="admin-image-gallery">
            <ConnectingImageGallery
              propertyId={propertyId}
              showIndex={true}
              slideOnThumbnailOver={false}
              infinite={true}
              images={photoGallery.data}
              galleryTitle="Property Photo Gallery"
              galleryClassName=""
              autoPlay={false}
              startIndex={0}
              showPlayButton={false}
              closeGallery={() => setGalleryOpen(false)}
              initialTabIndex={0}
              startThumbnailIndex={0}
            />
          </div>
        )}
      </>
    );
}

export default Photos;
