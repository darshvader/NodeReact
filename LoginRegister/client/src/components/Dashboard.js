import React, { useEffect} from 'react';
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    let navigate = useNavigate();
    useEffect(()=>{
        if(!localStorage.getItem("userToken")){
          navigate("/");
        }
        },[]);

    return (
      <div>
        <h1>Home Page</h1>
        <p>Welcome to the home page</p>
      </div>
    );
  };
  
  export default Dashboard;