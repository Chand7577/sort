import axios from "axios";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FaFolderPlus, FaSort, FaSyncAlt, FaUpload } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import filesFoldersData from "../../folderFilesData.js";
import Folder from "./Folder.jsx";

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

  const handleFileSearch = (searchedValue) => {
    setSearchValue(searchedValue);
  };

  // Filter the folders and files based on the search value
  const filteredFolders = folders.filter((folder) => {
    const folderNameMatch = folder.name
      .toLowerCase()
      .includes(searchValue.toLowerCase());
    const fileNamesMatch = folder.files.some((file) =>
      file.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    return folderNameMatch || fileNamesMatch;
  });

  return (
    
    <DndProvider backend={HTML5Backend}>
      <div className="file-explorer">
        <h1 className="title">📂 File Manager</h1>
        <div className="toolbar">
          <input
            className="search-input"
            type="text"
            placeholder="Search documents..."
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button className="btn" onClick={createFolder}>
            <FaFolderPlus /> New Folder
          </button>
          <button
            className="btn"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <FaSort /> Sort By {sortBy && (`${sortBy}`)}
          </button>
          <button className="btn" onClick={fetchFolders}>
            <FaSyncAlt /> Refresh
          </button>
          <button className="btn" onClick={() => navigate("/upload")}>
            <FaUpload /> Upload
          </button>
        </div>
        {isDropdownOpen && (
          <div className="dropdown">
            <p onClick={() => sortFolders("name")}>Name</p>
            <p onClick={() => sortFolders("modifiedDate")}>Modified Date</p>
            <p onClick={() => sortFolders("size")}>Size</p>
          </div>
        )}

        <div className="folder-container">
          {filteredFolders.map((folder, index) => (
            <Link key={index} to={`/test/${folder.name}`}>
              <Folder
                key={folder.id}
                folder={folder}
                fetchFolders={fetchFolders}
                setSelectedFolder={setSelectedFolder}
              />
            </Link>
          ))}
        </div>
      </div>

      <style>
        {`
        .file-explorer {
            padding: 10px;
            background: #f9f9f9;
            border-radius: 0px;
            max-width: 1220px;
            position: relative;
            bottom: 800px ;
            left :300px;
            right :20px;
          
            
          }
          .title {
            text-align: center;
            margin-bottom: 20px;
          }
          .toolbar {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
          }
          .search-input {
            flex: 1;
            padding: 8px;
            border-radius: 5px;
            border: 1px solid #ccc;
          }
          .btn {
            background: #007bff;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 5px;
            cursor: pointer;
          }
          .btn:hover {
            background: #0056b3;
          }
          .dropdown {
            background: white;
            border: 1px solid #ccc;
            padding: 10px;
            position: relative;
            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
            left:900px;
          }
          .folder-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
            gap: 10px;
            margin-top: 20px;
            
          }
            .bordered-btn {
              border: 2px solid #ccc;
              padding: 8px 12px;
              border-radius: 5px;
              background-color: #f8f9fa;
              transition: all 0.3s ease;
              
            }
            .bordered-btn:hover {
              border-color: #007bff;
              background-color: #e9ecef;
            }
            .dropdown {
              position: absolute;
              background: white;
              border: 1px solid #ccc;
              padding: 10px;
              border-radius: 5px;
              box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
              z-index: 10;
            }
            .dropdown p {
              margin: 5px 0;
              cursor: pointer;
            }
            .dropdown p:hover {
              background-color: #f1f1f1;
              
            }
            .file-search-container {
              display: flex;
              align-items: center;
              justify-content: flex-start;
              padding: 5px 10px;
              width: 30%;
              border: 1px solid rgb(212, 212, 212);
              border-radius: 5px;
              margin: 10px 0px;
              
            }
            .file-search-container-input {
              flex: 1;
              border: none;
              outline: none;
              padding: 10px;
              border: 1px solid #ddd;
              border-radius: 5px;
              background : transparent;
              
            }
         
}


/* File Table */
.file-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.file-table th, .file-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.file-table th {
  background: #f1f1f1;
}

            
            .title {
              font-size: 22px;
              font-weight: bold;
              margin-bottom: 20px;
            }
            .bordered-btn {
              border: 2px solid #ccc;
              background-color: white;
            transition: all 0.3s ease;
            {/* responsive */}
            @media (max-width: 768px) {
  .file-search-container {
    width: 100%;
  }

  .toolbar {
    flex-direction: column;
    gap: 10px;
  }

  .folder-container {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  }

  .file-table th, .file-table td {
    font-size: 12px;
  }
}
          `}
      </style>
    </DndProvider>
  );
};

export default FileExplorer;