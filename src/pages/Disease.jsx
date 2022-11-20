import React from "react";
import DiseaseTable from "../components/disease/DiseaseTable";
import { useNavigate } from "react-router-dom";

function Disease(){
    const navigate = useNavigate();
    function handleClick(){
        navigate("/disease/addDisease")
    }
    return <div> 
    <h2>Disease Table</h2>
    <button className="btn btn-info btn-slg btnAdd" onClick = {handleClick}>Add</button>
    <DiseaseTable />
</div>
}

export default Disease;