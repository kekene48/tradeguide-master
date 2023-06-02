import React, { useState } from "react";
import Sidebar from "../Sidebar";
import Feed from "../../Feeds/Feed";
import Modale from "../Modal/Modal";
import "../../bootstrap.min.css";
import { Modal } from "react-overlays";
import { CiFacebook } from "react-icons/ci";
import { AiOutlineTwitter } from "react-icons/ai";
import { AiFillSkype } from "react-icons/ai";
import "./Profile.scss";
import Input from "../../Feeds/Input";
import Top from "../Top";
import Moralis from "moralis"

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);

  //Set Profile Image and Name
  const [name, setName] = useState("Andy Horwitz");
  const [image, setImage] = useState(
    "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
  );
  // let name = "Andy Horwitz";
  // let image ="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp";

  // React state to control Modal visibility
  const [showModal, setShowModal] = useState(false);

  // Backdrop JSX code
  const renderBackdrop = (props) => <div className="backdrop" {...props} />;

  var handleClose = () => setShowModal(false);

  let Open;

  const handleSubscribe = (e) => {
    setIsOpen(!isOpen);
    setSubOpen(!subOpen);
    Open = subOpen;
    if (Open) {
      e.currentTarget.innerText = "Unsubscribe";
    }

    if (!Open) {
      e.currentTarget.innerText = "Subscribe";
    }
  };

  const saveProfile = async (event) => {
   
  };

  // const handleOnChange = (e) => {
  //   if (e.currentTarget.id === "name") {
  //     setName(e.currentTarget.value);
  //   }
  //   if (e.currentTarget.id === "image") {
  //     image = e.currentTarget.value;
  //   }
  // };

  const handleChange = () => {
    setShowModal(false);
    // console.log(name, image);
  };

  Open = subOpen;

  return (
    <>
      <Top />
      <div style={{ display: "flex" }}>
        <Sidebar
          style={{
            height: document.body.scrollHeight
              ? `${document.body.scrollHeight}px`
              : "",
          }}
        />
        {/* PROFILE STARTS HERE */}
        <div
          className="container py-5 h-100"
          style={{ display: "flex", flexDirection: "column", rowGap: "3rem" }}
        >
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-9 col-xl-7">
              <div className="card">
                <div
                  className="rounded-top text-white d-flex flex-row"
                  style={{ backgroundColor: "#000", height: "200px" }}
                >
                  <div
                    className="ms-4 mt-5 d-flex flex-column"
                    style={{ width: "150px" }}
                  >
                    <img
                      src={image}
                      alt={image}
                      className="img-fluid img-thumbnail mt-4 mb-2"
                      style={{ width: "150px", zIndex: "1" }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowModal(true)}
                      className="btn btn-outline-dark mdbbtn"
                      style={{ zIndex: "1" }}
                    >
                      Edit profile
                    </button>
                    {/* MODAL START */}

                    <Modal
                      className={`modal ${showModal ? "blockDisplay" : ""}`}
                      show={showModal}
                      onHide={handleClose}
                      renderBackdrop={renderBackdrop}
                    >
                      <div>
                        <div className="modal-header">
                          <div className="modal-title">Modal Heading</div>
                          <div>
                            <span
                              className="close-button"
                              onClick={handleClose}
                            >
                              x
                            </span>
                          </div>
                        </div>
                        <div
                          className="modal-desc"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "2rem",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              gap: "1rem",
                              alignItems: "center",
                            }}
                          >
                            <label
                              htmlFor="name"
                              style={{ fontWeight: "bold" }}
                            >
                              Change Name:
                            </label>
                            <input
                              type="text"
                              placeholder="Change Name"
                              id="name"
                              value={name}
                              style={{
                                border: "1px solid black",
                                height: "2.5rem",
                                width: "15rem",
                                borderRadius: "5px",
                              }}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>

                          <div
                            style={{
                              display: "flex",
                              gap: "1rem",
                              alignItems: "center",
                            }}
                          >
                            <label
                              htmlFor="image"
                              style={{ fontWeight: "bold" }}
                            >
                              Change Profile Image:
                            </label>
                            <input
                              type="text"
                              id="image"
                              value={image}
                              placeholder="Enter URL of new Profile Image"
                              style={{
                                border: "1px solid black",
                                height: "2.5rem",
                                width: "15rem",
                                borderRadius: "5px",
                              }}
                              onChange={(e) => setImage(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button
                            className="secondary-button"
                            onClick={handleClose}
                          >
                            Close
                          </button>
                          <button
                            className="primary-button"
                            onClick={handleChange}
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </Modal>

                    {/* MODAL END */}
                  </div>
                  <div className="ms-3" style={{ marginTop: "130px" }}>
                    <h5>{name}</h5>
                    <p>New York</p>
                  </div>
                </div>
                <div
                  className="p-4 text-black"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <div className="d-flex justify-content-end text-center py-1">
                    <div>
                      <p className="mb-1 h5">53</p>
                      <p className="small text-muted mb-0">Posts</p>
                    </div>
                    <div className="px-3">
                      <p className="mb-1 h5">1026</p>
                      <p className="small text-muted mb-0">Subscribers</p>
                    </div>
                    <div>
                      <p className="mb-1 h5">18</p>
                      <p className="small text-muted mb-0">Subscribed</p>
                    </div>
                  </div>
                </div>

                <div className="mb-4 pb-2 socials__container">
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-floating socials"
                  >
                    <CiFacebook />
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-floating socials"
                  >
                    <AiOutlineTwitter />
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-floating socials"
                  >
                    <AiFillSkype />
                  </button>
                </div>
                <div className="buttons">
                  <button
                    type="button"
                    className="btn btn-primary btn-rounded btn-lg"
                    style={{ borderRadius: ".5rem" }}
                  >
                    Message now
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary btn-rounded btn-lg"
                    style={{ borderRadius: ".5rem" }}
                    onClick={(e) => handleSubscribe(e)}
                  >
                    Subscribe
                  </button>
                </div>
                <div className="d-flex justify-content-between text-center mt-5 mb-2 px-5">
                  <div>
                    <p className="mb-2 h5">8471</p>
                    <p className="text-muted mb-0">Wallets Balance</p>
                  </div>
                  <div className="px-3">
                    <p className="mb-2 h5">8512</p>
                    <p className="text-muted mb-0">Income amounts</p>
                  </div>
                  <div>
                    <p className="mb-2 h5">4751</p>
                    <p className="text-muted mb-0">Total Transactions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Input />
          <hr />
        </div>
        {/* PROFILE ENDS HERE */}
      </div>
      {Open ? <Feed /> : ""}
      {isOpen ? <Modale isOpen={isOpen} setIsOpen={setIsOpen} /> : ""}
    </>
  );
};
export default Profile;
