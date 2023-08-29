import { createSlice } from "@reduxjs/toolkit";

const tableSlice = createSlice({
    name: 'table',
    initialState: {
        page: 1,
        isReviewPopupOpen: false,
        isOverviewPopupOpen: false,
        selectedDoctorId: null,
    },
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setIsReviewPopupOpen: (state, action) => {
            state.isReviewPopupOpen = action.payload;
        },
        setIsOverviewPopupOpen: (state, action) => {
            state.isOverviewPopupOpen = action.payload;
        },
        setSelectedDoctorId: (state, action) => {
            state.selectedDoctorId = action.payload;
        }
    },
});


export const { setPage, setIsReviewPopupOpen, setIsOverviewPopupOpen , setSelectedDoctorId} = tableSlice.actions;

export default tableSlice.reducer;