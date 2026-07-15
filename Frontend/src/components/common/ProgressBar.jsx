function ProgressBar({ value, color = "orange" }) {
  return (
    <div className="progress-bar">
      <div className={`progress-fill progress-${color}`} style={{ width: `${value}%` }}></div>
    </div>
  );
}

export default ProgressBar;
