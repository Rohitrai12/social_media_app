import { bottomBannerLinks } from "@/constants";

const Bottombanner = () => {

  return (
    
      <div className="bottom-banner">
        <div className="divider"/>
        <div className="bottom-banner-content">
            <span className="bottom-banner-text">© BU Connect 2024 (wa)</span>
            <div className="bottom-banner-links">
                <a href="/" className="bottom-banner-icon">🔗</a>
                <a href="/" className="bottom-banner-icon">🔗</a>
            </div>
        </div>
      </div>
  );
};

export default Bottombanner;
