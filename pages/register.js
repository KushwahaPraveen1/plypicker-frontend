// components/Register.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = sessionStorage.getItem('token');
      const user = JSON.parse(sessionStorage.getItem('user'));

      if (token) {
        if (user && user.role) {
          router.push(user.role === 'admin' ? '/admin' : '/team_member');
        }
      }
    }
  }, [router]);

  async function handleRegister(e) {
    e.preventDefault();

    if (!username || !password || !role) {
      toast.error('Please fill all fields', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    try {
      const result = await axios.post("https://plypicker-backend-xjn6.onrender.com/api/auth/register", {
        username: username,
        password: password,
        role: role,
      });

      if (result.status === 201) {
        toast.success('Registration Successful', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        setUsername("");
        setPassword("");
        setRole("");

        await new Promise(resolve => setTimeout(resolve, 2000));

        router.push('/login');
      }
    } catch (err) {
      console.error(err);
      toast.error(`${err.response?.data || 'Registration failed'}`, {
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
  }

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
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#e9ecef',
        padding: '20px'
      }}>
        <div style={{
          maxWidth: '400px',
          width: '100%',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          padding: '30px',
          boxSizing: 'border-box',
          textAlign: 'center'
        }}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZelTVn718ySIT-tv-ZY2T1-kqRE5Z1dzWzQ&s" alt="Logo" style={{ width: '100px', marginBottom: '20px' }} />
          <h2 style={{
            margin: '0 0 20px',
            fontSize: '28px',
            color: '#007bff',
            fontFamily: 'Arial, sans-serif'
          }}>Register</h2>
          <form onSubmit={handleRegister}>
            <div style={{ marginBottom: '20px' }}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ced4da',
                  borderRadius: '4px',
                  boxSizing: 'border-box',
                  fontSize: '16px',
                  outline: 'none'
                }}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ced4da',
                  borderRadius: '4px',
                  boxSizing: 'border-box',
                  fontSize: '16px',
                  outline: 'none'
                }}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="role" style={{
                display: 'block',
                marginBottom: '5px',
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#333',
                textAlign: 'left'
              }}>Role</label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ced4da',
                  borderRadius: '4px',
                  boxSizing: 'border-box',
                  fontSize: '16px',
                  backgroundColor: '#fff',
                  cursor: 'pointer'
                }}
              >
                <option value="" disabled>Select role</option>
                <option value="admin">Admin</option>
                <option value="team_member">Team Member</option>
              </select>
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: '#007bff',
                color: '#ffffff',
                border: 'none',
                borderRadius: '4px',
                padding: '12px 20px',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
                width: '100%'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
            >
              Register
            </button>
          </form>
          <p style={{ marginTop: '20px', fontSize: '16px' }}>Already have an account? <Link href='/login' style={{ color: '#007bff', textDecoration: 'none' }}>Login</Link></p>
        </div>
      </div>
    </>
  );
}

export default Register;
