import { useNavigate } from "react-router-dom";

const UploadButton = () => {
  const navigate = useNavigate();

  return (
    <div className="upload-button-container">
      <button onClick={() => navigate("/upload")} className="upload-button">
        <i className="bi bi-upload"></i> {/* Bootstrap Upload Icon */}
        Upload 
      </button>
    </div>
  );
};

export default UploadButton;
