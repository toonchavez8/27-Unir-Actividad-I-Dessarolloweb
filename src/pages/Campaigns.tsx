const Campaigns = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Campaigns</h1>
        <p className="page-description">Manage your D&D campaigns</p>
      </div>
      <div className="bento-grid">
        <div className="bento-card">
          <h2 className="bento-card__title">Campaign Management</h2>
          <p className="bento-card__subtitle">
            Create and manage your campaigns
          </p>
        </div>
        <div className="bento-card">
          <h2 className="bento-card__title">Active Campaigns</h2>
          <p className="bento-card__subtitle">View your ongoing campaigns</p>
        </div>
        <div className="bento-card">
          <h2 className="bento-card__title">Campaign Archive</h2>
          <p className="bento-card__subtitle">Access completed campaigns</p>
        </div>
      </div>
    </div>
  );
};

export default Campaigns;
