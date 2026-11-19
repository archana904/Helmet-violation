
import {
  ChartColumn,
  Target,
  Scan,
  ShieldCheck,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";

function Analytics() {
  const metrics = [
    { label: "Precision", value: 67.3, icon: Target },
    { label: "Recall", value: 73.0, icon: Scan },
    { label: "mAP@50", value: 76.2, icon: TrendingUp },
    { label: "mAP@50-95", value: 39.7, icon: ChartColumn },
  ];

  const classResults = [
    {
      name: "With Helmet",
      precision: "83.2%",
      recall: "80.5%",
      map: "90.8%",
      status: "Strong",
    },
    {
      name: "Without Helmet",
      precision: "51.4%",
      recall: "65.6%",
      map: "61.5%",
      status: "Needs Improvement",
    },
  ];

  return (
    <div className="page-section">
      <div className="eyebrow">
        <ChartColumn size={15} />
        MODEL PERFORMANCE
      </div>

      <h1>Analytics</h1>
      <p className="page-description">
        Evaluate the helmet detection model using independent test-set results.
      </p>

      <div className="analytics-note">
        <ShieldCheck size={18} />
        <span>
          Results from the independent test set: 63 images and 184 labeled
          helmet instances.
        </span>
      </div>

      <div className="stats-grid">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <div className="stat-card" key={metric.label}>
              <div className="stat-icon blue">
                <Icon size={21} />
              </div>
              <h2>{metric.value}%</h2>
              <p>{metric.label}</p>
              <div className="metric-bar">
                <div style={{ width: `${metric.value}%` }} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="panel analytics-panel">
        <div className="panel-heading">
          <div>
            <h3>Class-wise Performance</h3>
            <p>Comparison of helmet detection results</p>
          </div>
          <ChartColumn className="heading-icon" />
        </div>

        <div className="analytics-table-wrapper">
          <table className="analytics-table">
            <thead>
              <tr>
                <th>Class</th>
                <th>Precision</th>
                <th>Recall</th>
                <th>mAP@50</th>
                <th>Observation</th>
              </tr>
            </thead>

            <tbody>
              {classResults.map((result) => (
                <tr key={result.name}>
                  <td>{result.name}</td>
                  <td>{result.precision}</td>
                  <td>{result.recall}</td>
                  <td>{result.map}</td>
                  <td>
                    <span
                      className={
                        result.status === "Strong"
                          ? "result-status good"
                          : "result-status warning"
                      }
                    >
                      {result.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="panel analytics-insight">
        <div className="panel-heading">
          <div>
            <h3>Model Insights</h3>
            <p>Observations from the test results</p>
          </div>
          <AlertTriangle className="heading-icon" />
        </div>

        <div className="insight-content">
          <div>
            <strong>Better detection of helmeted riders</strong>
            <p>
              The With Helmet class achieved a higher mAP@50 of 90.8%.
            </p>
          </div>

          <div>
            <strong>Improvement needed for violations</strong>
            <p>
              The Without Helmet class achieved 61.5% mAP@50. Improving
              detection of this class is an important future task.
            </p>
          </div>

          <div>
            <strong>Dataset imbalance</strong>
            <p>
              The training dataset contains more With Helmet examples
              (66.10%) than Without Helmet examples (33.90%).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
