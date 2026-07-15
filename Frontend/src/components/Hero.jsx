import landingHero from "../assets/landing_hero.png";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-blob-1"></div>
      <div className="hero-blob-2"></div>

      <div className="container hero-grid">
        <div>
          <div className="hero-badge">
            <span className="material-symbols-outlined filled">auto_awesome</span>
            AI-Powered Learning
          </div>

          <h1 className="hero-title">
            Find the right{" "}
            <span className="hero-title-highlight">
              course
              <svg
                className="hero-underline"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 5 Q 50 10 100 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                />
              </svg>
            </span>{" "}
            for you
          </h1>

          <p className="hero-text">
            At Learnify, we believe learning is better together. Connect with
            peers, share knowledge, and collaborate on engaging courses
            designed to unlock your potential today!
          </p>

          <div className="hero-buttons">
            <button className="btn-hero-primary">Find course</button>
            <button className="btn-hero-secondary">
              View our blog
              <span className="material-symbols-outlined">arrow_outward</span>
            </button>
          </div>

          <div className="hero-social-proof">
            <div className="avatar-group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKW3bcUtZ25kpGMPZ6DwI4XCAT8nZ0FByBi7kCH_MEHvjwBhUWGX1nkOkGZfhCgmAyRbqpNIIY6epygHXE8GaXXyIf781kXKPPsOpdDESH5FyHYQO7LlbQvPRI6piAq-l_Mo3MtyGbX7SXq8w1_nklrHOjCFUOcldEl-8d5hZrpxz8bJ6vrpI-tLPzc72W54cItNGd3X5bylsW8mvWsmm5hAC_C8yrHJ0fZ3KHPaBP6niChvJjVcljiqrq1DC8OX9jyU6SNYNhObEc"
                alt="Student avatar"
              />
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqqH1LfDgdBhgzwbF4fkIOg_NsRzq6atl25-OKLmIW7mehjz0v6L8kTQJh95jAg8-tkPHu49dppjkRa_9xjZv5eckONph69YwY-KX3uLbxHnR7SegH_rznHmAHv2_dRBJOi07-YWxXvu7rKleLA5beJmsHEnfwQbDTlu_T-NPe6rge1R_VANeMbohOlkX2-mzr0SAWClIGj2fwgWC-eiMpdM3JFssePlEg66jj_mKlx8eR3V2NOuIuauDh5U-GaU7tO7zxPeV4us85"
                alt="Student avatar"
              />
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcoufeyhTh9Sm283Gu35owcxNov0V6hb3yiAdeAYJAW0lEIi4oeh1hyQD6ezzGfv_M9BNeiVzJ6fR2I-NeJmnFZH9wJJ6WMA5qV-e_eVpMQRmvb3xqm2rGmcoc2Ftab6OSLrlWaaYUf5wsi2yE3XIpi3We1UfC8zttdzoqXDQiFaX22nFvW1yGBBcqZzYRXxmYgVB3IsQSZLzsVi8EFJrHVI_ckz3joNnT-mw2BhnEqP36dOhmU_n4oI0R7s7FDWY7B2fW6PpWAWW_"
                alt="Student avatar"
              />
              <div className="avatar-count">+2k</div>
            </div>
            <p>Joined by 2,000+ students this month</p>
          </div>
        </div>

        <div className="hero-image-wrap">
          <div className="hero-image">
            <img
              src={landingHero}
              alt="AI-Powered Learning Illustration"
            />
          </div>
          <div className="hero-shape-1"></div>
          <div className="hero-shape-2"></div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
