import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StarRating from './StarRating';
import './ReviewPopup.css';
import { useAuth } from './context/Auth/AuthContextProvider';

const ReviewPopup = ({ onSave, onCancel, doctorId }) => {
  const { user } = useAuth(); 
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState('');


  
  const handleSave = () => {
    const reviewData = {
      reviewer: user.username, 
      rating,
      notes,
      date: new Date().toISOString(), 
    };
    onSave(reviewData);
    setRating(0);
    setNotes('');
  };

  return (
    <div className="popup-container">
      <div className="popup-body">
        <div className="review-popup">
          <h2>Write a Review</h2>
          <StarRating rating={rating} onRatingChange={setRating} />
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Enter your review notes..."
          />
          <div className="button-container">
            <button className="cancel-button" onClick={onCancel}>
              Cancel
            </button>
            {rating > 0 && (
               <button className="save-button" onClick={handleSave}>
               Save
             </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

ReviewPopup.propTypes = {
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  doctorId: PropTypes.number,
};

export default ReviewPopup;
