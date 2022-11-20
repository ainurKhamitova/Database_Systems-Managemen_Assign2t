import React, { useState, useEffect } from "react";
import {useNavigate } from "react-router-dom";


function SpecializeTable(){

    
    const [data, setdata] = useState([]);
    const navigate = useNavigate();
   
    
    // Using useEffect for single rendering
    
    useEffect(() => {
        fetch("/specialize/data").then((res) =>
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
                    <th scope="col">ID</th>
                    <th scope="col">Email</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
    </table>

   }

   function handleEdit(id){
    navigate("/specialize/editSpecialize", {      state: {
        userId: id,
      }})
   }
   function handleDelete(key){

    console.log(key);
    fetch('/specialize/delete/'+key.id+"/"+key.email, {
        method: 'DELETE',
        header: {
           'Accept' : 'application/json',
           'Content-Type' : 'application/json',
          }
        })
    setdata(data.filter(record=>(record.id !== key.id || record.email != key.email)))
   }
 
    return ( <div>
            
            <table className="table table-hover ">
            <thead>
                <tr className="table-primary">
                <th scope="col">ID</th>
                <th scope="col">Email</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
            {data.map((item) => (
                
                <tr key={{id: item.id, email: item.email}}>
                    <td>{item.id}</td>
                    <td>{item.email}</td>
                    <td> 
                        <button type="button" onClick = {()=>{handleEdit({id: item.id, email: item.email})}} className="btn btn-success tableButton{">Edit</button>
                        <button onClick = {()=>{handleDelete({id: item.id, email: item.email})}} className="btn btn-danger tableButton{">Delete</button>
                    </td>
                 </tr>
             ))}
            </tbody>
            </table>
      </div>
    );
}

export default SpecializeTable;