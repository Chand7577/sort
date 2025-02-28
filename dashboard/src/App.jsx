import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ActivityLogs from "./components/ActivityLogs/ActivityLogs"; // ✅ Import ActivityLogs
import AuthForm from "./components/AuthForm";
import Doc from "./components/Doc";
import DocumentLogs from "./components/DocumentLogs/DocumentLogs";
import MembersList from "./components/MembersList";
import Notifications from "./components/Notification";
import RoleBasedUI from "./components/RoleBasedUI";
import Test from "./components/test";
import UploadForm from "./components/UploadForm";
import Dashboard from "./pages/Dashboard";
const App = () => {
  const [members, setMembers] = useState([]); // Centralized members state

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/upload" element={<UploadForm />} />
        <Route path="/notifications" element={<Notifications />} />

        <Route path="/activity-logs" element={<ActivityLogs />} />{" "}
        {/* ✅ Keep Activity Logs */}
        <Route path="/document-logs" element={<DocumentLogs />} />
        <Route path="/doc" element={<Doc />} />
        <Route
          path="/add-user"
          element={<RoleBasedUI members={members} setMembers={setMembers} />}
        />
        <Route
          path="/members-list"
          element={<MembersList members={members} setMembers={setMembers} />}
        />
        <Route path="/test/:folderName" element={<Test />} />
      </Routes>
    </Router>
  );
};

export default App;
