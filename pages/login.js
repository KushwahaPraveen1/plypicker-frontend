// components/Login.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
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
  }, [router]);

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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#e9ecef', padding: '20px' }}>
        <div style={{ maxWidth: '400px', width: '100%', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: '30px', boxSizing: 'border-box', textAlign: 'center' }}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZelTVn718ySIT-tv-ZY2T1-kqRE5Z1dzWzQ&s" alt="Logo" style={{ width: '100px', marginBottom: '20px' }} />
          <h2 style={{ margin: '0 0 20px', fontSize: '28px', color: '#007bff', fontFamily: 'Arial, sans-serif' }}>Login</h2>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '20px' }}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ width: '100%', padding: '12px', border: '1px solid #ced4da', borderRadius: '4px', boxSizing: 'border-box', fontSize: '16px', outline: 'none' }}
                required
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '12px', border: '1px solid #ced4da', borderRadius: '4px', boxSizing: 'border-box', fontSize: '16px', outline: 'none' }}
                required
              />
            </div>
            <button
              type="submit"
              style={{ backgroundColor: '#007bff', color: '#ffffff', border: 'none', borderRadius: '4px', padding: '12px 20px', fontSize: '16px', cursor: 'pointer', transition: 'background-color 0.3s ease', width: '100%' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
            >
              Login
            </button>
          </form>
          <p style={{ marginTop: '20px', fontSize: '16px' }}>Don&apos;t have an account? <Link href='/register' style={{ color: '#007bff', textDecoration: 'none' }}>Register</Link></p>
        </div>
      </div>
    </>
  );
}

export default Login;
