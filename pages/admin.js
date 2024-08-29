import React, { useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import withAuth from "../components/withAuth";
import Navbar from '../components/navbar';
import { useRouter } from 'next/router';

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

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = sessionStorage.getItem('token');
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetch('https://64e0caef50713530432cafa1.mockapi.io/api/products')
        .then(response => response.json())
        .then(data => setProducts(data))
        .catch(error => console.error('Error fetching products:', error));
    }
  }, [token]);

  const handleProductClick = (id) => {
    router.push(`/product1/${id}`);
  };

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
        overflowY: 'auto'
      }}>
        {products.map(product => (
          <div  style={{cursor:'pointer'}} key={product.id} onClick={() => handleProductClick(product.id)}>
            <ProductItem product={product} />
          </div>
        ))}
      </div>
    </>
  );
};

const ProductItem = ({ product }) => (
  <div style={{ height:'380px', width: '200px', border: '1px solid #ddd', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', textAlign: 'left' }}>
    <h3 style={{ fontSize: '16px', margin: '0 0 10px' }}><b><i><u>{product.productName}</u></i></b></h3>
    <img src={product.image} alt={product.productName} style={{ width: '100%', height: '200px', borderRadius: '5px' }} />
    <p style={{ margin: '5px 0', fontSize: '14px' }}><b><i><u>Price: </u></i></b>${product.price}</p>
    <p style={{ margin: '5px 0', fontSize: '14px' }}><b><i><u>Description: </u></i></b>{product.productDescription}</p>
    <p style={{ margin: '5px 0', fontSize: '14px' }}><b><i><u>Department: </u></i></b>{product.department}</p>
  </div>
);

export default withAuth(Admin, ['admin']);
