import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function EditRecord(props){
  const [data, setData] = useState({
  })
  const location = useLocation();
  const navigate =useNavigate();

  // get userId
  let id =location.state.userId;
  
   
  // Using useEffect for single rendering
  useEffect(() => {
      // Using fetch to fetch the api from 
      // flask server it will be redirected to proxy
      fetch("/record/get/"+id.email+"/"+id.cname+"/"+id.disease_code).then((res) =>
          res.json().then((data) => {
              // Setting a data from api
              setData(data)
              
          })
      );
  }, []);


  let handleSubmit = async (e) => {

    e.preventDefault();
  
    const requestOptions = {
      method: "POST",
      headers: {
          'content-type': 'application/json'
      },
      body: JSON.stringify(data)
  }

  fetch('/record/update/'+id.email+"/"+id.cname+"/"+id.disease_code, requestOptions)
      .then(res => res.text())
      .then(text => console.log(text))
      .then(data =>{
          navigate("/record")
      }).catch(err => console.log(err))

    }


function handleChange(event) {
  const { name, value } = event.target;

  setData(prevValue => {
    return {...prevValue,
      [name]: value
    };
  });

}

if(data == null){
  return <p>No data</p>
}
return (<section className="vh-200 gradient-custom">
<div className="container py-5 h-100">
  <div className="row justify-content-center align-items-center h-100">
    <div className="col-12 col-lg-9 col-xl-7">
      <div className="card shadow-2-strong card-registration">
        <div className="card-body p-4 p-md-5">
          <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Edit Record Form</h3>
            <form onSubmit={handleSubmit}>
              <div classiv className="row">
                    <div className="col-md-6 mb-4">

                      <div class="form-outline">
                        <input
                          id="email"
                          type="email"
                          value={data.email}
                          name ="email"
                          className="form-control form-control-lg" 
                          onChange={handleChange}
                        />
                        <label className="form-label" for="email">Email</label>
                      </div>
                    </div>

                    <div className="col-md-6 mb-4">

                      <div class="form-outline">
                        <input
                          id="cname"
                          type="text"
                          value={data.cname}
                          name ="cname"
                          className="form-control form-control-lg" 
                          onChange={handleChange}
                        />
                        <label className="form-label" for="cname">Country Name</label>
                      </div>
                    </div>

                    <div className="col-md-6 mb-4">

                      <div class="form-outline">
                        <input
                          id="disease_code"
                          type="text"
                          value={data.disease_code}
                          name ="disease_code"
                          className="form-control form-control-lg" 
                          onChange={handleChange}
                        />
                        <label className="form-label" for="disease_code">Disease Code</label>
                      </div>
                    </div>
                
                    <div class="col-md-6 mb-4">

                      <div class="form-outline">
                        <input
                          id="total_deaths"
                          type="text"
                          value={data.total_deaths}
                          name ="total_deaths"
                          className="form-control form-control-lg" 
                          onChange={handleChange}
                        />
                        <label className="form-label" for="total_deaths">Total Deaths</label>
                      </div>
                    </div>

                    <div class="col-md-6 mb-4">

                      <div class="form-outline">
                        <input
                          id="total_patients"
                          type="text"
                          value={data.total_patients}
                          name ="total_patients"
                          className="form-control form-control-lg" 
                          onChange={handleChange}
                        />
                        <label className="form-label" for="total_patients">Total Patients</label>
                      </div>
                    </div>
                    
              </div>
              

              <div className="mt-4 pt-2">
                <input className="btn btn-primary btn-lg" type="submit" value="Submit" />
              </div>
            </form>
           </div>
         </div>
      </div>
    </div>
  </div>
</section>
);
}

 export default EditRecord; 
  

  
      