import React, { useState, useEffect } from "react";
import Table from "./Table/Table";

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
      const response = await fetch('https://www.mashreqins.com/ar/data/0/0/0?draw=1&columns%5B0%5D%5Bdata%5D=address&columns%5B0%5D%5Bname%5D=address&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=true&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=major&columns%5B1%5D%5Bname%5D=major&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=true&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=doctor&columns%5B2%5D%5Bname%5D=doctor&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=true&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=mobile&columns%5B3%5D%5Bname%5D=mobile&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=true&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B4%5D%5Bdata%5D=city&columns%5B4%5D%5Bname%5D=city&columns%5B4%5D%5Bsearchable%5D=true&columns%5B4%5D%5Borderable%5D=true&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false&order%5B0%5D%5Bcolumn%5D=0&order%5B0%5D%5Bdir%5D=asc&start=0&length=10&search%5Bvalue%5D=&search%5Bregex%5D=false&_=1691327610401');
      const data = await response.json();
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



    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSpecializationChange = (event) => {
    setSpecialization(event.target.value);
  };

  const handleRegionClick = (region) => {
    thisregion = region;
    if(thisregion === 'الجميع'){
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
        const specMatch = specialization.length === 0 || doctor.major === specialization || specialization === "جميع التخصصات" ;
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
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg">
            Search Doctors
          </button>
        </div>
      </div>
     <div
  className="col-md-12 mt-4"
  style={{ backgroundImage: 'url("https://www.mashreqins.com/assets/images/background-img-6.jpg")' }}
>


      <h1 className="page-title text-2xl md:text-3xl text-center mt-4">الشبكة الطبية</h1>
    <div
  className="col-md-12 mt-4"
>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <input
            className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
            name="keyword"
            id="keyword"
            type="text"
            defaultValue=""
            placeholder="كلمة البحث"
            onChange={handleNameChange}
          />
        </div>
        <div>
          <select
            className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
            name="cat"
            id="cat"
            onChange={handleSpecializationChange}
          >
            {majors.map((major, index) => {
              return <option key={major + index}>{major}</option>;
            })}
          </select>
        </div>
        <div>
          <button
            type="button"
            name="medical_search"
            id="medical_search"
            className="w-full bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition duration-300"
            onClick={searchDoctors}
          >
            بحث
          </button>
        </div>
      </div>
    </div>
    <ul className="flex items-center justify-center space-x-2 bg-white rounded-lg p-2 shadow-md mt-4">
  {city.map((region, index) => (
    <li
      className="group relative cursor-pointer"
      key={index}
    >
      <button
        className="block py-2 px-4 text-gray-500 hover:text-blue-500 hover:bg-blue-50 transition duration-300 focus:outline-none rounded-lg"
        id={"tab" + index}
        onClick={() => handleRegionClick(region)}
      >
        {region}
      </button>
      <span className="absolute inset-x-0 bottom-0 h-1 bg-blue-500 transform scale-x-0 transition-transform group-hover:scale-x-100 origin-center"></span>
    </li>
  ))}
</ul>

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