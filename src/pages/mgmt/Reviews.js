import React, { useEffect, useState } from "react";
import { PROPERTY_ID, USER_TOKEN } from "../../components/LocalStorageInfo";
import CustomSpinner from "../../components/CustomSpinner";

import { ReactComponent as Star } from "../../assets/img/icons/ionic-ios-star.svg";
import { ReactComponent as StarEmpty } from "../../assets/img/icons/ionic-ios-star-empty.svg";

function Reviews() {
  const [propertyId, setPropertyId] = useState(PROPERTY_ID());
  const [userToken, setUserToken] = useState(USER_TOKEN());
  const [isLoading, setIsLoading] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    document.title = `${process.env.REACT_APP_TITLE} - Reviews`;
    const fetchData = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/client/all-reviews/?property_id=${propertyId}`,
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
          console.log("reviews", data);
          if (data.status_code === 200) {
            setReviews(data.result);
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };
    fetchData();
  }, []);

  return (
    <>
      <CustomSpinner isLoading={isLoading} />
      <div className="main_tile">
        <h4 className="heading">Reviews</h4>
      </div>
      <div className="row">
        <div className="col-md-8">
          <div className="dashboard_wrapper">
            {reviews?.map((review, idx) => (
              <React.Fragment key={`review-${idx}`}>
                <div className="d-flex justify-content-start">
                  <div
                    className={`avatar_dropdown_profile bg-color-color${Math.floor(
                      Math.random() * (6 - 1) + 1
                    )} font-weight-bold text-dark text-center`}
                  >
                    {review.full_name[0]}
                    {review.full_name[review.full_name.indexOf(" ") + 1]}
                  </div>
                  <div className="ml-4">
                    <p className="font14 font-weight-bold text-dark">
                      {review.full_name}
                    </p>
                    <p>
                      Post on{" "}
                      <span className="text-success">{review.date}</span>
                    </p>
                    {[...Array(review.star)].map((star, i) => (
                      <Star key={`star-${i}`} />
                    ))}
                    {[...Array(5 - review.star)].map((star, i) => (
                      <StarEmpty key={`star-${i}`} />
                    ))}
                    <p className="mt-2">{review.coment}</p>
                  </div>
                </div>
                <hr />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Reviews;
