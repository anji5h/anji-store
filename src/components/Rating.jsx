import React from "react";

const Rating = ({ value, text, color }) => {
  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((rating) => {
        <span key={rating}>
          <i
            style={{ color }}
            className={
              value >= rating
                ? "fas fa-star"
                : value >= (rating / 2).toFixed(1)
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
          ></i>
        </span>;
      })}
      <span>{text && text}</span>
    </div>
  );
};

Rating.defaultProps = {
  color: "#f8e825",
};

export default Rating;
