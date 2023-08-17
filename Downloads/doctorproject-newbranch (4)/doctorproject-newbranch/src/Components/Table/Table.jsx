import React, { useState } from "react";
import useTable from "../useTable";
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
      <div className="overflow-x-auto">
  <div className="flex justify-center">
    <table className="table-auto w-full max-w-lg bg-white shadow-md rounded-lg overflow-hidden">
    <thead className="bg-blue-600 text-white">
      <tr>
        <th className="py-2 px-3">المحافظة</th>
        <th className="py-2 px-3">الجوال</th>
        <th className="py-2 px-3">الطبيب</th>
        <th className="py-2 px-3">التخصص</th>
        <th className="py-2 px-3">العنوان</th>
        <th className="py-2 px-3">الإجراءات</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-300">
      {slice.map((el, index) => (
        <tr key={el.id} className={index % 2 === 0 ? "bg-gray-100" : ""}>
          <td className="py-2 px-3">{el.city}</td>
          <td className="py-2 px-3">{el.mobile}</td>
          <td className="py-2 px-3">{el.doctor}</td>
          <td className="py-2 px-3">{el.major}</td>
          <td className="py-2 px-3">{el.address}</td>
          <td className="py-2 px-3">
            <div className="flex space-x-2">
              <button
                className="py-1 px-2 rounded bg-green-600 text-white hover:bg-green-700 transition duration-300"
                onClick={() => handleOverviewClick(el)}
              >
                الملخص
              </button>
              {isLoging && (
                <button
                  className="py-1 px-2 rounded bg-purple-600 text-white hover:bg-purple-700 transition duration-300"
                  onClick={() => handleReviewClick(el)}
                >
                  التقييم
                </button>
              )}
            </div>
          </td>
        </tr>
      ))}
    </tbody>
    </table>
  </div>
</div>
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
  <OverviewPopup
    doctorData={data.find((doctor) => doctor.id === selectedDoctorId)}
    onClose={() => setIsOverviewPopupOpen(false)}
  />
)}
<ToastContainer />

        </>
      );
      
      
};

export default Table;