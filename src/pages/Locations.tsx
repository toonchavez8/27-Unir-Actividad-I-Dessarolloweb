const Locations = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Locations</h1>
        <p className="page-description">
          Explore and manage your world locations
        </p>
      </div>
      <div className="bento-grid">
        <div className="bento-card">
          <h2 className="bento-card__title">Cities & Towns</h2>
          <p className="bento-card__subtitle">Settlements and urban areas</p>
        </div>
        <div className="bento-card">
          <h2 className="bento-card__title">Dungeons</h2>
          <p className="bento-card__subtitle">
            Dangerous underground locations
          </p>
        </div>
        <div className="bento-card">
          <h2 className="bento-card__title">Wilderness</h2>
          <p className="bento-card__subtitle">Forests, mountains, and more</p>
        </div>
      </div>
    </div>
  );
};

export default Locations;
