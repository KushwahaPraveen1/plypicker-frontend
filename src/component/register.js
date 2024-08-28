import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  async function handleRegister(e) {
    e.preventDefault();

    // Check if all fields are filled
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

    axios
      .post("https://plypicker-backend-xjn6.onrender.com/api/auth/register", {
        username: username,
        password: password,
        role: role,
      })
      .then((result) => {
        
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
          // Optionally reset form fields or redirect
          setUsername("");
          setPassword("");
          setRole("");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(`${err.response.data}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
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
        backgroundColor: '#f4f4f9',
        padding: '20px'
      }}>
        <div style={{
          maxWidth: '400px',
          width: '100%',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          padding: '20px',
          boxSizing: 'border-box',
          textAlign: 'center'
        }}>
          <h2 style={{
            margin: '0 0 20px',
            fontSize: '24px',
            color: '#333',
            fontFamily: 'Arial, sans-serif'
          }}>Register</h2>
          <form onSubmit={handleRegister}>
            <div style={{ marginBottom: '15px' }}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  boxSizing: 'border-box',
                  fontSize: '16px'
                }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  boxSizing: 'border-box',
                  fontSize: '16px'
                }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
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
                  padding: '10px',
                  border: '1px solid #ddd',
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
                padding: '10px 20px',
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
        </div>
      </div>
    </>
  );
}

export default Register;
