const Items = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Items</h1>
        <p className="page-description">
          Manage your magical items and equipment
        </p>
      </div>
      <div className="bento-grid">
        <div className="bento-card">
          <h2 className="bento-card__title">Magic Items</h2>
          <p className="bento-card__subtitle">
            Legendary and magical equipment
          </p>
        </div>
        <div className="bento-card">
          <h2 className="bento-card__title">Weapons & Armor</h2>
          <p className="bento-card__subtitle">Combat gear and protection</p>
        </div>
        <div className="bento-card">
          <h2 className="bento-card__title">Consumables</h2>
          <p className="bento-card__subtitle">Potions, scrolls, and more</p>
        </div>
      </div>
    </div>
  );
};

export default Items;
