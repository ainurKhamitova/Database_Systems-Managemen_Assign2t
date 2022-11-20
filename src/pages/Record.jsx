import React from "react";
import RecordTable from "../components/record/RecordTable";
import { useNavigate } from "react-router-dom";

function Record(){
    const navigate = useNavigate();
    function handleClick(){
        navigate("/record/addRecord")
    }
    return <div> 
    <h2>Record Table</h2>
    <button className="btn btn-info btn-slg btnAdd" onClick = {handleClick}>Add</button>
    <RecordTable />
</div>
}

export default Record;