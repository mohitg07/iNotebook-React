import { Link } from "react-router-dom";
import React from "react";

//In this, I have used ternary operators at many places
const About = () => {
  return (
    <div className="container">
      <main className="p-5">
        <h1 className="text-warning">
          iNotebook - Manage your notes on the cloud
        </h1>
        <p className="fs-6 col-md-8 my-3">
          Quickly and easily manage your personal notes on the cloud. Sign Up to
          iNotebook and easily take notes on the cloud for free. Your notes are
          always secured in our database and without worrying about security
          issues. We do not share your personal information with any third
          party.
        </p>

        <div className="mb-5">
          <Link
            to={!localStorage.getItem("token") ? `/signup` : `/home`}
            className="text-light btn btn-primary px-4"
          >
            {!localStorage.getItem("token") ? "Sign Up Now" : "Your notes"}
          </Link>
        </div>

        <hr className="col-3 col-md-2 mb-5" />

        <div className="row g-5">
          <div className="col-md-6">
            <h2 className="text-warning">Free to Use</h2>
            <p>
              iNotebook is free to use, add free and open source platform to
              take notes on the cloud without worrying about security issues.
            </p>
            <ul className="icon-list">
              <li>
                <Link to={!localStorage.getItem("token") ? "/signup" : "/home"}>
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-6">
            <h2 className="text-warning">Easy to Navigate</h2>
            <p>
              It is a lot easier to navigate through the site and manage your
              notes. You can create, edit, or delete your notes at any time.
            </p>
            <ul className="icon-list">
              <li className="mt-1">
                <Link to={!localStorage.getItem("token") ? `/login` : `/home`}>
                  {!localStorage.getItem("token") ? `Login` : `Home`}
                </Link>
              </li>
              {!localStorage.getItem("token") && (
                <li className="mt-2">
                  <Link to="/signup">Sign Up</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;