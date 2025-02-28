import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import filesFoldersData from "../../folderFilesData"; // Import mock data
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
// import Folder from "./Folder";
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import axios from "axios";
// import { FaFolderPlus, FaSort, FaSyncAlt, FaUpload } from "react-icons/fa";

const Test = () => {
const { folderName } = useParams();
const [folderData, setFolderData] = useState(null);

useEffect(() => {
    // Find folder data from the mock dataset
    const folder = filesFoldersData.find((f) => f.name === folderName);
    console.log("folder:", folder);
    setFolderData(folder);
}, [folderName]);

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div
        className="folder-contents"
        style={{
          position: "absolute",
          bottom: "537px",
          left: "400px",
          right: "40px",
        }}
      >
        <h1>📁 {folderName}</h1>
        {folderData ? (
          <ul>
            {folderData.files.map((file) => (
              <li key={file.id}>
                📄 {file.name} ({file.size})
              </li>
            ))}
          </ul>
        ) : (
          <p>Folder not found!</p>
        )}
        <Link to="/dashboard">⬅ Back to File Explorer</Link>
      </div>
    </div>
  );
};

export default Test;