import React from "react";
import UserTable from "../components/users/UserTable";
import { useNavigate } from "react-router-dom";

function User(){
    const navigate = useNavigate();
    function handleClick(){
        navigate("/user/addUser")
    }
    return <div> 
    <h2>User Table</h2>
    <button className="btn btn-info btn-slg btnAdd" onClick = {handleClick}>Add</button>
    <UserTable />
</div>
}

export default User;