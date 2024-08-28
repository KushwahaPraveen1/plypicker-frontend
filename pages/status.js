import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import { useRouter } from 'next/router';
import withAuth from './withAuth';
import Image from 'next/image';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Status = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
const router = useRouter();

  // Only execute on the client side


  useEffect(() => {
    // This code will only run on the client side
    const storedToken = sessionStorage.getItem('token');
    setToken(storedToken);

    if (storedToken) {
      fetchRequests(storedToken);
    } else {
      setError('No token found. Please log in.');
    }
  }, []);

  const fetchRequests = async (token) => {
    try {
      const response = await fetch('https://plypicker-backend-xjn6.onrender.com/api/requests/getrequests', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error('Error fetching requests:', error);
      setError('Failed to fetch requests. Please try again later.');
    }
  };

  const handleApprove = async (id) => {
    if (!token) {
      setError('No token found. Please log in.');
      return;
    }
  
    toast.info('Approving the request', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark"
    });
  
    try {
      const response = await fetch(`https://plypicker-backend-xjn6.onrender.com/api/requests/request/${id}/approve`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Resource not found. Check the endpoint URL.');
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Delay of 2 seconds
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success toast and refresh
      toast.success('Request Approved', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark" 
      });
  
      fetchRequests(token); // Refresh the requests after approval
    } catch (error) {
      console.error('Error approving request:', error);
      setError('Failed to approve request. Please try again later.');
      toast.success('Failed to Approve request. Please try again later.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      });
    }
  };

  const handleReject = async (id) => {
    if (!token) {
      setError('No token found. Please log in.');
      return;
    }
  
    toast.info('Rejecting the request', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark" 
    });
  
    try {
      const response = await fetch(`https://plypicker-backend-xjn6.onrender.com/api/requests/request/${id}/reject`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Resource not found. Check the endpoint URL.');
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Delay of 2 seconds
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success toast and refresh
      toast.success('Request Rejected', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      });
  
      fetchRequests(token); // Refresh the requests after rejection
    } catch (error) {
      console.error('Error rejecting request:', error);
      setError('Failed to reject request. Please try again later.');
      toast.success('Failed to reject request. Please try again later.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'green';
      case 'rejected':
        return 'red';
      case 'pending':
        return '#f7d635';
      default:
        return 'gray'; // Default color for unknown statuses
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: '20px' }}>
       <h1 style={{textAlign:'center'}}>Product List</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
          {requests.map(request => (
            <div key={request._id} style={{
              border: '1px solid #ddd',
              padding: '10px',
              borderRadius: '5px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '300px',
              width: '100%',
              boxSizing: 'border-box'
            }}>
              <h3 style={{ fontSize: '16px', margin: '0 0 10px', textAlign: 'center' }}>
                <b><i><u>{request.requestData.productName}</u></i></b>
              </h3>
              <Image
                src={request.requestData.image}
                width={100} height={100}
                alt={request.requestData.productName}
                style={{
                  width: '100%',
                  height: '200px',
                  maxHeight: '200px',
                  objectFit: 'cover',
                  borderRadius: '5px',
                  marginBottom: '10px'
                }}
              />
              <p style={{ textAlign: 'left', margin: '5px 0', fontSize: '14px' }}>
                <b><i><u>Price: </u></i></b>${request.requestData.price}
              </p>
              <p style={{ textAlign: 'left', margin: '5px 0', fontSize: '14px' }}>
                <b><i><u>Description: </u></i></b>{request.requestData.productDescription}
              </p>
              <p style={{ textAlign: 'left', margin: '5px 0', fontSize: '14px' }}>
                <b><i><u>Department: </u></i></b>{request.requestData.department}
              </p>
              <p style={{ textAlign: 'left', margin: '5px 0', fontSize: '14px', display: 'flex', alignItems: 'center' }}>
                <strong>Status:</strong>
                <span style={{
                  display: 'inline-block',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: getStatusColor(request.status),
                  marginRight: '8px',
                  marginLeft: '5px'
                }}></span>
                <span style={{
                  fontWeight: 'bold',
                  color: getStatusColor(request.status)
                }}>
                  {request.status}
                </span>
              </p>
              {request.status !== 'approved' && request.status !== 'rejected' && (
                <div style={{ display: 'flex', gap: '5px' }}>
                  <button
                    onClick={() => handleApprove(request._id)}
                    style={{ backgroundColor: '#4CAF50', color: '#FFFFFF', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(request._id)}
                    style={{ backgroundColor: '#f44336', color: '#FFFFFF', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default withAuth(Status,['/status']);
