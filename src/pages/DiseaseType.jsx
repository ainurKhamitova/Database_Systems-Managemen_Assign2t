import React from "react";
import DiseaseTypeTable from "../components/diseaseType/DiseaseTypeTable";
import { useNavigate } from "react-router-dom";

function DiseaseType(){
    const navigate = useNavigate();
    function handleClick(){
        navigate("/diseaseType/addDiseaseType")
    }
    return <div> 
    <h2>DiseaseType Table</h2>
    <button className="btn btn-info btn-slg btnAdd" onClick = {handleClick}>Add</button>
    <DiseaseTypeTable />
</div>
}

export default DiseaseType;