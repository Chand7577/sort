import axios from "axios";
import React, { useState } from "react";
import Modal from "react-modal";

// Set the root element for accessibility (required by react-modal)
Modal.setAppElement("#root");

const Folder = ({ folder, fetchFolders, moveFolder, setSelectedFolder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [contextMenu, setContextMenu] = useState(null); // State for context menu
    const [metadata, setMetadata] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editedMetadata, setEditedMetadata] = useState({});
    
    // Dummy metadata for folders and files
    const dummyMetadata = {
        folder: {
            folderName: folder.name,
            creationDate: "2023-10-01",
            lastModified: "2023-10-05",
            size: "2 MB",
        },
        file: {
            fileName: "example.txt",
            creationDate: "2023-10-02",
            lastModified: "2023-10-04",
            size: "500 KB",
        },
    };

    // Fetch metadata for a folder or file
    const fetchMetadata = async (id, type) => {
        try {
            // Simulate API call with dummy metadata
            setMetadata(dummyMetadata[type]);
            setEditedMetadata(dummyMetadata[type]); // Initialize editable metadata
        } catch (error) {
            console.error("Error fetching metadata:", error);
        }
    };

    // Handle three-dot menu click
    const handleMetadataClick = (e, id, type) => {
        e.stopPropagation(); // Prevent folder toggle
        fetchMetadata(id, type);
        setIsModalOpen(true);
    };

    // Save edited metadata
    const saveMetadata = async (id, type) => {
        try {
            // Simulate saving metadata
            console.log("Saving metadata:", editedMetadata);
            setIsModalOpen(false);
            fetchFolders(); // Refresh the folder structure
        } catch (error) {
            console.error("Error saving metadata:", error);
        }
    };

    // Handle metadata field changes
    const handleMetadataChange = (key, value) => {
        setEditedMetadata((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    // Render metadata in a tabular format
    const renderMetadataTable = () => {
        if (!metadata) return null;

        return (
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
                <thead>
                    <tr>
                        <th style={{ border: "1px solid #ccc", padding: "8px" }}>Field</th>
                        <th style={{ border: "1px solid #ccc", padding: "8px" }}>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(metadata).map(([key, value]) => (
                        <tr key={key}>
                            <td style={{ border: "1px solid #ccc", padding: "8px" }}>{key}</td>
                            <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                                {editMode ? (
                                    <input
                                        type="text"
                                        value={editedMetadata[key] || ""}
                                        onChange={(e) => handleMetadataChange(key, e.target.value)}
                                        style={{ width: "100%", padding: "5px" }}
                                    />
                                ) : (
                                    value
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    // Handle right-click context menu
    const handleContextMenu = (e) => {
        e.preventDefault();
        setContextMenu({
            x: e.pageX,
            y: e.pageY,
        });
    };

    // Close context menu
    const closeContextMenu = () => {
        setContextMenu(null);
    };

    // Delete folder
    const deleteFolder = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/folders/${folder._id}`);
            fetchFolders();
        } catch (error) {
            console.error("Error deleting folder:", error);
        }
    };

    // Rename folder
    const renameFolder = async () => {
        const newName = prompt("Enter new folder name:");
        if (newName) {
            await axios.put(`http://localhost:5000/api/folders/${folder._id}`, { name: newName });
            fetchFolders();
        }
        setContextMenu(null);
    };

    // Move folder
    const moveFolderPrompt = async () => {
        const newParentId = prompt("Enter the ID of the new parent folder:");
        if (newParentId) {
            await moveFolder(folder._id, newParentId);
        }
        setContextMenu(null);
    };

    return (
        <div
            style={{
                paddingLeft: "20px",
                border: "1px solid #ccc",
                margin: "5px",
                padding: "10px",
                backgroundColor: "#f8f9fa",
                borderRadius: "5px",
                position: "relative",
            }}
            onClick={() => {
                setIsOpen(!isOpen);
                setSelectedFolder(folder._id);
            }}
            onContextMenu={handleContextMenu}
        >
            📁 {folder.name}
            <span
                style={{ position: "absolute", right: "10px", cursor: "pointer" }}
                onClick={(e) => handleMetadataClick(e, folder._id, "folder")}
            >
                ⋮
            </span>

            {isOpen && folder.files && folder.files.length > 0 && (
                <ul style={{ marginLeft: "20px", listStyleType: "none" }}>
                    {folder.files.map((file) => (
                        <li
                            key={file._id}
                            style={{
                                padding: "1px 1px",
                                background: "#eef",
                                margin: "2px 0",
                                borderRadius: "2px",
                                position: "relative",
                            }}
                        >
                            📄 {file.name}
                            <span
                                style={{ position: "relative", right: "12px", cursor: "pointer" }}
                                onClick={(e) => handleMetadataClick(e, file._id, "file")}
                            >
                                ⋮
                            </span>
                        </li>
                    ))}
                </ul>
            )}

            {isOpen && folder.children && folder.children.length > 0 && (
                <div style={{ marginLeft: "20px" }}>
                    {folder.children.map((child) => (
                        <Folder
                            key={child._id}
                            folder={child}
                            fetchFolders={fetchFolders}
                            moveFolder={moveFolder}
                            setSelectedFolder={setSelectedFolder}
                        />
                    ))}
                </div>
            )}

            {/* Context Menu */}
            {contextMenu && (
                <div
                    style={{
                        position: "absolute",
                        top: contextMenu.y,
                        left: contextMenu.x,
                        background: "white",
                        border: "1px solid #ccc",
                        padding: "5px",
                        boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                        zIndex: 1000,
                    }}
                    onClick={(e) => e.stopPropagation()} // Prevent closing on click inside
                >
                    <button style={{
                        padding: "8px 12px",
                        background: "#f8f9fa",
                        border: "none",
                        cursor: "pointer",
                        transition: "background 0.3s",
                    }}
                    onClick={renameFolder}
            onMouseEnter={(e) => (e.target.style.background = "#e9ecef")}
            onMouseLeave={(e) => (e.target.style.background = "#f8f9fa")}
                >Rename
                    </button>
                    <button style={{
                    padding: "8px 12px",
                    background: "#f8f9fa",
                border: "none",
                cursor: "pointer",
                transition: "background 0.3s",
                    }}
            onClick={moveFolderPrompt}
            onMouseEnter={(e) => (e.target.style.background = "#e9ecef")}
            onMouseLeave={(e) => (e.target.style.background = "#f8f9fa")}>
                        Move
                    </button>

                    <button style={{
                padding: "8px 12px",
                background: "#f8f9fa",
                border: "none",
                cursor: "pointer",
                transition: "background 0.3s",
            }}
            onClick={deleteFolder}
            onMouseEnter={(e) => (e.target.style.background = "#e9ecef")}
            onMouseLeave={(e) => (e.target.style.background = "#f8f9fa")}    >
                        Delete
                    </button>
                </div>
            )}

            {/* Metadata Modal */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                style={{
                    content: {
                        top: "50%",
                        left: "50%",
                        right: "auto",
                        bottom: "auto",
                        marginRight: "-50%",
                        transform: "translate(-50%, -50%)",
                        width: "500px",
                        padding: "20px",
                        borderRadius: "10px",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                    },
                }}
            >
                <h2>Metadata</h2>
                {renderMetadataTable()}
                <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                    <button onClick={() => setEditMode(!editMode)}>
                        {editMode ? "Cancel Edit" : "Edit Metadata"}
                    </button>
                    {editMode && (
                        <button onClick={() => saveMetadata(metadata._id, metadata.type)}>
                            Save
                        </button>
                    )}
                </div>
            </Modal>
        </div>
    );
};

const buttonStyle = {
    border: "2px solid #ccc",
    padding: "5px 10px",
    borderRadius: "5px",
    backgroundColor: "#f8f9fa",
    cursor: "pointer",
    transition: "all 0.3s ease",
    textAlign: "center",
    minWidth: "80px",
};

export default Folder;