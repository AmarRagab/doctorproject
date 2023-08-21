import React, { useEffect } from "react";


const TableFooter = ({ range, setPage, page, slice }) => {
    useEffect(() => {
        if (slice.length < 1 && page !== 1) {
            setPage(page - 1);
        }
    }, [slice, page, setPage]);

    return (
        <div className="flex justify-center items-center mt-4 space-x-2"
        style={{marginBottom:"50px"}}>
            {range.map((el, index) => (
                <button
                    key={index}
                    className={`px-3 py-1 rounded-md focus:outline-none ${page === el ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"
                        }`}
                    onClick={() => setPage(el)}
                    style={{ marginLeft: "10px" }}

                >
                    {el}
                </button>
            ))}
        </div>
    );
};


export default TableFooter;