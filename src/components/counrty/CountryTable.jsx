import React, { useState, useEffect } from "react";
import {useNavigate } from "react-router-dom";


function CountryTable(){

    
    const [data, setdata] = useState([]);
    const navigate = useNavigate();
   
    
    // Using useEffect for single rendering
    
    useEffect(() => {
        fetch("https://assignment2-db.herokuapp.com/country/data").then((res) =>
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
                    <th scope="col">Country Name</th>
                    <th scope="col">Population</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
    </table>

   }

   function handleEdit(id){
    navigate("https://assignment2-db.herokuapp.com/country/editCountry", {      state: {
        userId: id,
      }})
   }
   function handleDelete(id){

    console.log(id);
    fetch('https://assignment2-db.herokuapp.com/country/delete/'+id, {
        method: 'DELETE',
        header: {
           'Accept' : 'application/json',
           'Content-Type' : 'application/json',
          }
        })
    setdata(data.filter(record=>record.cname !== id))
   }
 
    return ( <div>
            
            <table className="table table-hover ">
            <thead>
                <tr className="table-primary">
                <th scope="col">Country Name</th>
                <th scope="col">Population</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
            {data.map((item) => (
                
                <tr key={item.cname}>
                    <td>{item.cname}</td>
                    <td>{item.population}</td>
                    <td> 
                        <button type="button" onClick = {()=>{handleEdit(item.cname)}} className="btn btn-success tableButton{">Edit</button>
                        <button onClick = {()=>{handleDelete(item.cname)}} className="btn btn-danger tableButton{">Delete</button>
                    </td>
                 </tr>
             ))}
            </tbody>
            </table>
      </div>
    );
}

export default CountryTable;