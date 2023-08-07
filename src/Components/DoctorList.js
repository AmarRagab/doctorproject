import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const DoctorList = ({ doctors }) => {
  const gridOptions = {
    pagination: true,
    paginationPageSize: 10,
    suppressCellSelection: true,
    defaultColDef: {
      sortable: true,
      resizable: true,
    },
    columnDefs: [
      {
        headerName: 'Address',
        field: 'address',
        sortable: true,
      },
      {
        headerName: 'Major',
        field: 'major',
        sortable: true,
      },
      {
        headerName: 'Doctor',
        field: 'doctor',
        sortable: true,
      },
      {
        headerName: 'Phone',
        field: 'phone',
        sortable: true,
      },
      {
        headerName: 'City',
        field: 'city',
        sortable: true,
      },
      {
        headerName: 'Actions',
        cellRendererFramework: ActionsCellRenderer,
        width: 150,
      },
    ],
    rowData: doctors,
  };

  return (
    <div className="ag-theme-alpine" style={{ height: '400px', width: '100%' }}>
      <AgGridReact gridOptions={gridOptions} />
    </div>
  );
};

const ActionsCellRenderer = () => {
  return (
    <div>
      <button onClick={() => handleReviewClick()}>Review</button>
      <button onClick={() => handleOverviewClick()}>Overview</button>
    </div>
  );
};

const handleReviewClick = () => {
  console.log('Review clicked');
};

const handleOverviewClick = () => {
  console.log('Overview clicked');
};

export default DoctorList;
