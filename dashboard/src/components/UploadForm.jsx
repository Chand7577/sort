import { useState } from "react";
import "./UploadForm.css"; // Import UploadForm CSS
import { useNavigate } from "react-router-dom";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [permissions, setPermissions] = useState("public");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("tags", tags);
    formData.append("permissions", permissions);

    try {
      const response = await fetch("https://your-api.com/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("File uploaded successfully!");
      } else {
        alert("Upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="upload-form-container">
      <div className="upload-form">
        <h2>Upload Document</h2>
        <form onSubmit={handleSubmit}>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>Tags (comma-separated):</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />

          <label>Permissions:</label>
          <select value={permissions} onChange={(e) => setPermissions(e.target.value)}>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>

          <label>Choose File:</label>
          <input type="file" onChange={handleFileChange} required />

          <button type="submit" className="upload-submit">Upload</button>
        </form>
      </div>
    </div>
  );
};

export default UploadForm;
