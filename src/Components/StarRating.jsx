import React from 'react';
import PropTypes from 'prop-types';
import './StarRating.css';
const StarRating = ({ rating, onRatingChange }) => {
  const maxStars = 5;

  const handleStarClick = (selectedRating) => {
    onRatingChange(selectedRating);
  };

  return (
    <div className="star-rating">
      {[...Array(maxStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={starValue}
            className={`star ${starValue <= rating ? 'filled' : ''}`}
            onClick={() => handleStarClick(starValue)}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};


export default StarRating;
