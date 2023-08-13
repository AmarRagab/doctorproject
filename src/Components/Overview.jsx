import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarRating from './StarRating';
import ReviewPopup from './ReviewDialog';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './overview.css';
import { useAuth } from './context/Auth/AuthContextProvider';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

const OverviewPopup = ({ doctorData, onClose }) => {
  const [reviews, setReviews] = useState([]);
  const {user} =useAuth();
  const {isLoging} =useAuth();
  const [averageRating, setAverageRating] = useState(0);
  const [selectedReview, setSelectedReview] = useState(null); 
  const [isReviewPopupOpen, setIsReviewPopupOpen] = useState(false);

  const handleReviewPopupOpen = () => {
    if (isLoging) {
      setIsReviewPopupOpen(true);
    }
    else {
      toast.error("You're not logged in!", {
        position: 'top-center',
        autoClose: 1500,
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
        <button onClick={handleShowPopup}>Show</button>
      </div>
    );
  };

  const columnDefs = [
    {
      headerName: 'Reviewer', field: 'reviewer', sortable: true,
      flex: 1,
      filter: true,
      resizable: true,
    },
    {
      headerName: 'Date', field: 'date', sortable: true,
      flex: 1,
      filter: true,
      resizable: true,
    },
    {
      headerName: 'Stars',
      field: 'rating', sortable: true,
      flex: 1,
      filter: true,
      resizable: true,
      cellRenderer: ({ value }) => <StarRating rating={value} readOnly />
    },
    {
      headerName: 'Notes',
      field: 'notes',
      cellRenderer: NotesCellRenderer,
      sortable: true,
      flex: 1,
      filter: true,
      resizable: true,
    },
  ];

  return (
    <div className="popup-container">
      <div className="popup-body">
        <div className="overview-popup">
          <h2>Doctor Overview</h2>
          <div className="doctor-info">
            <h3>{doctorData.doctor}</h3>
            <p>Specialty: {doctorData.major}</p>
            <p>address: {doctorData.address}</p>
            <p>city: {doctorData.city}</p>
            <p>phone: {doctorData.mobile}</p>
            <p>Average Rating:</p>
            <StarRating rating={averageRating} readOnly />
            <button className="rate-button" onClick={handleReviewPopupOpen}>
              Rate
            </button>
          </div>

          <h3>Reviews</h3>
          <div className="ag-theme-alpine" style={{ height: '300px' }}>

            <AgGridReact
              rowData={reviews}
              columnDefs={columnDefs}
              onCellClicked={(event) => {
                if (event.colDef.field === 'notes') {
                  handleShowPopup(event.data);
                }
              }}
            />

            {isPopupOpen && selectedReview && (
              <div className="notes-popup">
                <p>{selectedReview.notes}</p>
                <button onClick={handlePopupClose}>Close</button>
              </div>
            )}
            
          </div>
          {isReviewPopupOpen && isLoging &&(
            <ReviewPopup
              onSave={handleReviewSave}  
              onCancel={handleReviewPopupClose}
              doctorId={doctorData.id}
            />
          )}
          <button className="close-button" onClick={onClose}>
              Close
            </button>
            <ToastContainer></ToastContainer>
        </div>
        </div>
      </div>
      );
};

      OverviewPopup.propTypes = {
        doctorId: PropTypes.number,
      onClose: PropTypes.func.isRequired,
};

const calculateAverageRating = (reviews) => {
  let sum=0;
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      return (totalRating / reviews.length) || 0;
};

      export default OverviewPopup;
