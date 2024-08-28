import React, { useEffect } from "react";
import {useNavigate } from "react-router-dom";

const ProtectedRoute = (props) => {
    const {Component} = props
    const Navigate = useNavigate();
    useEffect(() => {
     let thankyou = sessionStorage.getItem('thankyou');
     if(!thankyou){
        Navigate('/')
     }
    })
    
  return (
   <>
<Component />
   </>
  );
};

export default ProtectedRoute;