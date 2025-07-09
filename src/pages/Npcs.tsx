const Npcs = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">NPCs</h1>
        <p className="page-description">Manage your non-player characters</p>
      </div>
      <div className="bento-grid">
        <div className="bento-card">
          <h2 className="bento-card__title">Main Characters</h2>
          <p className="bento-card__subtitle">Important story characters</p>
        </div>
        <div className="bento-card">
          <h2 className="bento-card__title">Villains</h2>
          <p className="bento-card__subtitle">Antagonists and enemies</p>
        </div>
        <div className="bento-card">
          <h2 className="bento-card__title">Townspeople</h2>
          <p className="bento-card__subtitle">
            Merchants, guards, and citizens
          </p>
        </div>
      </div>
    </div>
  );
};

export default Npcs;
