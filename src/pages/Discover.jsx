import React from "react";
import DiscoverTable from "../components/discover/DiscoverTable";
import { useNavigate } from "react-router-dom";

function Discover(){
    const navigate = useNavigate();
    function handleClick(){
        navigate("/discover/addDiscover")
    }
    return <div> 
    <h2>Discover Table</h2>
    <button className="btn btn-info btn-slg btnAdd" onClick = {handleClick}>Add</button>
    <DiscoverTable />
</div>
}

export default Discover;