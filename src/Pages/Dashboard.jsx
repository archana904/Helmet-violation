
import {
  Users,
  ShieldCheck,
  CircleAlert,
  Bike,
  Video,
  Cpu,
  Activity,
} from "lucide-react";

function Dashboard() {
  const stats = [
    {
      title: "Tracked Persons",
      value: "--",
      note: "Awaiting video input",
      icon: Users,
      color: "blue",
    },
    {
      title: "With Helmet",
      value: "--",
      note: "Awaiting detection",
      icon: ShieldCheck,
      color: "green",
    },
    {
      title: "Without Helmet",
      value: "--",
      note: "Awaiting detection",
      icon: CircleAlert,
      color: "red",
    },
    {
      title: "Motorcycles Detected",
      value: "--",
      note: "Awaiting detection",
      icon: Bike,
      color: "purple",
    },
  ];

  return (
    <>
      <div className="welcome-section">
        <div>
          <div className="eyebrow">
            <Activity size={15} />
            INTELLIGENT TRAFFIC MONITORING
          </div>
          <h1>Dashboard Overview</h1>
          <p>
            Monitor helmet compliance, track vehicles and analyze
            system performance.
          </p>
        </div>
      </div>

      <div className="section-heading">
        <div>
          <h3>Detection Overview</h3>
          <p>Summary of the current detection session</p>
        </div>
        <span className="session-tag">NO ACTIVE SESSION</span>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div className="stat-card" key={stat.title}>
              <div className="stat-top">
                <div className={`stat-icon ${stat.color}`}>
                  <Icon size={21} />
                </div>
              </div>

              <h2>{stat.value}</h2>
              <p>{stat.title}</p>
              <span className="stat-note">{stat.note}</span>
            </div>
          );
        })}
      </div>

      <div className="content-grid">
        <div className="panel">
          <div className="panel-heading">
            <div>
              <h3>Detection Workspace</h3>
              <p>Traffic video monitoring</p>
            </div>
            <Video className="heading-icon" />
          </div>

          <div className="video-placeholder">
            <Video size={35} />
            <h3>No Video Selected</h3>
            <p>Upload a traffic video to begin detection.</p>
          </div>
        </div>

        <div className="panel">
          <div className="panel-heading">
            <div>
              <h3>System Performance</h3>
              <p>Hardware execution overview</p>
            </div>
            <Cpu className="heading-icon" />
          </div>

          <div className="hardware-card">
            <Cpu size={22} />
            <div className="hardware-info">
              <strong>CPU Processing</strong>
              <span>Available</span>
            </div>
          </div>

          <div className="hardware-card">
            <Activity size={22} />
            <div className="hardware-info">
              <strong>GPU Processing</strong>
              <span>Benchmark pending</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
