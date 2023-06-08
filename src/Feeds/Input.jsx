import React, { useState } from "react";
import "../bootstrap.min.css";
import "./Input.scss";
import { BsFillFileImageFill } from "react-icons/bs";

const Input = ({ handlePost, uploadPost }) => {
  const [desc, setDesc] = useState("");
  const [fileObject, setFileObject] = useState();

  return (
    <>
      <div className="container contain">
        <input
          type="text"
          placeholder="Enter Post"
          className="w-75"
          onChange={(e) => setDesc(e.target.value)}
        />
        <input
          type="file"
          placeholder="Enter Post"
          className="w-75"
          onChange={(e) => setFileObject(e.target.files[0])}
        />

        <button
          type="button"
          className="btn btn-primary btn-rounded btn-lg buttn"
          style={{ borderRadius: ".5rem" }}
          onClick={() => handlePost(fileObject, desc)}
        >
          Post
        </button>
      </div>
    </>
  );
};

export default Input;
