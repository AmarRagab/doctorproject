import React, { useState } from "react";
import useTable from "../useTable";
import "./Table.css";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../context/Auth/AuthContextProvider";
import { Toast, toast } from "react-toastify";
import TableFooter from "./TableFooter";
import ReviewPopup from "../ReviewDialog";
import OverviewPopup from "../Overview";

const Table = ({ data, rowsPerPage }) => {
    const [page, setPage] = useState(1);
    const { slice, range } = useTable(data, page, rowsPerPage);
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



    return (
        <>
            <table className='table'>
                <thead className='tableRowHeader'>
                    <tr>
                        <th className='tableHeader'>المحافظة</th>
                        <th className='tableHeader'>الجوال</th>
                        <th className='tableHeader'>الطبيب</th>
                        <th className='tableHeader'>التخصص</th>
                        <th className='tableHeader'>العنوان</th>
                        <th className='tableHeader'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {slice.map((el) => (
                        <tr className='tableRowItems' key={el.id}>
                            <td className='tableCell'>{el.city}</td>
                            <td className='tableCell'>{el.mobile}</td>
                            <td className='tableCell'>{el.doctor}</td>
                            <td className='tableCell'>{el.major}</td>
                            <td className='tableCell'>{el.address}</td>
                            <td className='tableCell'>
                                <div className="tableCell">
                                    <button onClick={() => handleOverviewClick(el)} className="overview-button">
                                        الملخص
                                    </button>
                                    {isLoging && (
                                        <button onClick={() => handleReviewClick(el)} className="review-button">
                                            التقييم
                                        </button>
                                    )}
                                </div></td>

                        </tr>
                    ))}
                </tbody>
            </table>
            <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
            {isReviewPopupOpen && (
                <ReviewPopup
                    onSave={handleSaveReview}
                    onCancel={handleCancelReview}
                    doctorId={selectedDoctorId}
                    pagination={true}
                    paginationPageSize={10}
                />
            )}
            {isOverviewPopupOpen && (
                <OverviewPopup doctorData={data.find((doctor) => doctor.id === selectedDoctorId)} onClose={() => setIsOverviewPopupOpen(false)} />
            )}
            <ToastContainer></ToastContainer>
        </>
    );
};

export default Table;