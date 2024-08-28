// components/login.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import withAuth from './withAuth';
import Link from 'next/link';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  useEffect(() => {
    // Only execute on the client side
    if (typeof window !== 'undefined') {
      const token = sessionStorage.getItem('token');
      const user = JSON.parse(sessionStorage.getItem('user'));
  
      // Check if token exists
      if (token) {
        // Redirect based on user role
        if (user && user.role) {
          router.push(user.role === 'admin' ? '/admin' : '/team_member');
        }
      }
    }
  }, [router]); // Dependency array ensures effect runs only when `router` changes
  
  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("https://plypicker-backend-xjn6.onrender.com/api/auth/login", { username, password });
      
      // Store token and user information in session storage
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("user", JSON.stringify(response.data.user));
      
      // Display success toast message
      toast.success('Login successful!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
  
      // Wait for 2 seconds before redirecting
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirect based on user role
      if (response.data.user.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/team_member');
      }
  
    } catch (error) {
      toast.error('Login failed. Please check your credentials and try again.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f4f9', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', maxWidth: '400px', width: '100%', height: '350px', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: '20px', boxSizing: 'border-box', textAlign: 'center' }}>
          <h2 style={{ margin: '0 0 20px', fontSize: '24px', color: '#333', fontFamily: 'Arial, sans-serif' }}>Login</h2>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '15px' }}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box', fontSize: '16px' }}
                required
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box', fontSize: '16px' }}
                required
              />
            </div>
            <button
              type="submit"
              style={{ backgroundColor: '#007bff', color: '#ffffff', border: 'none', borderRadius: '4px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer', transition: 'background-color 0.3s ease', width: '100%' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
            >
              Login
            </button>
          </form>
          <p>Don&apos;t have an account? <Link href='/register'>Register</Link></p>
        </div>
      </div>
    </>
  );
}

export default Login;
