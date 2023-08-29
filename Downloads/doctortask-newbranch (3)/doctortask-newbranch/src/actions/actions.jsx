export const setNameFilter = name => ({
    type: 'SET_NAME_FILTER',
    payload: name,
  });
  
  export const setSpecializationFilter = specialization => ({
    type: 'SET_SPECIALIZATION_FILTER',
    payload: specialization,
  });
  
  export const setRegionFilter = region => ({
    type: 'SET_REGION_FILTER',
    payload: region,
  });
  
  export const applyFilters = () => ({
    type: 'APPLY_FILTERS',
  });


  export const openReviewPopup = (doctorId) => ({
    type: 'OPEN_REVIEW_POPUP',
    payload: doctorId,
  });
  
  export const closeReviewPopup = () => ({
    type: 'CLOSE_REVIEW_POPUP',
  });
  
  export const openOverviewPopup = (doctorId) => ({
    type: 'OPEN_OVERVIEW_POPUP',
    payload: doctorId,
  });
  
  export const closeOverviewPopup = () => ({
    type: 'CLOSE_OVERVIEW_POPUP',
  });
  
export const setPage = (pageNumber) => ({
    type: 'SET_PAGE',
    payload: pageNumber,
  });
  

export const openReviewPopupforOverview = () => ({
    type: 'OPEN_REVIEW_POPUP',
  });
  
  export const closeReviewPopupforOverview = () => ({
    type: 'CLOSE_REVIEW_POPUP',
  });
  
  export const selectReview = (review) => ({
    type: 'SELECT_REVIEW',
    payload: review,
  });
  
  export const deselectReview = () => ({
    type: 'DESELECT_REVIEW',
  });
  
export const toggleMobileMenu = () => ({
    type: 'TOGGLE_MOBILE_MENU',
  });
  
  export const openMobileMenu = () => ({
    type: 'OPEN_MOBILE_MENU',
  });
  
  export const closeMobileMenu = () => ({
    type: 'CLOSE_MOBILE_MENU',
  });
  