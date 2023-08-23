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









  return (
    <>
      <div className="overflow-x-auto">
        <div className="flex justify-center">
          <div className="min-h-[400px] max-h-[400px] overflow-y-auto">
            <table className="table-fixed  min-w-lg bg-white shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="px-4 py-2">الطبيب</th>
                  <th className="px-4 py-2">المحافظة</th>
                  <th className="px-4 py-2">الجوال</th>
                  <th className="px-4 py-2">التخصص</th>
                  <th className="px-4 py-2">العنوان</th>
                  <th className="px-4 py-2">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {slice.map((el, index) => (
                  <tr
                    key={el.id}
                    className={index % 2 === 0 ? "bg-gray-100" : ""}
                  >
                    <td className="px-4 py-2">{el.doctor}</td>
                    <td className="px-4 py-2">{el.city}</td>
                    <td className="px-4 py-2">{el.mobile}</td>
                    <td className="px-4 py-2">{el.major}</td>
                    <td className="px-4 py-2">{el.address}</td>
                    <td className="px-4 py-2">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleOverviewClick(el)}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                          style={{ marginLeft: "10px" }}
                        >
                          الملخص
                        </button>
                        {isLoging && (
                          <button
                            onClick={() => handleReviewClick(el)}
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                            style={{ marginLeft: "10px" }}
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
            <TableFooter range={range} slice={slice} setPage={setPage} page={page} />

          </div>
        </div>
      </div>


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