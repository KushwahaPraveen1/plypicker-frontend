import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
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
        const adminRoutes = ['/admin', '/status', '/product1/id'];

        // Non-admin-specific routes
        const nonAdminRoutes = ['/team_member', '/fetchproduct','/product2/id'];

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

  // Add displayName for better debugging
  Wrapper.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return Wrapper;
};

export default withAuth;
