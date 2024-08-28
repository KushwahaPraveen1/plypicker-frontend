import React, { useEffect, useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import withAuth from './withAuth';
import Navbar from './navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
const firebaseConfig = {
  apiKey: "AIzaSyAUmr-HZH7BbxUV84-4v-W7NhOTJ-kiT6U",
  authDomain: "internship-cb833.firebaseapp.com",
  projectId: "internship-cb833",
  storageBucket: "internship-cb833.appspot.com",
  messagingSenderId: "1039266623220",
  appId: "1:1039266623220:web:f77d2a027e06c1f42378a1",
  measurementId: "G-PBPB6SNSEE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const TeamMember = () => {
  const [products, setProducts] = useState([]);
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    fetch('https://64e0caef50713530432cafa1.mockapi.io/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, [token]);

  return (
    <>
      <Navbar/>
      <h1 style={{textAlign:'center'}}>Product List</h1>
      <div style={{ 
        width: '100%', 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        gap: '10px', 
        overflowY: 'auto' // Add scroll if needed
      }}> 
        {products.map(product => (
          <ProductItem 
            key={product.id} // Move key here
            product={product} 
            token={token} 
          />
        ))}
      </div>
    </>
  );
};


const ProductItem = ({ product, token }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [imageFile, setImageFile] = useState(null);

  const handleEditClick = () => setIsEditing(!isEditing);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSaveClick = () => {
    if (imageFile) {
      const imageRef = ref(storage, `images/${imageFile.name}`);
      uploadBytes(imageRef, imageFile).then(snapshot => {
        getDownloadURL(snapshot.ref).then(url => {
          saveProductChanges(url);
        });
      }).catch(error => {
        console.error('Error uploading image:', error);
      });
    } else {
      saveProductChanges(updatedProduct.image);
    }
  };
const fetchRequests=(()=>{window.location.reload();})
    const saveProductChanges = (imageUrl) => {
      fetch('https://plypicker-backend-xjn6.onrender.com/api/requests/request', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          productId: updatedProduct.id,
          requestData: {
            productName: updatedProduct.productName,
            price: updatedProduct.price,
            image: imageUrl,
            productDescription: updatedProduct.productDescription,
            department: updatedProduct.department
          }
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text(); // Use .text() if the response is plain text
      })
      .then(data => {
        toast.success('Request Sent Successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        console.log('Request sent successfully:', data);
        setIsEditing(false);
      })
      // .then(()=>{fetchRequests();})
      .catch(error => {
        toast.error('Error Sending Request', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        console.error('Error sending request:', error);
      });
    };
  

  return (
    
    <div>
    <div style={{ height:'380px', width: '200px', border: '1px solid #ddd', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', textAlign: 'left' }}>
  <h3 style={{ fontSize: '16px', margin: '0 0 10px' }}><b><i><u>{product.productName}</u></i></b></h3>
  <img src={product.image || '/placeholder.png'} alt={product.productName} style={{ width: '100%', height: 'auto', borderRadius: '5px' }} />
  <p style={{ margin: '5px 0', fontSize: '14px' }}><b><i><u>Price: </u></i></b>${product.price}</p>
  <p style={{ margin: '5px 0', fontSize: '14px' }}><b><i><u>Description: </u></i></b>{product.productDescription}</p>
  <p style={{ margin: '5px 0', fontSize: '14px' }}><b><i><u>Department: </u></i></b>{product.department}</p>
  <button 
  onClick={handleEditClick} 
  style={{
    backgroundColor: '#3f8ac8', // Primary color
    color: '#FFFFFF', // Text color
    border: 'none', // Remove default border
    borderRadius: '4px', // Rounded corners
    padding: '5px 15px', // Padding
    fontSize: '15px', // Font size
    cursor: 'pointer', // Pointer cursor on hover
    transition: 'background-color 0.3s ease, transform 0.2s ease', // Smooth transition
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    marginBottom:'-10px' // Shadow for depth
  }}
  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0056b3'} // Darker color on hover
  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3f8ac8'} // Reset color on leave
>
  Edit
</button>

</div> 

      {isEditing ? (
        <div style={{ 
  width: '200px', 
  border: '1px solid #ddd', 
  padding: '10px', 
  borderRadius: '5px', 
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
  backgroundColor: '#f9f9f9' // Optional background color for better contrast
}}>
  {/* Product Name Field */}
  <div style={{ marginBottom: '15px' }}>
    <label style={{ 
      display: 'block', 
      marginBottom: '5px', 
      fontSize: '14px', 
      fontWeight: 'bold', 
      color: '#333',
      textAlign: 'left' // Left-align the label text
    }}>
      Product Name
    </label>
    <input
      type="text"
      name="productName"
      value={updatedProduct.productName}
      onChange={handleInputChange}
      style={{
        width: '100%',
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxSizing: 'border-box',
        fontSize: '14px',
        fontFamily: 'Arial, sans-serif'
      }}
    />
  </div>

  {/* Price Field */}
  <div style={{ marginBottom: '15px' }}>
    <label style={{ 
      display: 'block', 
      marginBottom: '5px', 
      fontSize: '14px', 
      fontWeight: 'bold', 
      color: '#333',
      textAlign: 'left' // Left-align the label text
    }}>
      Price
    </label>
    <input
      type="text"
      name="price"
      value={updatedProduct.price}
      onChange={handleInputChange}
      style={{
        width: '100%',
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxSizing: 'border-box',
        fontSize: '14px',
        fontFamily: 'Arial, sans-serif'
      }}
    />
  </div>

  {/* Image Field */}
  <div style={{ marginBottom: '15px' }}>
    <label style={{ 
      display: 'block', 
      marginBottom: '5px', 
      fontSize: '14px', 
      fontWeight: 'bold', 
      color: '#333',
      textAlign: 'left' // Left-align the label text
    }}>
      Image
    </label>
    <input
      type="file"
      name="image"
      onChange={handleImageChange}
      style={{
        width: '100%',
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxSizing: 'border-box',
        backgroundColor: '#fff', // Background for file input
        fontFamily: 'Arial, sans-serif'
      }}
    />
  </div>

  {/* Product Description Field */}
  <div style={{ marginBottom: '15px' }}>
    <label style={{ 
      display: 'block', 
      marginBottom: '5px', 
      fontSize: '14px', 
      fontWeight: 'bold', 
      color: '#333',
      textAlign: 'left' // Left-align the label text
    }}>
      Description
    </label>
    <input
      type="text"
      name="productDescription"
      value={updatedProduct.productDescription}
      onChange={handleInputChange}
      style={{
        width: '100%',
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxSizing: 'border-box',
        fontSize: '14px',
        fontFamily: 'Arial, sans-serif'
      }}
    />
  </div>

  {/* Department Field */}
  <div style={{ marginBottom: '15px' }}>
    <label style={{ 
      display: 'block', 
      marginBottom: '5px', 
      fontSize: '14px', 
      fontWeight: 'bold', 
      color: '#333',
      textAlign: 'left' // Left-align the label text
    }}>
      Department
    </label>
    <input
      type="text"
      name="department"
      value={updatedProduct.department}
      onChange={handleInputChange}
      style={{
        width: '100%',
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxSizing: 'border-box',
        fontSize: '14px',
        fontFamily: 'Arial, sans-serif'
      }}
    />
  </div>

  <button 
    onClick={handleSaveClick} 
    style={{
      backgroundColor: '#007BFF',
      color: '#FFFFFF',
      border: 'none',
      borderRadius: '4px',
      padding: '10px 20px',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease, transform 0.2s ease',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      marginTop: '10px',
      fontFamily: 'Arial, sans-serif'
    }}
    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#007BFF'}
    onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
    onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
  >
    Save
  </button>
</div>

      ) : (
      <></>
      )}
    </div>
  );
};

export default withAuth(TeamMember, ['team_member']);
