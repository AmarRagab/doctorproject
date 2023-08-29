import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarRating from './StarRating';
import ReviewPopup from './ReviewDialog';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useAuth } from './context/Auth/AuthContextProvider';
import { toast } from 'react-toastify';

import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';

const OverviewPopup = ({ doctorData, onClose }) => {
  const [reviews, setReviews] = useState([]);
  const {user}=useSelector(state => state.auth);
  const [averageRating, setAverageRating] = useState(0);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isReviewPopupOpen, setIsReviewPopupOpen] = useState(false);

  const handleReviewPopupOpen = () => {
    if (user !== null) {
      setIsReviewPopupOpen(true);
    }
    else {
      toast.error("You're not logged in!", {
        position: 'top-center',
        autoClose: 1000,
      });
    }
  };

  const handleReviewSave = (reviewData) => {
    if (doctorData.id) {
      const existingReviews = JSON.parse(localStorage.getItem(doctorData.id)) || [];
      const completeReviewData = {
        ...reviewData,
        reviewer: user.username,
        date: new Date().toISOString(),
      };
      existingReviews.push(completeReviewData);
      localStorage.setItem(doctorData.id, JSON.stringify(existingReviews));

      setReviews(existingReviews);

      setAverageRating(calculateAverageRating(existingReviews));

      setIsReviewPopupOpen(false);
    }
  };

  const handleReviewPopupClose = () => {
    setIsReviewPopupOpen(false);
  };

  useEffect(() => {
    const fetchedReviews = fetchReviews(doctorData.id);
    setReviews(fetchedReviews);
    setAverageRating(calculateAverageRating(fetchedReviews));
  }, [doctorData]);

  const fetchReviews = (id) => {
    const newReviews = JSON.parse(localStorage.getItem(id));
    return newReviews || [];
  };

  const handleShowPopup = (review) => {
    setSelectedReview(review);
    setIsPopupOpen(true);
  };


  const [isPopupOpen, setIsPopupOpen] = useState(false);


  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const NotesCellRenderer = ({ value }) => {


    return (
      <div>
        <button onClick={handleShowPopup} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">عرض</button>
      </div>
    );
  };

  const columnDefs = [
    {
      headerName: 'الاسم', field: 'reviewer', sortable: true,
      flex: 1,
      filter: true,
      resizable: true,
      minWidth: 100,

    },
    {
      headerName: 'تاريخ التقييم', field: 'date', sortable: true,
      flex: 1,
      filter: true,
      resizable: true,
      minWidth: 100,

    },
    {
      headerName: 'التقييم',
      field: 'rating', sortable: true,
      flex: 1,
      filter: true,
      resizable: true,
      minWidth: 100,
      cellRenderer: ({ value }) => <StarRating rating={value} readOnly />
    },
    {
      headerName: 'ملاحظات',
      field: 'notes',
      cellRenderer: NotesCellRenderer,
      sortable: true,
      flex: 1,
      filter: true,
      resizable: true,
      minWidth: 100,

    },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-lg">
        <div className="p-6 text-center">
          <h2 className="text-2xl font-semibold mb-2">ملخص الدكتور</h2>
          <h3 className="text-lg mb-4">{doctorData.doctor}</h3>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-4 justify-center">
            <p className="flex-grow">التخصص: {doctorData.major}</p>
            <p className="flex-grow">العنوان: {doctorData.address}</p>
          </div>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-4 justify-center">
            <p className="flex-grow">المحافظة: {doctorData.city}</p>
            <p className="flex-grow">الهاتف: {doctorData.mobile}</p>
          </div>
          <p className="mb-2">معدل التقييم:</p>
          <div className="flex justify-center">
            <StarRating rating={averageRating} onRatingChange={() => { }} readOnly />
          </div>
          {user!==null && (
            <button className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300" onClick={handleReviewPopupOpen}>
              قيم
            </button>
          )}
        </div>
        <hr className="mx-6 border-gray-300" />
        <div className="p-6 text-center">
          <h3 className="text-lg mb-4">التقييمات</h3>
          <div className="ag-theme-alpine" style={{ height: '200px' }}>
            <AgGridReact
              rowData={reviews}
              columnDefs={columnDefs}
              getRowHeight={() => 60}
              onCellClicked={(event) => {
                if (event.colDef.field === 'notes') {
                  handleShowPopup(event.data);
                }
              }}
            />
          </div>
          {isPopupOpen && selectedReview && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-md w-80">
                <p className="text-gray-800 mb-2">{selectedReview.notes === "" ? ".This reviewer hasn't given any notes" : selectedReview.notes}</p>
                <button className="py-1 px-3 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-300" onClick={handlePopupClose}>
                  اغلاق
                </button>
              </div>
            </div>
          )}
          {isReviewPopupOpen && user!==null && (
            <ReviewPopup
              onSave={handleReviewSave}
              onCancel={handleReviewPopupClose}
              doctorId={doctorData.id}
            />
          )}
          <button className="mt-4 py-2 px-4 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-300" onClick={onClose}>
            اغلاق
          </button>
        </div>
      </div>
    </div>
  )
};

OverviewPopup.propTypes = {
  doctorId: PropTypes.number,
  onClose: PropTypes.func.isRequired,
};

const calculateAverageRating = (reviews) => {
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return (totalRating / reviews.length) || 0;
};

export default OverviewPopup;
