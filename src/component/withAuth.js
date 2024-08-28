// components/withAuth.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Adjust import based on your Next.js version

const withAuth = (WrappedComponent, allowedRoles) => {
  return (props) => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const token = typeof window !== 'undefined' ? sessionStorage.getItem('token') : null;
    const user = typeof window !== 'undefined' ? JSON.parse(sessionStorage.getItem('user')) : null;

    useEffect(() => {
      if (!token) {
        router.push('/login');
      } else if (!allowedRoles.includes(user?.role)) {
        router.push(user?.role === 'admin' ? '/admin-dashboard' : '/team-member-dashboard');
      } else {
        setLoading(false);
      }
    }, [token, user?.role, router]);

    if (loading) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
