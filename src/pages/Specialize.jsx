import React from "react";
import SpecializeTable from "../components/specialize/SpecializeTable";
import { useNavigate } from "react-router-dom";

function Specialize(){
    const navigate = useNavigate();
    function handleClick(){
        navigate("/specilaize/addSpecialize")
    }
    return <div> 
    <h2>Specialize Table</h2>
    <button className="btn btn-info btn-slg btnAdd" onClick = {handleClick}>Add</button>
    <SpecializeTable />
</div>
}

export default Specialize;