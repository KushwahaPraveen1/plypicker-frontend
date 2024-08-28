import React from 'react';
import withAuth from './withAuth';

const Home = () => {
  return <div>Home Page</div>;
};

export default withAuth(Home, ['admin', 'team_member']);