import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./home.css";

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link to="./Site.css" rel="stylesheet" />
          <link to="./home.css" rel="stylesheet" />
          <title>Document</title>
        </head>
        <body>
          <div className="container">
            <Link id="toExams" to="/my-exams">
              <img
                id="SiteLogo"
                src="./AzmoonTrackerLogo.png"
                alt="AzmoonTrackerLogo"
              />
            </Link>
            <h1 id="SiteTitle">
              <Link id="toExams" to="/my-exams">
                Azmoon Tracker
              </Link>
            </h1>
          </div>
          <div className="ad"></div>
          <footer>
            {" "}
            <hr /> © Behdad Alagha{" "}
          </footer>
        </body>
      </React.Fragment>
    );
  }
}

export default Home;
