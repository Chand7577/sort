import React from "react";
import { Link } from "react-router-dom"; // ✅ Import Link for navigation

function Sidebar() {
  return (
    <div
      className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary vh-100 fs-5"
      style={{ width: "300px" }}
    >
      <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link
              className="nav-link d-flex align-items-center gap-2 active"
              to="/dashboard"
            >
              <i className="bi bi-house-fill"></i>
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link d-flex align-items-center gap-2" to="#">
              <i className="bi bi-chat-left"></i>
              Messages
            </Link>
          </li>
          <li className="nav-item">
           <li className="nav-item">
                        <Link className="nav-link d-flex align-items-center gap-2" to="/notifications">
                          <i className="bi bi-app-indicator"></i>
                          Notifications
                        </Link>
                    </li>
          </li>
          <li className="nav-item">
            <Link className="nav-link d-flex align-items-center gap-2" to="#">
              <i className="bi bi-person-fill"></i>
              Profile
            </Link>
          </li>
          {/* ✅ User Activity Log Button with Link */}
          <li className="nav-item">
            <Link
              className="nav-link d-flex align-items-center gap-2"
              to="/activity-logs"
            >
              <i className="bi bi-list-check"></i>
              User Activity Log
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link d-flex align-items-center gap-2"
              to="/document-logs"
            >
              <i className="bi bi-list-check"></i>
              Document Log
            </Link>
          </li>
        </ul>

        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase"></h6>

        <hr className="my-3" />

        <ul className="nav flex-column mb-auto">
          <li className="nav-item">
            <Link className="nav-link d-flex align-items-center gap-2" to="#">
              <i className="bi bi-gear-wide-connected"></i>
              Settings
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link d-flex align-items-center gap-2"
              to="/doc"
            >
              <i class="bi bi-file-earmark-medical"></i>
              My Documents
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link d-flex align-items-center gap-2" to="#">
              <i className="bi bi-door-closed"></i>
              Sign out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
