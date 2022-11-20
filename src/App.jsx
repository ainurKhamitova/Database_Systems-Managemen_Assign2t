import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";

import Country from "./pages/Country";
import AddCountry from "./components/counrty/AddCountry";
import EditCountry from "./components/counrty/EditCountry";


import DiseaseType from "./pages/DiseaseType";
import AddDiseaseType from "./components/diseaseType/AddDiseaseType";
import EditDiseaseType from "./components/diseaseType/EditDiseaseType";


import Disease from "./pages/Disease";
import AddDisease from "./components/disease/AddDisease";
import EditDisease from "./components/disease/EditDisease";

import Discover from "./pages/Discover";
import AddDiscover from "./components/discover/AddDiscover";
import EditDiscover from "./components/discover/EditDiscover";

import User from "./pages/User";
import AddUser from "./components/users/AddUser";
import EditUser from "./components/users/EditUser";

import PublicServant from "./pages/PublicServant";
import AddPublicServant from "./components/publicServant/AddPublicServant";
import EditPublicServant from "./components/publicServant/EditPublicServant";

import Doctor from "./pages/Doctor";
import AddDoctor from "./components/doctor/AddDoctor";
import EditDoctor from "./components/doctor/EditDoctor";

import Specialize from "./pages/Specialize";
import AddSpecialize from "./components/specialize/AddSpecialize";
import EditSpecialize from "./components/specialize/EditSpecialize";

import Record from "./pages/Record";
import AddRecord from "./components/record/AddRecord";
import EditRecord from "./components/record/EditRecord";

function App(){

  return  ( 
  <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="/country" element={<Country />} />
          <Route path="/country/addCountry" element={<AddCountry />} />
		  <Route path="/country/editCountry" element={<EditCountry />} />

		  <Route path="/diseaseType" element={<DiseaseType />} />
          <Route path="/diseaseType/addDiseaseType" element={<AddDiseaseType />} />
		  <Route path="/diseaseType/editDiseaseType" element={<EditDiseaseType />} />

		  <Route path="/disease" element={<Disease />} />
          <Route path="/disease/addDisease" element={<AddDisease />} />
		  <Route path="/disease/editDisease" element={<EditDisease />} />

		  <Route path="/discover" element={<Discover />} />
          <Route path="/discover/addDiscover" element={<AddDiscover />} />
		  <Route path="/discover/editDiscover" element={<EditDiscover />} />

		  <Route path="/user" element={<User />} />
          <Route path="/user/addUser" element={<AddUser />} />
		  <Route path="/user/editUser" element={<EditUser />} />

		  <Route path="/publicServant" element={<PublicServant />} />
          <Route path="/publicServant/addPublicServant" element={<AddPublicServant />} />
		  <Route path="/publicServant/editPublicServant" element={<EditPublicServant />} />

		  <Route path="/doctor" element={<Doctor />} />
          <Route path="/doctor/addDoctor" element={<AddDoctor />} />
		  <Route path="/doctor/editDoctor" element={<EditDoctor />} />

		  <Route path="/specialize" element={<Specialize />} />
          <Route path="/specilaize/addSpecialize" element={<AddSpecialize />} />
		  <Route path="/specialize/editSpecialize" element={<EditSpecialize />} />

		  <Route path="/record" element={<Record/>} />
          <Route path="/record/addRecord" element={<AddRecord />} />
		  <Route path="/record/editRecord" element={<EditRecord />} />

		  
          <Route path="*" element={<p>404. Page do not exist</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
    
  )
}







export default App;


