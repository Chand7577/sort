import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useNavigate } from "react-router-dom";
import filesFoldersData from "../../../folderFilesData.js";
import Folder from "../Folder.jsx";
import { Height } from "@mui/icons-material";
import { maxHeight } from "@mui/system";

const styles = {
  fileExplorer: {
    padding: "20px",
    backgroundColor: "#F4EBDC",
    // borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    width: "calc(100% - 350px)",
    maxWidth: "1300px",
    position: "absolute",
    top: "62px",
    left: "300px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "15px",
    width: "100%",
  },
  searchInput: {
    flex: "1",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #3A506B",
    outline: "none",
    fontSize: "14px",
    minWidth: "200px",
  },
  button: {
    padding: "8px 14px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#3A506B",
    color: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    minWidth: "100px",
    justifyContent: "center",
  },
  dropdown: {
    position: "absolute ",
    backgroundColor: "#C8B6A6",
    borderRadius: "6px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    padding: "10px",
    width: "150px",
    zIndex: 1000,
   
  },
  folderContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
    gap: "15px",
    width: "100%",
    maxWidth: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
};

const FileExplorer = () => {
  const [folders, setFolders] = useState(filesFoldersData);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [sortBy, setSortBy] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/folders");
      setFolders(res.data.folders);
    } catch (error) {
      console.error("Error fetching folders:", error);
    }
  };

  const createFolder = async () => {
    const name = prompt("Enter folder name:");
    if (name) {
      try {
        await axios.post("http://localhost:5000/api/folders/create", { name });
        fetchFolders();
      } catch (error) {
        console.error("Error creating folder:", error);
      }
    }
  };

  const handleFileUpload = async (event) => {
    if (!selectedFolder) {
      alert("Please select a folder first.");
      return;
    }

    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folderId", selectedFolder);

    try {
      await axios.post("http://localhost:5000/api/files/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("File uploaded successfully!");
      fetchFolders();
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const sortFolders = (criteria) => {
    let sortedFolders = [...folders];

    if (criteria === "name") {
      sortedFolders.sort((a, b) => a.name.localeCompare(b.name));
    } else if (criteria === "modifiedDate") {
      sortedFolders.sort(
        (a, b) => new Date(b.modifiedAt) - new Date(a.modifiedAt)
      );
    } else if (criteria === "size") {
      sortedFolders.sort((a, b) => a.size - b.size);
    }

    setSortBy(criteria);
    setFolders(sortedFolders);
    setIsDropdownOpen(false);
  };

  const handleFolderClick = (folderName) => {
    navigate(`/dashboard/${folderName}`);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={styles.fileExplorer}>
        <div style={styles.toolbar}>
          <input
            style={styles.searchInput}
            type="text"
            placeholder="Search documents..."
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button style={styles.button} onClick={createFolder}>
            📂 New
          </button>
          <button
            style={styles.button}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            ↕ Sort By {sortBy && `(${sortBy})`}
          </button>
          <button style={styles.button} onClick={fetchFolders}>
            🔄 Refresh
          </button>
          <button style={styles.button} onClick={() => navigate("/Upload")}>
            ⬆ Upload
          </button>
        </div>
        {isDropdownOpen && (
          <div style={styles.dropdown}>
            <p onClick={() => sortFolders("name")}>Name</p>
            <p onClick={() => sortFolders("modifiedDate")}>Modified Date</p>
            <p onClick={() => sortFolders("size")}>Size</p>
          </div>
        )}

        <div style={styles.folderContainer}>
          {folders.map((folder, index) => (
            <Folder
              key={folder.id}
              folder={folder}
              fetchFolders={fetchFolders}
              setSelectedFolder={setSelectedFolder}
              onFolderClick={handleFolderClick}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default FileExplorer;