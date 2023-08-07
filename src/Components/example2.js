import React from 'react';

const OverviewComponent = ({ doctorName }) => {
  const doctorReviews = JSON.parse(localStorage.getItem('doctorReviews')) || {};
  const reviews = doctorReviews[doctorName] || [];

  return (
    <div>
      <h2>Overview for {doctorName}</h2>
      {reviews.length === 0 ? (
        <p>No reviews available for this doctor.</p>
      ) : (
        <div>
          <h3>Reviews:</h3>
          <ul>
            {reviews.map((review, index) => (
              <li key={index}>
                <strong>Stars: {review.stars}</strong>
                {review.notes && <p>Notes: {review.notes}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OverviewComponent;
