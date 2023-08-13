import React, { useState, useEffect } from "react";
import DoctorGrid from "./doctorGrid";
import './DoctorForm.css';

const DoctorForm = () => {
  let thisregion = "";
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
    <h1 className="page-title">الشبكة الطبية</h1> <div className="col-md-12">
      <div className="row">
        <div className="col-md-4 col-12">
          <input className="form-control mb-4" name="keyword" id="keyword" type="text" defaultValue="" placeholder="كلمة البحث" onChange={handleNameChange} />
        </div> <div className="col-md-4 col-12">
          <select className="form-control js-example-basic-single md-form colorful-select dropdown-primary" name="cat" id="cat" onChange={handleSpecializationChange}>
            {majors.map((major, index) => {
              return <option key={major + index}>{major}</option>
            })}
          </select>
        </div>
        <div className="col-md-4 col-12">
          <input type="button" name="medical_search" id="medical_search" className="form-control btn-default" value="بحث" style={{ height: '38px', }} onClick={searchDoctors} />
        </div>
      </div>
    </div>
    <ul className="nav nav-tabs style-2 medical-tabs" role="tablist">
      <ul className="nav nav-tabs style-2 medical-tabs" role="tablist">
        {city.map((region, index) => {
          return (
            <li className="nav-item" role="presentation" key={index}>
              <button className="nav-link" id={"tab" + index} role="tab" key={region + index} onClick={() => handleRegionClick(region)}>{region}</button>
            </li>
          )

        })}
      </ul>


    </ul>
    <div className="tab-content">
      {filteredDoctors.length > 0 || searchClicked ? (
        <DoctorGrid doctors={[...filteredDoctors]} />
      ) : null}

    </div>


  </div>
);

}

export default DoctorForm;