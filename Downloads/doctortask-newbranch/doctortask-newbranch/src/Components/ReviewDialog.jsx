import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StarRating from './StarRating';
import { useAuth } from './context/Auth/AuthContextProvider';

const ReviewPopup = ({ onSave, onCancel}) => {
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
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" dir='rtl'>
    <div className="bg-white p-6 rounded-lg shadow-md w-80">
      <h2 className="text-2xl font-semibold mb-4">تقييم</h2>
      <StarRating rating={rating} onRatingChange={setRating} />
      <textarea
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 mt-4 resize-none"
        rows="3"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="أكتب ملاحظاتك..."
      />
      <div className="flex mt-6 space-x-12">
        <button className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-200 space-x-12" onClick={onCancel}>
          اغلاق
        </button>
        {rating > 0 && (
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200" onClick={handleSave} style={{marginRight:"12px"}}>
            حفظ
          </button>
        )}
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
