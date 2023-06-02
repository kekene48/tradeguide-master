import React from "react";
import "./Modal.scss";
import Modal from "react-overlays/Modal";

const Modale = ({ isOpen, setIsOpen }) => {
  // Backdrop JSX code
  const renderBackdrop = (props) => <div className="backdrop" {...props} />;

  const handleSuccess = () => {
    console.log("success");
    setIsOpen(false);
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
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="subfee"
                id="subfee"
                required
              />
              <label className="form-check-label" htmlFor="subfee">
                $89/month
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="mintnft"
                id="mintnft"
              />
              <label className="form-check-label" htmlFor="mintnft">
                Mint NFT
              </label>
            </div>
          </div>
          <div className="modal-footer">
            <button
              className="secondary-button"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
            <button
              type="submit"
              className="primary-button"
              onClick={() => {
                handleSuccess();
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Modale;
