export function UNLoader() {
  return (
    <div className="un-loader-container">
      {/* Loading text */}
      <div className="un-loading-text">LOADING...</div>

      {/* Animated progress bar */}
      <div className="un-progress-bar">
        <div className="un-progress-fill" />
      </div>

      {/* Tagline */}
      <div className="un-tagline">Empower Future, Inspire Generations</div>

      {/* Himalayan Mountains Scene with Parallax Layers */}
      <div className="un-mountains-scene">
        {/* Layer 1 - Far background */}
        <div className="un-mountain-layer-1">
          <div className="un-peak un-peak-1">
            <div className="un-snow-cap" />
          </div>
          <div className="un-peak un-peak-2">
            <div className="un-snow-cap" />
          </div>
        </div>

        {/* Layer 2 - Middle ground */}
        <div className="un-mountain-layer-2">
          <div className="un-peak un-peak-1">
            <div className="un-snow-cap" />
          </div>
          <div className="un-peak un-peak-2">
            <div className="un-snow-cap" />
          </div>
        </div>

        {/* Layer 3 - Foreground */}
        <div className="un-mountain-layer-3">
          <div className="un-peak un-peak-1">
            <div className="un-snow-cap" />
          </div>
          <div className="un-peak un-peak-2">
            <div className="un-snow-cap" />
          </div>
        </div>

        {/* Pine Trees */}
        <div className="un-tree un-tree-1" />
        <div className="un-tree un-tree-2" />
        <div className="un-tree un-tree-3" />

        {/* Flowing River */}
        <div className="un-river" />
      </div>

      {/* Floating Particles (snow/mist) */}
      <div className="un-particle un-particle-1" />
      <div className="un-particle un-particle-2" />
      <div className="un-particle un-particle-3" />
      <div className="un-particle un-particle-4" />
    </div>
  );
}
