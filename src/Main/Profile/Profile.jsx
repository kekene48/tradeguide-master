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
import Moralis from "moralis";
import { useParams } from "react-router-dom";
//import fs from "fs";
import { useTradeGuideContext } from "../../request/provider";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);

  //Set Profile Image and Name
  const [name, setName] = useState("Andy Horwitz");
  const [image, setImage] = useState();
  const [faceBook, setFaceBook] = useState("https://www.facebook.com");
  const [twitter, setTwitter] = useState("https://www.twitter.com");
  const [skype, setSkype] = useState("https://www.skype.com");
  const [location, setLocation] = useState("New York");

  // React state to control Modal visibility
  const [showModal, setShowModal] = useState(false);
  const [start, setStart] = useState(true);
  const { id } = useParams();

  //const { setProfile, getProfile } = useTradeGuideContext();

  // Backdrop JSX code
  const renderBackdrop = (props) => <div className="backdrop" {...props} />;

  var handleClose = () => setShowModal(false);

  const defImage =
    "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp";
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
  const moralis = async () => {
    try {
      if (start) {
        await Moralis.start({
          apiKey: process.env.REACT_APP_MORALIS_API,
        });

        setStart(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uploadDoc = async (file) => {
    moralis();

    const uploadArray = [
      {
        path: file.name,
        content: file,  //fs.readFile(file, { encoding: "base64" }),
      },
    ];

    const response = Moralis.EvmApi.ipfs.uploadFolder({
      abi: uploadArray,
    });
    console.log((await response).result);
    const cid = (await response).result[0].path;
    //saveFiles(cid);
  };

  const saveFiles = async (imageLink) => {
    const uploadArray = [
      {
        path: "userInfo.json",
        content: {
          name: name,
          image: imageLink,
          location: location,
          social_Media: {
            faceBook: faceBook,
            twitter: twitter,
            skype: skype,
          },
        },
      },
    ];
    const response = await Moralis.EvmApi.ipfs.uploadFolder({
      abi: uploadArray,
    });

    console.log((await response).result);
    const cid = (await response).result[0].path;
    //await setProfile(cid);
  };

  const getFiles = async () => {
    //const url = await getProfile(id);
    //const res = await fetch(url)
    //console.log(res[0])
  };

  const handleChange = () => {
    setShowModal(false);
    uploadDoc(image);
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
                    {image != undefined ? (
                      <img  />
                    ) : (
                      <img
                        src={defImage}
                        alt="default"
                        className="img-fluid img-thumbnail mt-4 mb-2"
                        style={{ width: "150px", zIndex: "1" }}
                      />
                    )}

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
                            gap: "1rem",
                            alignItems: "flex-start",
                            paddingLeft: "7rem",
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
                              htmlFor="file"
                              style={{ fontWeight: "bold" }}
                            >
                              Change Profile Image:
                            </label>
                            <input
                              type="file"
                              id="file"
                              placeholder="Enter URL of new Profile Image"
                              style={{
                                border: "1px solid black",
                                height: "2.5rem",
                                width: "15rem",
                                borderRadius: "5px",
                              }}
                              onChange={(e) => {
                                setImage(e.target.files[0]);
                                console.log(e.target.files[0]);
                              }}
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
                              htmlFor="facebook"
                              style={{ fontWeight: "bold" }}
                            >
                              Change Facebook Link:
                            </label>
                            <input
                              type="text"
                              placeholder="Change Name"
                              id="facebook"
                              value={faceBook}
                              style={{
                                border: "1px solid black",
                                height: "2.5rem",
                                width: "15rem",
                                borderRadius: "5px",
                              }}
                              onChange={(e) => setFaceBook(e.target.value)}
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
                              htmlFor="twitter"
                              style={{ fontWeight: "bold" }}
                            >
                              Change Twitter Link:
                            </label>
                            <input
                              type="text"
                              placeholder="Change Name"
                              id="twitter"
                              value={twitter}
                              style={{
                                border: "1px solid black",
                                height: "2.5rem",
                                width: "15rem",
                                borderRadius: "5px",
                              }}
                              onChange={(e) => setTwitter(e.target.value)}
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
                              htmlFor="skype"
                              style={{ fontWeight: "bold" }}
                            >
                              Change Skype Link:
                            </label>
                            <input
                              type="text"
                              placeholder="Change Name"
                              id="skype"
                              value={skype}
                              style={{
                                border: "1px solid black",
                                height: "2.5rem",
                                width: "15rem",
                                borderRadius: "5px",
                              }}
                              onChange={(e) => setSkype(e.target.value)}
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
                              htmlFor="location"
                              style={{ fontWeight: "bold" }}
                            >
                              Change Location:
                            </label>
                            <input
                              type="text"
                              placeholder="Change Location"
                              id="location"
                              value={location}
                              style={{
                                border: "1px solid black",
                                height: "2.5rem",
                                width: "15rem",
                                borderRadius: "5px",
                              }}
                              onChange={(e) => setLocation(e.target.value)}
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
                    <p>{location}</p>
                  </div>
                  <div
                    className="w-50 text-center"
                    style={{
                      marginLeft: "auto",
                      marginRight: "2rem",
                    }}
                  >
                    <h5
                      className="w-50 text-center"
                      style={{
                        // margin: "auto 3rem 5rem auto",
                        position: "relative",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        minWidth: "100%",
                      }}
                    >
                      Trader for almost 7 years, 500+ complete Trades. Sure
                      crypto signals. Iusto quod libero maiores porro pariatur
                      alias, exercitationem repellendus tempore.
                    </h5>
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
                    <a
                      style={{ color: "blue" }}
                      href={faceBook}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <CiFacebook />
                    </a>
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-floating socials"
                  >
                    <a
                      style={{ color: "blue" }}
                      href={twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <AiOutlineTwitter />
                    </a>
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-floating socials"
                  >
                    <a
                      style={{ color: "blue" }}
                      href={skype}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <AiFillSkype />
                    </a>
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
      {Open ? <Feed id={id} /> : ""}
      {isOpen ? <Modale isOpen={isOpen} setIsOpen={setIsOpen} /> : ""}
    </>
  );
};
export default Profile;
