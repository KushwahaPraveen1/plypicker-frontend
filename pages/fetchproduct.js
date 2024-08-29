import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import withAuth from '../components/withAuth';
import Navbar from '../components/navbar';
import Image from 'next/image';
const UserRequests = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null); 
  const token = typeof window !== 'undefined' ? sessionStorage.getItem('token') : null;
  const loggedInUserId = typeof window !== 'undefined' && sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user'))._id : null;

   const router = useRouter();



  useEffect(() => {
     
    if (!token || !loggedInUserId) {
      setError('Authentication data is missing.');
      return;
    }

    fetch('https://plypicker-backend-xjn6.onrender.com/api/requests/getrequests', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      return response.json();
    })
    .then(data => { 
      const filteredRequests = data.filter(request => 
        request.teamMemberId && request.teamMemberId._id === loggedInUserId
      );
      setRequests(filteredRequests);
    })
    .catch(error => {
      console.error('Error fetching requests:', error);
      setError('Failed to fetch requests.');
      toast.error('Failed to fetch requests', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      if(error.message==='401')
      {
        toast.error('Unauthorized', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTimeout(() => {
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('user');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          router.push('/login');
        }, 2000);
      }
    });
  }, [token, loggedInUserId]);  
 
  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'green';
      case 'rejected':
        return 'red';
      case 'pending':
        return '#f7d635';
      default:
        return 'gray';  
    }
  };

  return (<> <Navbar/>   <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
  <h1 style={{textAlign:'center'}}>My Request</h1>
      {requests.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666' }}>No requests found.</p>
      ) : (
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '15px' // Adds space between the cards
        }}>
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
              <img
                src={request.requestData.image}
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
            </div>
          ))}
        </div>
      )}
    </div></>

  );
};

export default withAuth(UserRequests,['/fetchproduct']);
