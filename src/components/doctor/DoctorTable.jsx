import React, { useState, useEffect } from "react";
import {useNavigate } from "react-router-dom";


function DoctorTable(){

    
    const [data, setdata] = useState([]);
    const navigate = useNavigate();
   
    
    // Using useEffect for single rendering
    
    useEffect(() => {
        fetch("/doctor/data").then((res) =>
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
                    <th scope="col">Degree</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
    </table>

   }

   function handleEdit(id){
    navigate("/doctor/editDoctor", {      state: {
        userId: id,
      }})
   }
   function handleDelete(id){

    console.log(id);
    fetch('/doctor/delete/'+id, {
        method: 'DELETE',
        header: {
           'Accept' : 'application/json',
           'Content-Type' : 'application/json',
          }
        })
    setdata(data.filter(record=>record.email !== id))
   }
 
    return ( <div>
            
            <table className="table table-hover ">
            <thead>
                <tr className="table-primary">
                <th scope="col">Email</th>
                <th scope="col">Degree</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
            {data.map((item) => (
                
                <tr key={item.email}>
                    <td>{item.email}</td>
                    <td>{item.degree}</td>
                    <td> 
                        <button type="button" onClick = {()=>{handleEdit(item.email)}} className="btn btn-success tableButton{">Edit</button>
                        <button onClick = {()=>{handleDelete(item.email)}} className="btn btn-danger tableButton{">Delete</button>
                    </td>
                 </tr>
             ))}
            </tbody>
            </table>
      </div>
    );
}

export default DoctorTable;