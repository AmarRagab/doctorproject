import React, { useState } from 'react';
import Modal from 'react-modal';

const ReviewComponent = ({ doctorName, onSave, onCancel }) => {
  const [stars, setStars] = useState(0);
  const [notes, setNotes] = useState('');
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleStarsChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setStars(value);
    setIsSaveDisabled(value === 0);
  };

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  const handleSave = () => {
    const review = { stars, notes };
    saveReview(doctorName, review);
    onSave();
    setModalIsOpen(false);
    resetForm();
  };

  const handleCancel = () => {
    onCancel();
    setModalIsOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setStars(0);
    setNotes('');
    setIsSaveDisabled(true);
  };

  const saveReview = (doctorName, review) => {
    const reviews = JSON.parse(localStorage.getItem('doctorReviews')) || {};
    if (!reviews[doctorName]) {
      reviews[doctorName] = [];
    }
    reviews[doctorName].push(review);
    localStorage.setItem('doctorReviews', JSON.stringify(reviews));
  };

  return (
    <div>
      <button onClick={() => setModalIsOpen(true)}>Open Review</button>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <div className="review-dialog">
          <h2>Write a Review for {doctorName}</h2>
          <div className="stars-section">
            <span>Rating:</span>
            <select value={stars} onChange={handleStarsChange}>
              <option value={0}>Select Stars</option>
              <option value={1}>1 Star</option>
              <option value={2}>2 Stars</option>
              <option value={3}>3 Stars</option>
              <option value={4}>4 Stars</option>
              <option value={5}>5 Stars</option>
            </select>
          </div>
          <div className="notes-section">
            <span>Notes:</span>
            <textarea value={notes} onChange={handleNotesChange} />
          </div>
          <div className="footer">
            <button disabled={isSaveDisabled} onClick={handleSave}>
              Save
            </button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ReviewComponent;
