function LandingPage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Welcome to DM Journal</h1>
        <p className="page-description">
          Your ultimate companion for managing D&D campaigns
        </p>
      </div>
      <div className="bento-grid">
        <div className="bento-card">
          <h2 className="bento-card__title">Getting Started</h2>
          <p className="bento-card__subtitle">
            Quick setup guide for new users
          </p>
        </div>
        <div className="bento-card">
          <h2 className="bento-card__title">Recent Activity</h2>
          <p className="bento-card__subtitle">Latest updates and changes</p>
        </div>
        <div className="bento-card">
          <h2 className="bento-card__title">Quick Actions</h2>
          <p className="bento-card__subtitle">Common tasks and shortcuts</p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
