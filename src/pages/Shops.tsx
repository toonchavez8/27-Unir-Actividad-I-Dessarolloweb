const Shops = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Shops</h1>
        <p className="page-description">Manage merchants and trading posts</p>
      </div>
      <div className="bento-grid">
        <div className="bento-card">
          <h2 className="bento-card__title">General Stores</h2>
          <p className="bento-card__subtitle">Basic equipment and supplies</p>
        </div>
        <div className="bento-card">
          <h2 className="bento-card__title">Magic Shops</h2>
          <p className="bento-card__subtitle">Arcane items and components</p>
        </div>
        <div className="bento-card">
          <h2 className="bento-card__title">Specialty Vendors</h2>
          <p className="bento-card__subtitle">Unique merchants and services</p>
        </div>
      </div>
    </div>
  );
};

export default Shops;
