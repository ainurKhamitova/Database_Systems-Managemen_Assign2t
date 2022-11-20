import React from "react";
import DoctorTable from "../components/doctor/DoctorTable";
import { useNavigate } from "react-router-dom";

function Doctor(){
    const navigate = useNavigate();
    function handleClick(){
        navigate("/doctor/addDoctor")
    }
    return <div> 
    <h2>Doctor Table</h2>
    <button className="btn btn-info btn-slg btnAdd" onClick = {handleClick}>Add</button>
    <DoctorTable />
</div>
}

export default Doctor;