import Link from 'next/link';
import React from 'react';

const Index = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <nav>
        <ul>
          <li><Link href="/login">Login</Link></li>
          <li><Link href="/register">Register</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Index;
