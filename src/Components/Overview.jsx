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
  const { user } = useAuth();
  const { isLoging } = useAuth();
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
        <button onClick={handleShowPopup}>عرض</button>
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
    <div className="popup-containerr">
      <div className="popup-bodyy">
        <div className="overview-popup">
          <h2>ملخص الدكتور</h2>
          <h3>{doctorData.doctor}</h3>
          <div className="doctor-info row">
            <p className='col'>التخصص: {doctorData.major}</p>
            <p className='col'>العنوان: {doctorData.address}</p>
            <div class="w-100"></div>
            <p className='col'>المحافظة: {doctorData.city}</p>
            <p className='col'>الهاتف: {doctorData.mobile}</p>
            <div class="w-100"></div>

          </div>
          <p className='col'>معدل التقييم:</p>
          <StarRating rating={averageRating} onRatingChange={() => { }} readOnly />
          {isLoging && (<button className="rate-button" onClick={handleReviewPopupOpen}>
            قيم
          </button>)}
          <h3>التقييمات</h3>
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

            {isPopupOpen && selectedReview && (
              <div className="notes-popup">
                <p>{selectedReview.notes}</p>
                <button onClick={handlePopupClose}>اغلاق</button>
              </div>
            )}

          </div>
          {isReviewPopupOpen && isLoging && (
            <ReviewPopup
              onSave={handleReviewSave}
              onCancel={handleReviewPopupClose}
              doctorId={doctorData.id}
            />
          )}
          <button className="close-button" onClick={onClose}>
            اغلاق
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
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return (totalRating / reviews.length) || 0;
};

export default OverviewPopup;
