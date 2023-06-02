import React, { useState } from "react";
import "../bootstrap.min.css";
import "./Input.scss";
import { BsFillFileImageFill } from "react-icons/bs";

const Input = () => {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = (inputType) => {
    setIsClicked((prevState) => !prevState);
    return <input type={inputType} className="w-75" />;
  };
  return (
    <>
      <div className="container contain">
        <input
          type={`${isClicked ? "file" : "text"}`}
          placeholder="Enter Post"
          className="w-75"
        />
        <BsFillFileImageFill
          className="input-image"
          onClick={() => handleClick("file")}
        />
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
