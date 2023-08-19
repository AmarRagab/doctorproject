import React from 'react';
import PropTypes from 'prop-types';

const StarRating = ({ rating, onRatingChange }) => {
  const maxStars = 5;

  const handleStarClick = (selectedRating) => {
    onRatingChange(selectedRating);
  };

  return (
    <div className="flex items-center space-x-1">
      {[...Array(maxStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={starValue}
            className={`text-2xl ${starValue <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
            onClick={() => handleStarClick(starValue)}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  onRatingChange: PropTypes.func.isRequired,
};

export default StarRating;
