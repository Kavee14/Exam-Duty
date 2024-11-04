import React from 'react';
import './RequestButton.css';
import {useNavigate} from "react-router-dom";

const RequestButton = () => {
  const navigate = useNavigate();

  const Duties = () => {
    navigate('/duties');
  }
  return (
    <button className="request-button" onClick={Duties}>Request</button>
  );
};

export default RequestButton;
