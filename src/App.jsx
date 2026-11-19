
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";

import {
  LayoutDashboard,
  Video,
  Upload,
  Users,
  ChartColumn,
  Cpu,
  ShieldCheck,
} from "lucide-react";

import Dashboard from "./pages/Dashboard";
import LiveDetection from "./pages/LiveDetection";
import UploadVideo from "./pages/UploadVideo";
import ObjectTracking from "./pages/ObjectTracking";
import Analytics from "./pages/Analytics";
import Performance from "./pages/Performance";

import "./App.css";

const menuItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Live Detection", path: "/live-detection", icon: Video },
  { name: "Upload Video", path: "/upload-video", icon: Upload },
  { name: "Object Tracking", path: "/object-tracking", icon: Users },
  { name: "Analytics", path: "/analytics", icon: ChartColumn },
  { name: "CPU vs GPU", path: "/performance", icon: Cpu },
];

function AppLayout() {
  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">
            <ShieldCheck size={25} />
          </div>
          <div>
            <h2>HelmetGuard</h2>
            <span>AI Detection System</span>
          </div>
        </div>

        <div className="sidebar-label">MAIN MENU</div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  isActive ? "nav-item active" : "nav-item"
                }
              >
                <Icon size={19} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="status-dot" />
          <span>System Interface</span>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <span className="topbar-label">HELMET VIOLATION MONITORING</span>
            <h3>HelmetGuard AI</h3>
          </div>

          <div className="topbar-right">
            <span className="online-status">
              <span className="status-dot" />
              Interface Online
            </span>
            <div className="admin-avatar">A</div>
          </div>
        </header>

        <div className="page-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/live-detection" element={<LiveDetection />} />
            <Route path="/upload-video" element={<UploadVideo />} />
            <Route path="/object-tracking" element={<ObjectTracking />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/performance" element={<Performance />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
