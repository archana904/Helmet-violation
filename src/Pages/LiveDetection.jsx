
import { Video, Play, CircleDot, ShieldCheck, CircleAlert } from "lucide-react";

function LiveDetection() {
  return (
    <div className="page-section">
      <div className="eyebrow">
        <CircleDot size={15} />
        AI-POWERED VIDEO ANALYSIS
      </div>

      <h1>Live Detection</h1>
      <p className="page-description">
        Monitor motorcycle riders and helmet compliance using YOLO11.
      </p>

      <div className="content-grid">
        <div className="panel detection-panel">
          <div className="panel-heading">
            <div>
              <h3>Detection Monitor</h3>
              <p>Real-time annotated video output</p>
            </div>
            <span className="live-label">READY</span>
          </div>

          <div className="video-placeholder">
            <Video size={42} />
            <h3>No Active Detection</h3>
            <p>
              Upload and process a traffic video to view
              helmet detection results here.
            </p>
          </div>
        </div>

        <div className="panel">
          <div className="panel-heading">
            <h3>Detection Legend</h3>
          </div>

          <div className="hardware-card">
            <ShieldCheck color="#49d5a0" size={22} />
            <div className="hardware-info">
              <strong>With Helmet</strong>
              <span>Compliant rider</span>
            </div>
          </div>

          <div className="hardware-card">
            <CircleAlert color="#ff7d87" size={22} />
            <div className="hardware-info">
              <strong>Without Helmet</strong>
              <span>Potential violation</span>
            </div>
          </div>

          <div className="hardware-card">
            <Play color="#69afff" size={22} />
            <div className="hardware-info">
              <strong>YOLO11 + BoT-SORT</strong>
              <span>Detection and tracking pipeline</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveDetection;
