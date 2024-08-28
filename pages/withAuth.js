// components/withAuth.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Adjust import based on your Next.js version

const withAuth = (WrappedComponent) => {
  return (props) => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const token = typeof window !== 'undefined' ? sessionStorage.getItem('token') : null;
    const user = typeof window !== 'undefined' ? JSON.parse(sessionStorage.getItem('user')) : null;
    const { pathname } = router;

    useEffect(() => {
      console.log('Token:', token);
      console.log('User:', user);
      console.log('Pathname:', pathname);

      if (!token || !user) {
        // If there's no token or user, redirect to login page unless already on login or register
        if (pathname !== '/login' && pathname !== '/register') {
          router.push('/login');
        }
      } else {
        const isAdmin = user.role === 'admin';

        // Admin-specific routes
        const adminRoutes = ['/admin', '/status'];

        // Non-admin-specific routes
        const nonAdminRoutes = ['/team_member', '/fetchproduct'];

        if (isAdmin) {
          if (nonAdminRoutes.includes(pathname)) {
            // Redirect admins away from non-admin routes
            router.push('/admin');
          } else if (!adminRoutes.includes(pathname) && pathname !== '/login' && pathname !== '/register') {
            // Redirect admins to /admin if they are on a route they should not access
            router.push('/admin');
          } else {
            // Allow access to admin routes
            setLoading(false);
          }
        } else {
          if (adminRoutes.includes(pathname)) {
            // Redirect non-admins away from admin routes
            router.push('/team_member');
          } else if (!nonAdminRoutes.includes(pathname) && pathname !== '/login' && pathname !== '/register') {
            // Redirect non-admins to /team_member if they are on a route they should not access
            router.push('/team_member');
          } else {
            // Allow access to non-admin routes
            setLoading(false);
          }
        }
      }
    }, [token, user?.role, pathname, router]);

    if (loading) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
