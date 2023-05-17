import React from "react";
import "../bootstrap.min.css";
import "./Input.scss";

const Input = () => {
  return (
    <>
      <div className="container contain">
        <input type="text" placeholder="Enter Post" className="w-75" />
        <button
          type="button"
          className="btn btn-primary btn-rounded btn-lg buttn"
          style={{ borderRadius: ".5rem" }}
        >
          Post
        </button>
      </div>
    </>
  );
};

export default Input;
