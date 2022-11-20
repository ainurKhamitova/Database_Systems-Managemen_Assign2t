import React from "react";
const Home = () => {
    return <div> 
      <section class="colored-section" id="title">
    <div class="container-fluid">
      <div className=" row">
        <div className="col-lg-6 heading-col">
          <h1 className="big heading" >CSCI 341. Database Systems. Assignment 2</h1>
        </div>

        <div className="col-lg-6">
          <h3>The schema is:</h3>
          <ul>
            <li>DiseaseType(id:integer, description:varchar(140)) </li>
            <li>Country(cname:varchar(50), population:bigint) </li>
            <li>Disease(disease code:varchar(50), pathogen:varchar(20), description:varchar(140), id:integer) References DiseaseType (id) </li>
            <li>Discover(cname:varchar(50), disease code:varchar(50), first enc date:date) References Disease (disease code), Country (cname) </li>
            <li>Users(email:varchar(60), name:varchar(30), surname:varchar(40), salary:integer, phone:varchar(20), cname:varchar(50)) References Country (cname)</li>
            <li>PublicServant(email:varchar(60), department:varchar(50)) References Users (email) </li>
            <li>Doctor(email:varchar(60), degree:varchar(20)) References Users (email) </li>
            <li>Specialize(id:integer, email:varchar(60)) References DiseaseType (id), Doctor (email)</li>
            <li>Record(email:varchar(60), cname:varchar(50), disease code:varchar(50), total deaths:integer, total patients:integer) References Disease (disease code), Country (cname), PublicServant (email)</li>
            

          </ul>


        </div>

      </div>

      
      </div>
  </section>

  <section className="white-section" ID="features">

<div className="row container-fluid ">
  <div className="col-lg-4 feature-box">
    <i className="icon fas fa-check-circle fa-4x"></i>
    <h3 className="feature-title">9 tables.</h3>
    <p>Designed based on schema.</p>
  </div>
  <div className="col-lg-4 feature-box ">
    <i className="icon fas fa-bullseye fa-4x"></i>
    <h3 className="feature-title">CRUD</h3>
    <p>Implemented for each table.</p>
  </div>
  <div className="col-lg-4 feature-box">
    <i className=" icon fas fa-heart fa-4x"></i>
    <h3 className="feature-title">Guaranteed to work.</h3>
    <p>Serve hosted on ElephantSQL.</p>
  </div>



</div>

</section>
      <footer className="coloured-section"id="footer">
      <div className="container-fluid">
        <p className="copyright">© Ainur Khamtova</p>
      </div>
    </footer>
    </div>
    
    

    
  };
  
  export default Home;