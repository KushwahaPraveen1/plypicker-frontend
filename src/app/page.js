'use client'; 

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
const ProjectInfo = () => {
    const [linkHover, setLinkHover] = useState(false);
    
const router = useRouter();
    const containerStyle = {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f4f4f4',
        color: '#333',
    };

    const headerStyle = {
        textAlign: 'center',
        color: '#0070f3',
    };

    const infoSectionStyle = {
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px',
        padding: '20px',
    };

    const headingStyle = {
        color: '#333',
        borderBottom: '2px solid #0070f3',
        paddingBottom: '10px',
        marginBottom: '20px',
    };

    const listStyle = {
        lineHeight: '1.6',
        marginLeft: '20px',
    };

    const listItemStyle = {
        marginBottom: '10px',
    };

    const linkStyle = {
        color: '#0070f3',
        textDecoration: 'none',
    };

    const linkHoverStyle = {
        textDecoration: 'underline',
    };

    const buttonStyle = {
      display: 'block',
      width: '150px',
      padding: '10px 20px',
      margin: '20px auto',
      border: 'none',
      borderRadius: '5px',
      backgroundColor: '#0070f3',
      color: '#ffffff',
      fontSize: '16px',
      cursor: 'pointer',
      textAlign: 'center',
  };

  const handleProceedClick = () => {
      router.push('/register');  
  };

    return (
        
        <div style={containerStyle}>
        <img style={headerStyle} src='data:image/png;base64,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'></img>
            <h1 style={headerStyle}>Project Information: Full-Stack Web Application</h1>

            <div style={infoSectionStyle}>
                <h2 style={headingStyle}>Project Overview</h2>
                <ul style={listStyle}>
                    <li style={listItemStyle}><strong>Framework:</strong> Next.js 14 with App directory</li>
                    <li style={listItemStyle}><strong>Authentication:</strong> Role-based JWT authentication</li>
                    <li style={listItemStyle}><strong>Sign-Up:</strong> Users can select between &#34;admin&#34; or &#34;team member&#34; roles</li>
                    <li style={listItemStyle}><strong>Authentication Methods:</strong> Username and password </li>
                    <li style={listItemStyle}><strong>Dashboards:</strong> Users see different dashboards based on their role</li>
                </ul>
            </div>

            <div style={infoSectionStyle}>
                <h2 style={headingStyle}>Team Members Section</h2>
                <ul style={listStyle}>
                    <li style={listItemStyle}>View Link list of all products</li>
                    <li style={listItemStyle}>Edit product details including images</li>
                    <li style={listItemStyle}>Upload using Firebase Cloud Storage</li>
                    <li style={listItemStyle}>Submit changes for admin review</li>
                    <li style={listItemStyle}>Check status of changes (pending, rejected, approved)</li>
                </ul>
            </div>

            <div style={infoSectionStyle}>
                <h2 style={headingStyle}>Admin Section</h2>
                <ul style={listStyle}>
                    <li style={listItemStyle}>View and edit all product details</li>
                    <li style={listItemStyle}>Save changes directly without approval</li>
                    <li style={listItemStyle}>Review and manage pending change requests from team members</li>
                    <li style={listItemStyle}>Approve or reject requests, with status updates</li>
                </ul>
            </div>

            {/* <div style={infoSectionStyle}>
                <h2 style={headingStyle}>Profile Section</h2>
                <ul style={listStyle}>
                    <li style={listItemStyle}>View stats like number of requests, approved and rejected requests</li>
                </ul>
            </div> */}

            <div style={infoSectionStyle}>
                <h2 style={headingStyle}>Pages</h2>
                <ul style={listStyle}>
                    <li style={listItemStyle}>
                        <Link
                            href="/register"
                            style={linkStyle}
                            onMouseOver={() => setLinkHover(true)}
                            onMouseOut={() => setLinkHover(false)}
                        >
                            /register
                        </Link>
                    </li>
                    <li style={listItemStyle}>
                        <Link
                            href="/login"
                            style={linkStyle}
                            onMouseOver={() => setLinkHover(true)}
                            onMouseOut={() => setLinkHover(false)}
                        >
                            /login
                        </Link>
                    </li>
                    <li style={listItemStyle}>
                        <Link
                            href="/admin"
                            style={linkStyle}
                            onMouseOver={() => setLinkHover(true)}
                            onMouseOut={() => setLinkHover(false)}
                        >
                            /admin 
                        </Link>
                    </li>
                    <li style={listItemStyle}>
                        <Link
                            href="/team_member"
                            style={linkStyle}
                            onMouseOver={() => setLinkHover(true)}
                            onMouseOut={() => setLinkHover(false)}
                        >
                            /team_member
                        </Link>
                    </li>
                    <li style={listItemStyle}>
                        
                            /product1/:product_id (For Admin)
                    </li>
                    <li style={listItemStyle}>
                        
                            /product2/:product_id (For Team Member)
                    </li>
                    <li style={listItemStyle}>
                        <Link
                            href="/status"
                            style={linkStyle}
                            onMouseOver={() => setLinkHover(true)}
                            onMouseOut={() => setLinkHover(false)}
                        >
                            /status (Admin can see status of all requests and Approve or Reject them)
                        </Link>
                    </li>
                    <li style={listItemStyle}>
                        <Link
                            href="/fetchproduct"
                            style={linkStyle}
                            onMouseOver={() => setLinkHover(true)}
                            onMouseOut={() => setLinkHover(false)}
                        >
                            /fetchproduct (Team Member Can see the status of there requests) 
                        </Link>
                    </li>
                  
                </ul>
            </div>

            <div style={infoSectionStyle}>
                <h2 style={headingStyle}>Deployment and Links</h2>
                <ul style={listStyle}>
                    <li style={listItemStyle}>
                        <Link
                            href="https://plypicker.netlify.app/"
                            style={linkStyle}
                            onMouseOver={() => setLinkHover(true)}
                            onMouseOut={() => setLinkHover(false)}
                        >
                            Deployed Next.js Application
                        </Link>
                    </li>
                    <li style={listItemStyle}>
                        <Link
                            href="https://plypicker-backend-xjn6.onrender.com"
                            style={linkStyle}
                            onMouseOver={() => setLinkHover(true)}
                            onMouseOut={() => setLinkHover(false)}
                        >
                            Deployed Node.js API Endpoint
                        </Link>
                    </li>
                    <li style={listItemStyle}>
                        <Link
                            href="https://drive.google.com/drive/folders/1GwTJu3Ufj0_1nUYbIvZFe7rjOgaN2GkI?usp=drive_link"
                            style={linkStyle}
                            onMouseOver={() => setLinkHover(true)}
                            onMouseOut={() => setLinkHover(false)}
                        >
                            2-Minute YouTube Video
                        </Link>
                    </li>
                    <li style={listItemStyle}>
                        <Link
                            href="https://github.com/KushwahaPraveen1/plypicker-frontend"
                            style={linkStyle}
                            onMouseOver={() => setLinkHover(true)}
                            onMouseOut={() => setLinkHover(false)}
                        >
                            Public GitHub Repository (Frontend)
                        </Link>
                    </li>
                    <li style={listItemStyle}>
                        <Link
                            href="https://github.com/KushwahaPraveen1/plypicker-backend"
                            style={linkStyle}
                            onMouseOver={() => setLinkHover(true)}
                            onMouseOut={() => setLinkHover(false)}
                        >
                            Public GitHub Repository (Backend)
                        </Link>
                    </li>
                </ul>
            </div>
            <button style={buttonStyle} onClick={handleProceedClick}>
                Proceed
            </button>
        </div>
    );
};

export default ProjectInfo;
