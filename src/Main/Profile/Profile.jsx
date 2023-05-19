import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import Feed from "../../Feeds/Feed";
import Modale from "../Modal/Modal";
import "../../bootstrap.min.css";
import { CiFacebook } from "react-icons/ci";
import { AiOutlineTwitter } from "react-icons/ai";
import { AiFillSkype } from "react-icons/ai";
import "./Profile.scss";
import Input from "../../Feeds/Input";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  let Open;
  const handleSubscribe = (e) => {
    setIsOpen(!isOpen);
    Open = !isOpen;
    if (Open) {
      e.currentTarget.innerText = "Unsubscribe";
    }

    if (!Open) {
      e.currentTarget.innerText = "Subscribe";
    }
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <Sidebar />
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
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                      alt="Generic placeholder image"
                      className="img-fluid img-thumbnail mt-4 mb-2"
                      style={{ width: "150px", zIndex: "1" }}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-dark"
                      data-mdb-ripple-color="dark"
                      style={{ zIndex: "1" }}
                    >
                      Edit profile
                    </button>
                  </div>
                  <div className="ms-3" style={{ marginTop: "130px" }}>
                    <h5>Andy Horwitz</h5>
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
      {isOpen ? <Feed isOpen={isOpen} /> : ""}
      {isOpen ? <Modale isOpen={isOpen} setIsOpen={setIsOpen} /> : ""}
    </>
  );
};

export default Profile;
