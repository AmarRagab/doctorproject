import React, { useState } from "react";

import { AgGridReact } from "ag-grid-react";

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const DoctorGrid = ({doctors}) =>{
console.log(doctors);
const[rowData,setRowData]=useState(doctors);

const [columnDefs,setColumnDefs]=useState([
    {field:'العنوان', sortable:true, filter:true},
    {field:'التخصص', sortable:true, filter:true},
    {field:'الطبيب', sortable:true, filter:true},
    {field:'الجوال', sortable:true, filter:true},
    {field:'المحافظة', sortable:true, filter:true}
]);


return (
    <div className="ag-theme-alpine" style={{ height: '400px', width: '100%' }}>
      <AgGridReact 
      rowData={rowData}
      columnDefs={columnDefs}
      
      />
    </div>
  );

}

export default DoctorGrid;