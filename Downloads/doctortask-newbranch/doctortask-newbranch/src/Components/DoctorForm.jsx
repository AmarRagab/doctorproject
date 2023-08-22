import React, { useState, useEffect } from "react";
import Table from "./Table/Table";
import {fetchApiData} from "../services/api";

const DoctorForm = () => {
  let thisregion = 'الجميع';
  const [name, setName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);
  const [majors, setMajors] = useState([]);
  const [city, setCity] = useState([]);


  useEffect(() => {
    fetchData();


  }, []);


  const fetchData = async () => {
      try {
        const data =await fetchApiData();
        console.log(data);
        setDoctors([...data.data]);
        setFilteredDoctors([...data.data]);
        const forMajor = data.data.map((doctor) => doctor.major);
        setMajors(['جميع التخصصات', ...forMajor]);
        const forCity = data.data.map((doctor) => doctor.city);
        const arrayforsort = ['الجميع', ...forCity.sort()];
        for (let i = 0; i < arrayforsort.length; ++i) {
          if (city.indexOf(arrayforsort[i]) < 0) {
            city.push(arrayforsort[i])
          }
        }
      }
      catch (error) {
        console.error('Error fetching data:', error);
      }
    }



const handleNameChange = (event) => {
  setName(event.target.value);
};

const handleSpecializationChange = (event) => {
  setSpecialization(event.target.value);
};

const handleRegionClick = (region) => {
  thisregion = region;
  if (thisregion === 'الجميع') {
    setFilteredDoctors(doctors);
  }
  applyFilters();


};

const applyFilters = () => {
  if (thisregion === 'الجميع' && specialization.length === 0 && thisregion.length === 0) {
    setFilteredDoctors(doctors);

  }
  else {
    const filtered = doctors.filter((doctor) => {
      const nameMatch = name.length === 0 || doctor.doctor.includes(name);
      const specMatch = specialization.length === 0 || doctor.major === specialization || specialization === "جميع التخصصات";
      const regionMatch = thisregion.length === 0 || doctor.city === thisregion || thisregion === "الجميع";
      return nameMatch && specMatch && regionMatch;
    });
    setFilteredDoctors(filtered);
  }

};




const searchDoctors = () => {
  setSearchClicked(true);
  applyFilters();


}








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
                className={`block py-1 px-1.5 sm:px-4 text-gray-500 hover:text-blue-500 hover:bg-blue-50 transition duration-300 focus:outline-none rounded-lg ${thisregion === region ? "text-blue-500" : ""
                  }`}
                id={"tab" + index}
                onClick={() => handleRegionClick(region)}
              >
                {region}
              </button>
              {thisregion === region && (
                <span className="absolute inset-x-0 bottom-0 h-1 bg-blue-500 transform scale-x-0 transition-transform group-hover:scale-x-100 origin-center"></span>
              )}
            </div>
          ))}
        </div>
      </div>


    </div>


    <div className="tab-content mt-4">
      {filteredDoctors.length > 0 || searchClicked ? (
        <Table data={[...filteredDoctors]} rowsPerPage={5}></Table>
      ) : null}
    </div>
  </div>

);

}

export default DoctorForm;