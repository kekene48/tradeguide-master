import React from "react";
import ReactPlayer from "react-player/lazy";
import "./Feed.scss";
import "../bootstrap.min.css";

const Feed = () => {
  return (
    <>
      <div className="container mt-4 mb-5">
        <div className="d-flex justify-content-center row">
          <div className="col-md-8">
            <div className="feed p-2">
              <div className="bg-white border mt-2">
                <div>
                  <div className="d-flex flex-row justify-content-between align-items-center p-2 border-bottom">
                    <div className="d-flex flex-row align-items-center feed-text px-2">
                      <img
                        className="rounded-circle mr-4"
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                        width="45"
                      />
                      <div className="d-flex flex-column flex-wrap ml-2">
                        <span className="font-weight-bold">Andy Horwitz</span>
                        <span className="text-black-50 time">
                          40 minutes ago
                        </span>
                      </div>
                    </div>
                    <div className="feed-icon px-2">
                      <i className="fa fa-ellipsis-v text-black-50"></i>
                    </div>
                  </div>
                </div>
                <div className="p-2 px-3">
                  <span>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </span>
                </div>
                <div className="d-flex justify-content-end socials p-2 py-3">
                  <i className="fa fa-thumbs-up"></i>
                  <i className="fa fa-comments-o"></i>
                  <i className="fa fa-share"></i>
                </div>
              </div>
              <div className="bg-white border mt-2">
                <div>
                  <div className="d-flex flex-row justify-content-between align-items-center p-2 border-bottom">
                    <div className="d-flex flex-row align-items-center feed-text px-2">
                      <img
                        className="rounded-circle mr-4"
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                        width="45"
                      />
                      <div className="d-flex flex-column flex-wrap ml-2">
                        <span className="font-weight-bold">Andy Horwitz</span>
                        <span className="text-black-50 time">
                          40 minutes ago
                        </span>
                      </div>
                    </div>
                    <div className="feed-icon px-2">
                      <i className="fa fa-ellipsis-v text-black-50"></i>
                    </div>
                  </div>
                </div>
                <div className="feed-image p-2 px-3">
                  <div className="videoplayer">
                    <ReactPlayer
                      className="img-fluid img-responsive"
                      controls={true}
                      url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-end socials p-2 py-3">
                  <i className="fa fa-thumbs-up"></i>
                  <i className="fa fa-comments-o"></i>
                  <i className="fa fa-share"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feed;
