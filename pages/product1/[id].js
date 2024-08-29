import React, { useEffect, useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { useRouter } from 'next/router';
import Navbar from '../../components/navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import withAuth from '../../components/withAuth';

const firebaseConfig = {
  apiKey: "AIzaSyAUmr-HZH7BbxUV84-4v-W7NhOTJ-kiT6U",
  authDomain: "internship-cb833.firebaseapp.com",
  projectId: "internship-cb833",
  storageBucket: "internship-cb833.appspot.com",
  messagingSenderId: "1039266623220",
  appId: "1:1039266623220:web:f77d2a027e06c1f42378a1",
  measurementId: "G-PBPB6SNSEE"
}; 
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  const [token, setToken] = useState(null);
  useEffect(() => {
    if (id) {
      fetch(`https://64e0caef50713530432cafa1.mockapi.io/api/products/${id}`)
        .then(response => response.json())
        .then(data => {
          setProduct(data);
          setUpdatedProduct(data);
        })
        .catch(error => console.error('Error fetching product:', error));
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };
    useEffect(() => {

    if (typeof window !== 'undefined') {
      const token = sessionStorage.getItem('token');
      setToken(token);
      
    }
  }, []);

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

    const saveProductChanges = (imageUrl) => {
        toast.info('Updating Details ... ', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
    fetch('https://plypicker-backend-xjn6.onrender.com/api/products/update', {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        productId: updatedProduct.id,
        productData: {
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
        throw new Error(`${response.status}`);
      }
      return response.text();  
    })
    .then(data => {
      console.log('Request sent successfully:', data);
      toast.success('Details Updated Successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return new Promise(resolve => setTimeout(resolve, 2000)); 
    })
    .then(() => { 
        router.push('/admin');
    })
    .catch(error => {
      console.error('Error sending request:', error);
  console.log(error.message)
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
  };
  
  return (
    <>
      <Navbar/>
      {product && (
        <div style={{ margin: '50px auto', width: '80%', maxWidth: '600px' }}>
          <h1 style={{textAlign:'center'}}>Edit Product</h1>
          <div style={{ 
            width: '100%', 
            border: '1px solid #ddd', 
            padding: '10px', 
            borderRadius: '5px', 
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
            backgroundColor: '#f9f9f9' 
          }}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '5px', 
                fontSize: '14px', 
                fontWeight: 'bold', 
                color: '#333',
                textAlign: 'left' 
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
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '5px', 
                fontSize: '14px', 
                fontWeight: 'bold', 
                color: '#333' ,
                textAlign: 'left'
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
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '5px', 
                fontSize: '14px', 
                fontWeight: 'bold', 
                color: '#333' ,
                textAlign: 'left'
              }}>
                Description
              </label>
              <textarea
                name="productDescription"
                value={updatedProduct.productDescription}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  boxSizing: 'border-box',
                  minHeight: '100px'
                }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '5px', 
                fontSize: '14px', 
                fontWeight: 'bold', 
                color: '#333' ,
                textAlign: 'left'
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
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '5px', 
                fontSize: '14px', 
                fontWeight: 'bold', 
                color: '#333' ,
                textAlign: 'left'
              }}>
                Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <button onClick={handleSaveClick} style={{ 
              width: '100%', 
              padding: '10px 0', 
              backgroundColor: '#28a745', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer' 
            }}>
              Save Changes
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

// export default withAuth(ProductDetail,[`product1/${id}`]);
export default ProductDetail;
