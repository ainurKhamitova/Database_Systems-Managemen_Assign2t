import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddDiscover(){
  const navigate =useNavigate();

  const [data, setData] = useState({
    cname: "",
    disease_code: "",
    first_enc_date: ""
  })

  

    let handleSubmit = async (e) => {

      e.preventDefault();
    
      const requestOptions = {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    fetch('https://assignment2-db.herokuapp.com/discover/add', requestOptions)
        .then(res => res.text())
        .then(text => console.log(text))
        .then(data =>{
            navigate("/discover")
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
  
    return (<section className="vh-200 gradient-custom">
    <div className="container py-5 h-100">
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-12 col-lg-9 col-xl-7">
          <div className="card shadow-2-strong card-registration">
            <div className="card-body p-4 p-md-5">
              <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Add Discover Form</h3>
                <form onSubmit={handleSubmit}>
                  <div className="row">
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
                
                    <div class="col-md-6 mb-4">

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
                          id="first_enc_date"
                          type="date"
                          value={data.first_enc_date}
                          name ="first_enc_date"
                          className="form-control form-control-lg" 
                          onChange={handleChange}
                        />
                        <label className="form-label" for="first_enc_date">first enc date</label>
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
  
  export default AddDiscover;
