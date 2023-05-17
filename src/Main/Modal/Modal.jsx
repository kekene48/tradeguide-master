import React, { useState } from "react";
import "./Modal.scss";
import Modal from "react-overlays/Modal";

const Modale = ({ isOpen, setIsOpen }) => {
  // React state to control Modal visibility
  const [showModal, setShowModal] = useState(false);

  // Backdrop JSX code
  const renderBackdrop = (props) => <div className="backdrop" {...props} />;

  const handleSuccess = () => {
    console.log("success");
  };
  return (
    <div className="modal-example">
      <Modal
        className={`modal ${isOpen ? "blockDisplay" : ""}`}
        show={isOpen}
        onHide={() => setIsOpen(false)}
        renderBackdrop={renderBackdrop}
      >
        <div>
          <div className="modal-header">
            <div className="modal-title">Modal Heading</div>
            <div>
              <span className="close-button" onClick={() => setIsOpen(!isOpen)}>
                x
              </span>
            </div>
          </div>
          <div className="modal-desc">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value="subfee"
                id="subfee"
              />
              <label class="form-check-label" for="subfee">
                $89/month
              </label>
            </div>

            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value="mintnft"
                id="mintnft"
              />
              <label class="form-check-label" for="mintnft">
                Mint NFT
              </label>
            </div>
          </div>
          <div className="modal-footer">
            <button
              className="secondary-button"
              onClick={() => setIsOpen(!isOpen)}
            >
              Close
            </button>
            <button
              className="primary-button"
              onClick={() => setIsOpen(!isOpen)}
            >
              Save Changes
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Modale;
