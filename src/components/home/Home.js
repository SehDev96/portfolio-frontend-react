import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./home.css"

function Home(props) {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);
  useEffect(() => {
    authenticationPage();
  }, []);

  function authenticationPage() {
    let check = localStorage.getItem("access_token");
    if (check !== null) {
      console.log("Authenticated");
      setAuthorized(true);
    } else {
      console.log("Unauthorized");
      setAuthorized(false);
    }
  }

  const logout = () => {
    localStorage.clear();
    setAuthorized(false);
  };

  return (
    <div className="home-container">
      {authorized ? (
        <div className="card-container">
          <p>HomePage</p>
          <div>
            <button type="submit" className="btn btn-primary" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      ) : (
        navigate("/")
      )}
    </div>
  );
}

export default Home;
