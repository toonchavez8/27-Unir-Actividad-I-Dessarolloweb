const Sessiones = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Sessions</h1>
        <p className="page-description">
          Track your gaming sessions and progress
        </p>
      </div>
      <div className="bento-grid">
        <div className="bento-card">
          <h2 className="bento-card__title">Recent Sessions</h2>
          <p className="bento-card__subtitle">Latest gaming sessions</p>
        </div>
        <div className="bento-card">
          <h2 className="bento-card__title">Session Notes</h2>
          <p className="bento-card__subtitle">Important events and outcomes</p>
        </div>
        <div className="bento-card">
          <h2 className="bento-card__title">Session Planning</h2>
          <p className="bento-card__subtitle">Prepare for upcoming sessions</p>
        </div>
      </div>
    </div>
  );
};

export default Sessiones;
