import React, { useState, useEffect } from 'react';
import useAxios from '../utils/useAxios';

const AdminDashboard = () => {
  const [evidence, setEvidence] = useState([]);
  const axiosInstance = useAxios();

  useEffect(() => {
    getEvidence();
  }, []);

  const getEvidence = async () => {
    const response = await axiosInstance.get('/evidence/');
    if (response.status === 200) {
      setEvidence(response.data);
    }
  };

  console.log(evidence);

  return (
    <div>
      <h1>Admin Dashboard</h1>
    </div>
  );
};

export default AdminDashboard;