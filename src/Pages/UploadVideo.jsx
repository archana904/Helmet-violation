
import { useState } from "react";
import {
  Upload,
  FileVideo,
  CheckCircle,
  X,
  Film,
  HardDrive,
  LoaderCircle,
  Download,
  Play,
} from "lucide-react";

function UploadVideo() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [processedVideo, setProcessedVideo] = useState("");
  const [message, setMessage] = useState("");

  function handleFileChange(event) {
    const selectedFile = event.target.files[0];

    if (!selectedFile) return;

    const allowedExtensions = ["mp4", "avi", "mov", "mkv"];
    const extension = selectedFile.name.split(".").pop().toLowerCase();

    if (!allowedExtensions.includes(extension)) {
      setError("Please select an MP4, AVI, MOV, or MKV video.");
      setFile(null);
      return;
    }

    setError("");
    setMessage("");
    setProcessedVideo("");
    setFile(selectedFile);
  }

  function removeFile() {
    setFile(null);
    setError("");
    setMessage("");
    setProcessedVideo("");
  }

  async function handleUpload() {
    if (!file) return;

    setLoading(true);
    setError("");
    setMessage("Uploading video and starting YOLO11 detection...");

    const formData = new FormData();
    formData.append("video", file);

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/process-video",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Video processing failed.");
      }

      setProcessedVideo(
        `http://127.0.0.1:5000${data.video_url}`
      );

      setMessage(
        `Processing completed! Frames processed: ${data.frames_processed}. Helmet detections: ${data.helmet_detections}.`
      );
    } catch (err) {
      setError(err.message || "Unable to connect to the backend.");
      setMessage("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-section">
      <div className="eyebrow">
        <Film size={15} />
        VIDEO INPUT MODULE
      </div>

      <h1>Upload Traffic Video</h1>

      <p className="page-description">
        Select a traffic recording for helmet violation detection
        and vehicle tracking.
      </p>

      <div className="upload-layout">
        <div className="panel upload-panel">
          <div className="panel-heading">
            <div>
              <h3>Video Upload</h3>
              <p>Choose a video from your device</p>
            </div>
            <Upload className="heading-icon" />
          </div>

          <label className="upload-dropzone">
            <input
              type="file"
              accept="video/mp4,video/avi,video/quicktime,video/x-matroska"
              onChange={handleFileChange}
              hidden
              disabled={loading}
            />

            <div className="upload-icon">
              <Upload size={32} />
            </div>

            <h3>Drop your video here</h3>
            <p>or click to browse files from your computer</p>

            <span className="browse-button">
              Browse Videos
            </span>

            <span className="supported-format">
              Supported formats: MP4, MOV, AVI, MKV
            </span>
          </label>

          {error && (
            <p className="upload-error">{error}</p>
          )}

          {file && (
            <div className="selected-file">
              <div className="file-icon">
                <FileVideo size={24} />
              </div>

              <div className="file-details">
                <strong>{file.name}</strong>
                <span>
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </span>
              </div>

              <CheckCircle color="#49d5a0" size={21} />

              <button
                className="remove-file"
                onClick={removeFile}
                disabled={loading}
                aria-label="Remove selected file"
              >
                <X size={18} />
              </button>
            </div>
          )}

          <button
            className="primary-button upload-submit"
            disabled={!file || loading}
            onClick={handleUpload}
          >
            {loading ? (
              <>
                <LoaderCircle size={18} className="spin" />
                Processing Video...
              </>
            ) : (
              <>
                <Upload size={17} />
                Start Helmet Detection
              </>
            )}
          </button>

          {message && (
            <p className="upload-success">{message}</p>
          )}

          {processedVideo && (
            <div className="processed-video">
              <h3>
                <CheckCircle size={19} color="#49d5a0" />
                Processed Video
              </h3>

              <video
                src={processedVideo}
                controls
                width="100%"
              />

              <a
                href={processedVideo}
                download="HelmetGuard_Processed_Video.mp4"
                className="primary-button"
              >
                <Download size={17} />
                Download Processed Video
              </a>
            </div>
          )}
        </div>

        <div className="panel upload-info">
          <h3>Processing Information</h3>

          <p>
            Our detection pipeline analyzes the uploaded footage
            frame by frame.
          </p>

          <div className="info-item">
            <Film size={20} />
            <div>
              <strong>Video Analysis</strong>
              <span>Frame-by-frame processing</span>
            </div>
          </div>

          <div className="info-item">
            <HardDrive size={20} />
            <div>
              <strong>YOLO11 Model</strong>
              <span>Helmet and vehicle detection</span>
            </div>
          </div>

          <div className="info-item">
            <CheckCircle size={20} />
            <div>
              <strong>BoT-SORT Tracking</strong>
              <span>Object identification across frames</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadVideo;
