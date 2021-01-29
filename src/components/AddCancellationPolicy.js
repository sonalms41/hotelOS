import React, { useState } from "react";

function Modal(props) {
  const [cancelName, setCancelName] = useState("");
  const [penaltyType, setPenaltyType] = useState("Amount");
  const [cancelFrom, setCancelFrom] = useState("");
  const [cancelTo, setCancelTo] = useState("");
  const [penalty, setPenalty] = useState("");
  const [description, setDescription] = useState("");
  const [checked, setChecked] = useState(false);

  const addCancelPolicy = () => {
    const cancelPolicy = {
      cancelName,
      penaltyType,
      cancelFrom,
      cancelTo,
      penalty,
      description,
      checked,
    };
    console.log("Cancel Policy", JSON.stringify(cancelPolicy));
    props.handleCancellationPolicy(cancelPolicy);
    refreshForm();
    props.close();
  };

  const refreshForm = () => {
    cancelName && setCancelName("");
    penaltyType && setPenaltyType("Amount");
    cancelFrom && setCancelFrom("");
    cancelTo && setCancelTo("");
    penalty && setPenalty("");
    description && setDescription("");
  };

  return (
    <div>
      <div
        className="modal-wrapper"
        style={{
          transform: props.show ? "translateY(0vh)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0",
        }}
      >
        <div className="modal-header">
          <h4>Add Cancellation Policy</h4>
          <span className="close-modal-btn" onClick={props.close}>
            ×
          </span>
        </div>
        <div className="modal-body">
          <div className="field-wrapper input">
            <label htmlFor="cancelName">Name</label>
            <input
              id="cancelName"
              type="text"
              value={cancelName}
              className="form-control"
              placeholder="Name"
              onChange={(e) => setCancelName(e.target.value)}
            />
          </div>
          <div className="field-wrapper input">
            <label htmlFor="name">Penalty Type</label>
            <div className="switch-field">
              <input
                type="radio"
                id="radio-one-cancellation-policy"
                name="switch-one-cancellation-policy"
                value="Amount"
                checked={penaltyType === "Amount"}
                onChange={(e) => setPenaltyType(e.target.value)}
              />
              <label htmlFor="radio-one-cancellation-policy">Amount</label>
              <input
                type="radio"
                id="radio-two-cancellation-policy"
                name="switch-one-cancellation-policy"
                value="Percentage"
                checked={penaltyType === "Percentage"}
                onChange={(e) => setPenaltyType(e.target.value)}
              />
              <label htmlFor="radio-two-cancellation-policy">Percentage</label>
            </div>
          </div>
          <div className="cancel-descrip">
            <div className="row">
              <div className="col-md-4">
                <div className="field-wrapper input">
                  <label htmlFor="cancelFrom">From (hr)</label>
                  <input
                    id="cancelFrom"
                    type="number"
                    min={0}
                    value={cancelFrom}
                    className="form-control"
                    placeholder="Start"
                    onChange={(e) => setCancelFrom(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="field-wrapper input">
                  <label htmlFor="cancelTo">To (hr)</label>
                  <input
                    id="cancelTo"
                    type="number"
                    min={0}
                    value={cancelTo}
                    className="form-control"
                    placeholder="End"
                    onChange={(e) => setCancelTo(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="field-wrapper input">
                  <label htmlFor="cancelPenalty">Penalty</label>
                  <input
                    id="cancelPenalty"
                    type="number"
                    min={0}
                    max={penaltyType === "Percentage" && 100}
                    value={penalty}
                    className="form-control"
                    placeholder="0"
                    onChange={(e) => setPenalty(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="field-wrapper input">
                  <label htmlFor="cancelDesc">Description</label>
                  <textarea
                    id="cancelDesc"
                    value={description}
                    className="form-control"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-custom-footer">
          <div className="row">
            <div className="col-auto mr-auto">
              <div className="btn_erado" onClick={props.close}>
                Cancel
              </div>
            </div>
            <div className="col-auto" onClick={addCancelPolicy}>
              <div className="btn_addo">Add</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
