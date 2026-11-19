
import {
  Users,
  Bike,
  Scan,
  Fingerprint,
  Activity,
  Clock3,
} from "lucide-react";

function ObjectTracking() {
  return (
    <div className="page-section">
      <div className="eyebrow">
        <Scan size={15} />
        MULTI-OBJECT TRACKING
      </div>

      <h1>Object Tracking</h1>
      <p className="page-description">
        Monitor persons and motorcycles using YOLO11 and BoT-SORT.
      </p>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">
            <Users size={21} />
          </div>
          <h2>--</h2>
          <p>Persons Tracked</p>
          <span className="stat-note">Awaiting video</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple">
            <Bike size={21} />
          </div>
          <h2>--</h2>
          <p>Motorcycles Tracked</p>
          <span className="stat-note">Awaiting video</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">
            <Fingerprint size={21} />
          </div>
          <h2>--</h2>
          <p>Unique Tracking IDs</p>
          <span className="stat-note">Awaiting video</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon red">
            <Activity size={21} />
          </div>
          <h2>--</h2>
          <p>Active Tracks</p>
          <span className="stat-note">Awaiting video</span>
        </div>
      </div>

      <div className="panel tracking-panel">
        <div className="panel-heading">
          <div>
            <h3>Tracking Monitor</h3>
            <p>Tracked object visualization</p>
          </div>
          <span className="session-tag">NO ACTIVE SESSION</span>
        </div>

        <div className="video-placeholder">
          <Scan size={42} />
          <h3>Tracking Data Unavailable</h3>
          <p>
            Upload and process a traffic video to view
            person IDs, motorcycle IDs and tracking results.
          </p>
        </div>
      </div>

      <div className="panel tracking-info">
        <div className="panel-heading">
          <div>
            <h3>Tracking Technology</h3>
            <p>How object tracking works in our project</p>
          </div>
          <Clock3 className="heading-icon" />
        </div>

        <div className="tracking-description">
          <div>
            <strong>YOLO11 Detection</strong>
            <p>
              Detects persons, bicycles and motorcycles in each frame.
            </p>
          </div>

          <div>
            <strong>BoT-SORT Tracking</strong>
            <p>
              Associates detected objects across frames and assigns
              tracking IDs.
            </p>
          </div>

          <div>
            <strong>Rider Association</strong>
            <p>
              Uses spatial overlap as an initial heuristic to associate
              persons with motorcycles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ObjectTracking;
