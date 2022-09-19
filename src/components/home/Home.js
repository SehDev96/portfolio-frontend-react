import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import authaxiosinstance from "../../axios/authaxiosinstance";
import * as endpoint from "../../constants/endpoints";
import "./home.css";
import { StatusCodes } from "http-status-codes";
import AppUserInfoCombinedModel from "../../model/AppUserInfoModel";

function Home(props) {
  const navigate = useNavigate();
  const [appUserInfo, setAppUserInfo] = useState(new AppUserInfoCombinedModel());
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    authenticationPage();
  }, []);

  function authenticationPage() {
    let check = localStorage.getItem("access_token");
    if (check !== null) {
      console.log("Authenticated");
    } else {
      console.log("Unauthorized");
      navigate("/");
    }
  }

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const getUserInfo = async () => {
    console.log("Get User Info");
    let res = await authaxiosinstance.get(endpoint.GET_USER_INFO);
    console.log("Res: ", res);
    if ((await res).status === StatusCodes.OK) {
      console.log("Data: ", res.data);
      setAppUserInfo({
        ...appUserInfo,
        fullName: res.data.name,
        username: res.data.username,
        email: res.data.email,
        phone_number: res.data.phone_number,
        state: res.data.state,
        city: res.data.city,
      });
      setShow(true);
    } else {
      alert("Failed to fetch user details. Please login and try again.");
      logout();
    }
  };

  return (
    <div className="home-container">
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Profile Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              disabled={true}
              type="text"
              className="form-control mt-1"
              placeholder="e.g 01234556778"
              value={appUserInfo.name}
            />
          </div>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              disabled={true}
              type="text"
              className="form-control mt-1"
              placeholder="e.g 01234556778"
              value={appUserInfo.username}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email</label>
            <input
              disabled={true}
              type="text"
              className="form-control mt-1"
              placeholder="e.g 01234556778"
              value={appUserInfo.email}
            />
          </div>
          <div className="form-group mt-3">
            <label>Contact Number</label>
            <input
              disabled={true}
              type="text"
              className="form-control mt-1"
              placeholder="e.g 01234556778"
              value={appUserInfo.phone_number}
            />
          </div>
          <div className="form-group mt-3">
            <label>State</label>
            <input
              disabled={true}
              type="text"
              className="form-control mt-1"
              placeholder="e.g Selangor"
              value={appUserInfo.state}
            />
          </div>
          <div className="form-group mt-3">
            <label>City</label>
            <input
              disabled={true}
              type="text"
              className="form-control mt-1"
              placeholder="e.g Subang Jaya"
              value={appUserInfo.city}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          
        </Modal.Footer>
      </Modal>
      <div className="card-container">
        <div className="d-grid gap-2 mt-3">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={getUserInfo}
          >
            My Profile
          </button>
        </div>
        <div className="d-grid gap-2 mt-3">
          <button type="submit" className="btn btn-primary" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
