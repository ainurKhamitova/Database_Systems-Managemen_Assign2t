import React from "react";
import CountryTable from "../components/counrty/CountryTable";
import { useNavigate } from "react-router-dom";

function Country(){
    const navigate = useNavigate();
    function handleClick(){
        navigate("/country/addCountry")
    }
    return <div> 
    <h2>Country Table</h2>
    <button className="btn btn-info btn-slg btnAdd" onClick = {handleClick}>Add</button>
    <CountryTable />
</div>
}

export default Country;