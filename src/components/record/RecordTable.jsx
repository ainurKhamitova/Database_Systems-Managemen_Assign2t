import React, { useState, useEffect } from "react";
import {useNavigate } from "react-router-dom";


function RecordTable(){

    
    const [data, setdata] = useState([]);
    const navigate = useNavigate();
   
    
    // Using useEffect for single rendering
    
    useEffect(() => {
        fetch("https://assignment2-db.herokuapp.com/record/data").then((res) =>
            res.json().then((data) => {
                console.log("fetched")
                console.log(data) 
                setdata(data)    
            })
        );
    }, []);
  

   if(data.length === 0){
    return <table className="table table-hover ">
            <thead>
                <tr className="table-primary">
                    <th scope="col">Email</th>
                    <th scope="col">Country Name</th>
                    <th scope="col">Disease Code</th>
                    <th scope="col">Total Deaths</th>
                    <th scope="col">Total Patients</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
    </table>

   }

   function handleEdit(id){
    navigate("/record/editRecord", {      state: {
        userId: id,
      }})
   }
   function handleDelete(id){

    console.log(id);
    fetch('https://assignment2-db.herokuapp.com/record/delete/'+id.email+"/"+id.cname+"/"+id.disease_code, {
        method: 'DELETE',
        header: {
           'Accept' : 'application/json',
           'Content-Type' : 'application/json',
          }
        })
    setdata(data.filter(record=>(record.email !== id.email || record.cname !== id.cname || record.disease_code !== id.disease_code)))
   }
 
    return ( <div>
            
            <table className="table table-hover ">
            <thead>
                <tr className="table-primary">
                    <th scope="col">Email</th>
                    <th scope="col">Country Name</th>
                    <th scope="col">Disease Code</th>
                    <th scope="col">Total Deaths</th>
                    <th scope="col">Total Patients</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
            {data.map((item) => (
                
                <tr key={{email: item.email, cname: item.cname, disease_code: item.disease_code}}>
                    <td>{item.email}</td>
                    <td>{item.cname}</td>
                    <td>{item.disease_code}</td>
                    <td>{item.total_deaths}</td>
                    <td>{item.total_patients}</td>
                    <td> 
                        <button type="button" onClick = {()=>{handleEdit({email: item.email, cname: item.cname, disease_code: item.disease_code})}} className="btn btn-success tableButton{">Edit</button>
                        <button onClick = {()=>{handleDelete({email: item.email, cname: item.cname, disease_code: item.disease_code})}} className="btn btn-danger tableButton{">Delete</button>
                    </td>
                 </tr>
             ))}
            </tbody>
            </table>
      </div>
    );
}

export default RecordTable;