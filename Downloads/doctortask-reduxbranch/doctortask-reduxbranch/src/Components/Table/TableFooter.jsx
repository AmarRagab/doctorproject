import React, { useEffect } from "react";
import { setPage} from "../../Slices/tableSlices";
import { useDispatch, useSelector } from "react-redux";

const TableFooter = ({ range , slice }) => {
    const dispatch=useDispatch();
    const{page}=useSelector(state => state.table);
    useEffect(() => {
        if (slice.length < 1 && page !== 1) {
            dispatch(setPage(page - 1));
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
                    onClick={() => dispatch(setPage(el))}
                    style={{ marginLeft: "10px" }}

                >
                    {el}
                </button>
            ))}
        </div>
    );
};


export default TableFooter;