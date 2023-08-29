import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setNameFilter,
  setSpecializationFilter,
  setRegionFilter,
  applyFilters,
  fetchDoctors,
} from '../Slices/doctorSlice';
import Table from './Table/Table';

const DoctorForm = () => {
  const dispatch = useDispatch();
  const {
    doctors,
    filteredDoctors,
    majors,
    city,
    nameFilter,
    specializationFilter,
    regionFilter,
  } = useSelector((state) => state.doctor);

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  const handleNameChange = (event) => {
    dispatch(setNameFilter(event.target.value));
  };

  const handleSpecializationChange = (event) => {
    dispatch(setSpecializationFilter(event.target.value));
  };

  const handleRegionClick = (region) => {
    dispatch(setRegionFilter(region));
    dispatch(applyFilters());
  };



  const searchDoctors = () => {
    dispatch(applyFilters());
  };








  return (

    <div className="main col-lg-12">
      <div className="bg-gray-800 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Find Your Perfect Doctor</h1>
          <p className="text-lg mb-8">Search and connect with top-notch medical professionals.</p>
          <a href="#search-form" className="inline-block">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg">
              Search Doctors
            </button>
          </a>
        </div>
      </div>

      <div
        className="col-md-12 mt-4"
        style={{ backgroundImage: 'url("https://www.mashreqins.com/assets/images/background-img-6.jpg")' }}
      >


        <h1 className="page-title text-2xl md:text-3xl text-center mt-4">الشبكة الطبية</h1>
        <div id="search-form" className="col-md-12 mt-4">
          <div className="flex justify-center items-center">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-4">
                <input
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  name="keyword"
                  id="keyword"
                  type="text"
                  defaultValue=""
                  placeholder="كلمة البحث"
                  onChange={handleNameChange}
                />
              </div>
              <div className="col-span-4">
                <select
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  name="cat"
                  id="cat"
                  onChange={handleSpecializationChange}
                >
                  {majors.map((major, index) => {
                    return <option key={major + index}>{major}</option>;
                  })}
                </select>
              </div>
              <div className="col-span-3">
                <button
                  type="button"
                  name="medical_search"
                  id="medical_search"
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
                  onClick={searchDoctors}
                >
                  بحث
                </button>
              </div>
            </div>
          </div>



        </div>

        <div className="text-center">
          <div className="flex justify-center overflow-x-scroll space-x-0 py-2">
            {city.map((region, index) => (
              <div className="group relative cursor-pointer flex-none" key={index}>
                <button
                  className={`block py-1 px-1.5 sm:px-4 text-gray-500 hover:text-blue-500 hover:bg-blue-50 transition duration-300 focus:outline-none rounded-lg ${regionFilter === region ? "text-blue-500" : ""
                    }`}
                  id={"tab" + index}
                  onClick={() => handleRegionClick(region)}
                >
                  {region}
                </button>
                {regionFilter === region && (
                  <span className="absolute inset-x-0 bottom-0 h-1 bg-blue-500 transform scale-x-0 transition-transform group-hover:scale-x-100 origin-center"></span>
                )}
              </div>
            ))}
          </div>
        </div>


      </div>


      <div className="tab-content mt-4">
        {filteredDoctors.length > 0 ? (
          <Table data={[...filteredDoctors]} rowsPerPage={5}></Table>
        ) : null}
      </div>
    </div>

  );

}

export default DoctorForm;