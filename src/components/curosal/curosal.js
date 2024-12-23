import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./curosal.scss";

const Curosal = ({ landDetails }) => {
  const landMedia = landDetails.land_media;

  const carouselId = `carouselExampleIndicators-${landDetails.id}`;

  return (
    <div>
      <div id={carouselId} className="carousel slide curosal-main-container">
        <div className="carousel-inner">
          <div className="round heart-icon">
            <i className="bi bi-heart color "></i>
          </div>
          <div className="round share-icon">
            <i className="bi bi-share"></i>
          </div>

          {landMedia.map((media, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <img
                src={media.image}
                className="d-block w-100 media-img"
                alt={`slide-image ${index}`}
              />
            </div>
          ))}
        </div>

        <div className="land-details-container">
          <p className="land-details">
            <i className="bi bi-currency-rupee"></i>
            <span className="space">
              {landDetails.land_price?.price_per_acre_crore?.crore > 0
                ? (
                    landDetails.land_price?.price_per_acre_crore?.crore +
                    landDetails.land_price?.price_per_acre_crore?.lakh / 100
                  ).toFixed(1) + " Cr/acre"
                : landDetails.land_price?.price_per_acre_crore?.lakh +
                  " Lakhs/acre"}
            </span>

            <i className="bi bi-dot dot"></i>
            {landDetails.land_size?.total_land_size_in_acres?.acres > 0 && (
              <span className="space">
                {landDetails.land_size.total_land_size_in_acres.acres} Acres
              </span>
            )}

            {landDetails.land_size?.total_land_size_in_acres?.cents > 0 && (
              <span className="space">
                {landDetails.land_size.total_land_size_in_acres.cents} Cents
              </span>
            )}

            {landDetails.land_size?.total_land_size_in_acres?.guntas > 0 && (
              <span className="space">
                {landDetails.land_size.total_land_size_in_acres.guntas} Guntas
              </span>
            )}
            <i className="bi bi-patch-check check"></i>
          </p>
          <p className="location">
            {`${landDetails.division_info[2].name}, 
  ${landDetails.division_info[1].name} (dt) `}
          </p>
        </div>
        <button
          className="carousel-control-prev navigator-btn nav-left"
          type="button"
          data-bs-target={`#${carouselId}`}
          data-bs-slide="prev"
        >
          <i className="bi bi-chevron-left navigators"></i>
        </button>
        <button
          className="carousel-control-next navigator-btn"
          type="button"
          data-bs-target={`#${carouselId}`}
          data-bs-slide="next"
        >
          <i class="bi bi-chevron-right navigators"></i>
        </button>
      </div>
    </div>
  );
};

export default Curosal;