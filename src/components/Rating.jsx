import React from "react";

const Rating = ({ value, text, color }) => {
  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((rating) => {
        <span key={rating}>
          <i style={{ color }} className={value >= rating ? "fas fa-star" : "far fa-star"}></i>
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
