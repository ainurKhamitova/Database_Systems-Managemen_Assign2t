import React from "react";
import PublicServantTable from "../components/publicServant/PublicServantTable";
import { useNavigate } from "react-router-dom";

function PublicServant(){
    const navigate = useNavigate();
    function handleClick(){
        navigate("/publicServant/addPublicServant")
    }
    return <div> 
    <h2>PublicServant Table</h2>
    <button className="btn btn-info btn-slg btnAdd" onClick = {handleClick}>Add</button>
    <PublicServantTable />
</div>
}

export default PublicServant;