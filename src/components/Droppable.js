import React from "react";

function Droppable(props) {
  const drop = (e) => {
    e.preventDefault();
    const transferred = JSON.parse(e.dataTransfer.getData("transfer"));
    const card = document.getElementById(transferred.id);
    card.style.display = "block";
    e.target.appendChild(card);

    const fetchData = async () => {
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/room-update/`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("con-jwt")}`,
        },
        body: JSON.stringify({
          property_id: localStorage.getItem("property-id"),
          room_type: props.roomType,
          room_number: transferred.room_no,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status_code === 200) console.log("data", data);
        })
        .catch((error) => console.error(error));
    };
    fetchData();
  };

  const allowDrop = (e) => e.preventDefault();

  return (
    <div
      id={props.id}
      className={props.className}
      onDrop={drop}
      onDragOver={allowDrop}
    >
      {props.children}
    </div>
  );
}

export default Droppable;
