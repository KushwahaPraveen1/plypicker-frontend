import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import withAuth from './withAuth';
import Navbar from './navbar';
const UserRequests = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null); // To handle errors
  const token = typeof window !== 'undefined' ? sessionStorage.getItem('token') : null;
  const loggedInUserId = typeof window !== 'undefined' && sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user'))._id : null;

   const router = useRouter();



  useEffect(() => {
    // Check if we have the necessary data before making the request
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
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Filter requests based on the logged-in user's ID
      const filteredRequests = data.filter(request => 
        request.teamMemberId && request.teamMemberId._id === loggedInUserId
      );
      setRequests(filteredRequests);
    })
    .catch(error => {
      console.error('Error fetching requests:', error);
      setError('Failed to fetch requests.');
    });
  }, [token, loggedInUserId]); // Ensure dependencies are included

  // Function to determine color based on status
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
              borderRadius: '5px', 
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
              padding: '15px', 
              backgroundColor: '#fff',
              width: '200px', // Fixed width for each card
              overflow: 'hidden' // Ensure content doesn't overflow
            }}>
              <h3 style={{ fontSize: '18px', margin: '0 0 10px', color: '#333' }}>Product ID: {request.productId}</h3>
              <p style={{ margin: '5px 0', fontSize: '14px' }}>
                <strong>Product Name:</strong> {request.requestData.productName}
              </p>
              <p style={{ margin: '5px 0', fontSize: '14px' }}>
                <strong>Price:</strong> ${request.requestData.price}
              </p>
              <p style={{ margin: '5px 0', fontSize: '14px' }}>
                <strong>Image:</strong> 
                <img 
                  src={request.requestData.image} 
                  alt={request.requestData.productName} 
                  style={{ width: '100px', height: 'auto', borderRadius: '4px', border: '1px solid #ddd' }} 
                />
              </p>
              <p style={{ margin: '5px 0', fontSize: '14px' }}>
                <strong>Description:</strong> {request.requestData.productDescription}
              </p>
              <p style={{ margin: '5px 0', fontSize: '14px' }}>
                <strong>Department:</strong> {request.requestData.department}
              </p> 
              
              <p style={{ margin: '5px 0', fontSize: '14px', display: 'flex', alignItems: 'center' }}>
                <strong>Status:</strong>
                <span style={{ 
                  display: 'inline-block', 
                  width: '10px', 
                  height: '10px', 
                  borderRadius: '50%', 
                  backgroundColor: getStatusColor(request.status), 
                  marginRight: '8px',
                  marginLeft:'5px'
                }}></span>
                <span style={{ 
                  fontWeight: 'bold', 
                  color: getStatusColor(request.status) // Apply the color based on status
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
