import React from "react";

function Draggable(props) {
  const drag = (e) => {
    const transferData = {
      id: e.target.id,
      room_no: props.roomNumber,
    };
    e.dataTransfer.setData("transfer", JSON.stringify(transferData));
  };

  const noAllowDrop = (e) => e.stopPropagation();

  return (
    <div
      id={props.id}
      className={props.className}
      draggable={props.draggable}
      onDragStart={drag}
      onDragOver={noAllowDrop}
    >
      {props.children}
    </div>
  );
}

export default Draggable;
