// components/Navbar.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Ensure this code only runs on the client side
    if (typeof window !== 'undefined') {
      const token = sessionStorage.getItem('token');
      const storedUser = sessionStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const handleClick1 = () => {
    if (user.role === 'admin') {
      router.push('/admin');
    } else {
      router.push('/team_member');
    }
  };

  const handleClick2 = () => {
    if (user.role === 'admin') {
      router.push('/status');
    } else {
      router.push('/fetchproduct');
    }
  };

  const handleLogout = () => {
    // Show a toast or any other feedback (optional)
    toast.info('Logging out, please wait...', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    // Delay before clearing storage and redirecting
    setTimeout(() => {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      router.push('/login');
    }, 2000); // 2000 milliseconds = 2 seconds
  };

  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap:'wrap',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#c9c9c9',
    color: 'black',
    position: 'sticky',
    width: '96%',
    margin: '-10px 0 0 -10px',
    top: '0',
    zIndex: '1000',
  };

  const logoStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '1rem',
  };

  const buttonStyle = {
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#0070f3',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: '#005bb5',
  };

  return (<>  
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
    <nav style={navbarStyle}>
      <div style={logoStyle}>{user ? user.role : 'Loading...'}</div>
      <p>{user ? `Welcome, ${user.username}` : 'Loading...'}</p>

      <div style={buttonContainerStyle}>
        <button
          style={buttonStyle}
          onClick={() => handleClick1()}
        >
          Product List
        </button>
        <button
          style={buttonStyle}
          onClick={() => handleClick2()}
        >
          Requests
        </button>
        <button
          style={buttonStyle}
          onClick={() => handleLogout()}
        >
          Logout
        </button>
      </div>
    </nav></>
  );
};

export default Navbar;
