// components/Navbar.js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Ensure this code only runs on the client side
    if (typeof window !== "undefined") {
      const token = sessionStorage.getItem("token");
      const storedUser = sessionStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const handleClick1 = () => {
    if (user.role === "admin") {
      router.push("/admin");
    } else {
      router.push("/team_member");
    }
  };

  const handleClick2 = () => {
    if (user.role === "admin") {
      router.push("/status");
    } else {
      router.push("/fetchproduct");
    }
  };

  const handleLogout = () => {
    // Show a toast or any other feedback (optional)
    toast.info("Logging out, please wait...", {
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
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/login");
    }, 2000); // 2000 milliseconds = 2 seconds
  };

  const navbarStyle = {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    alignItems: "center",
    padding: "1rem 2rem",
    backgroundColor: "#c9c9c9",
    color: "black",
    position: "sticky",
    width: "96%",
    margin: "-10px 0 0 -10px",
    top: "0",
    zIndex: "1000",
  };

  const logoStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
  };

  const buttonContainerStyle = {
    display: "flex",
    gap: "1rem",
  };

  const buttonStyle = {
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#0070f3",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const buttonHoverStyle = {
    backgroundColor: "#005bb5",
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
      <nav style={navbarStyle}>
        {/* <div style={logoStyle}>{user ? user.role : 'Loading...'}</div> */}
        <img src="data:image/png;base64,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"></img>
        <p>{user ? `Welcome, ${user.username}` : "Loading..."}</p>

        <div style={buttonContainerStyle}>
          <button style={buttonStyle} onClick={() => handleClick1()}>
            Product List
          </button>
          <button style={buttonStyle} onClick={() => handleClick2()}>
            Requests
          </button>
          <button style={buttonStyle} onClick={() => handleLogout()}>
            Logout
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
