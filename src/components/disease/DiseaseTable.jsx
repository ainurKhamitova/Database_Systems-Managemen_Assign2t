import React, { useState, useEffect } from "react";
import {useNavigate } from "react-router-dom";


function DiseaseTable(){

    
    const [data, setdata] = useState([]);
    const navigate = useNavigate();
   
    
    // Using useEffect for single rendering
    
    useEffect(() => {
        fetch("https://assignment2-db.herokuapp.com/disease/data").then((res) =>
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
                    <th scope="col">Disease Code</th>
                    <th scope="col">Pathogen</th>
                    <th scope="col">Description</th>
                    <th scope="col">ID</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
    </table>

   }

   function handleEdit(id){
    navigate("/disease/editDisease", {      state: {
        userId: id,
      }})
   }
   function handleDelete(id){

    console.log(id);
    fetch('https://assignment2-db.herokuapp.com/disease/delete/'+id, {
        method: 'DELETE',
        header: {
           'Accept' : 'application/json',
           'Content-Type' : 'application/json',
          }
        })
    setdata(data.filter(record=>record.disease_code !== id))
   }
 
    return ( <div>
            
            <table className="table table-hover ">
            <thead>
                <tr className="table-primary">
                    <th scope="col">Disease Code</th>
                    <th scope="col">Pathogen</th>
                    <th scope="col">Description</th>
                    <th scope="col">ID</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
            {data.map((item) => (
                
                <tr key={item.disease_code}>
                    <td>{item.disease_code}</td>
                    <td>{item.pathogen}</td>
                    <td>{item.description}</td>
                    <td>{item.id}</td>
                    <td> 
                        <button type="button" onClick = {()=>{handleEdit(item.disease_code)}} className="btn btn-success tableButton{">Edit</button>
                        <button onClick = {()=>{handleDelete(item.disease_code)}} className="btn btn-danger tableButton{">Delete</button>
                    </td>
                 </tr>
             ))}
            </tbody>
            </table>
      </div>
    );
}

export default DiseaseTable;