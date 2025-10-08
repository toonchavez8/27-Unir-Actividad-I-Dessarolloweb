const Settings = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-description">
          Configure your DM Journal preferences
        </p>
      </div>
      <div className="bento-grid">
        <div className="bento-card">
          <h2 className="bento-card__title">User Profile</h2>
          <p className="bento-card__subtitle">Manage your account settings</p>
        </div>
        <div className="bento-card">
          <h2 className="bento-card__title">Display Options</h2>
          <p className="bento-card__subtitle">Theme and layout preferences</p>
        </div>
        <div className="bento-card">
          <h2 className="bento-card__title">Backup & Export</h2>
          <p className="bento-card__subtitle">Data management options</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
