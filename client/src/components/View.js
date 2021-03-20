import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function View(props) {
  // read the info from props, coming from the ancestor component
  const { screen, setScreen } = props;
  // return a stateful value and funcion to update it
  const [data, setData] = useState();
  //
  const [courses, setCourses] = useState("");

  // called when student clicks on Logout button
  // to clear the cookie and set the screen state variable
  // back to its initial state.
  const deleteCookie = async () => {
    try {
      await axios.get("/signout");
      setScreen("auth");
    } catch (e) {
      console.log(e);
    }
  };

  const listCourses = () => {};

  return (
    <div style={{ marginTop: "100px" }} className="container h-100">
      <div className="row h-100 justify-content-center align-items-center">
        <div className="container-md">
          <h1 className="display-2 row"> Hello, {screen}</h1>
          <h2 className="">Welcome to Student Course System</h2>
          <div className="row">
            <div class="col-auto">
              <button
                className="btn btn-primary btn-lg align-bottom"
                onClick={listCourses}
              >
                Courses
              </button>
            </div>
            <div className="col-auto">
              <Link to="/students">
                <button className="btn btn-primary btn-lg align-bottom">
                  Students
                </button>
              </Link>
            </div>
            <div className="col-auto">
              <Link to="/createcourse">
                <button
                  className="btn btn-primary btn-lg align-bottom"
                  onClick={listCourses}
                >
                  Add Course
                </button>
              </Link>
            </div>
            <div className="col-auto">
              <button
                className="btn btn-primary btn-lg align-bottom"
                onClick={deleteCookie}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default View;
