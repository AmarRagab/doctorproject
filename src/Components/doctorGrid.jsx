// DoctorGrid.js
import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { address, name, major, phone, city } from './contstans';
import ReviewPopup from './ReviewDialog';
import './DoctorGrid.css';
import OverviewPopup from './Overview';
import { useAuth } from './context/Auth/AuthContextProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const DoctorGrid = ({ doctors }) => {
  const rowData = [...doctors].reverse();
  const [isReviewPopupOpen, setIsReviewPopupOpen] = useState(false);
  const [isOverviewPopupOpen, setIsOverviewPopupOpen] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const { isLoging } = useAuth();
  const { user } = useAuth();

  const handleSaveReview = (reviewData) => {
    if (selectedDoctorId) {
      const existingReviews = JSON.parse(localStorage.getItem(selectedDoctorId)) || [];
      const completeReviewData = {
        ...reviewData,
        reviewer: user.id,
        date: new Date().toISOString(),
      };
      existingReviews.push(completeReviewData);
      localStorage.setItem(selectedDoctorId, JSON.stringify(existingReviews));
      console.log(localStorage.getItem(selectedDoctorId));
    }
    setIsReviewPopupOpen(false);
  };


  const handleCancelReview = () => {
    setIsReviewPopupOpen(false);
  };




  const handleReviewClick = (doctorData) => {
    console.log('Clicked Review:', doctorData);
    console.log(JSON.parse(localStorage.getItem(selectedDoctorId)));
    if (isLoging) {
      setSelectedDoctorId(doctorData.id);
      setIsReviewPopupOpen(true);
    }
    else {
      toast.error("You're not logged in!", {
        position: 'top-center',
        autoClose: 1500,
      });
    }

  };

  const handleOverviewClick = (doctorData) => {
    console.log('Clicked Overview:', doctorData);
    setSelectedDoctorId(doctorData.id);
    setIsOverviewPopupOpen(true);
  };





  const actionsButton = (params) => {
    return (
      <div className="actions-buttons">
        <button onClick={() => handleOverviewClick(params.data)} className="overview-button">
          Overview
        </button>
        {isLoging && (
          <button onClick={() => handleReviewClick(params.data)} className="review-button">
            Open Review
          </button>
        )}
      </div>
    );
  };


  const columnDefs = [

    {
      headerName: 'Actions',
      cellRenderer: actionsButton,
      width: 220,
      sortable: false,
      filter: false,
    },
    address,
    name,
    major,
    phone,
    city,
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: '600px', width: '70%' }}>
      <AgGridReact rowData={rowData} columnDefs={columnDefs} getRowHeight={() => 80} />
      {isReviewPopupOpen && (
        <ReviewPopup
          onSave={handleSaveReview}
          onCancel={handleCancelReview}
          doctorId={selectedDoctorId}
        />
      )}
      {isOverviewPopupOpen && (
        <OverviewPopup doctorData={rowData.find((doctor) => doctor.id === selectedDoctorId)} onClose={() => setIsOverviewPopupOpen(false)} />
      )}
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default DoctorGrid;