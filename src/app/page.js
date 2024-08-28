// "use client";
// import Register from "../component/register"
// import Login from "../component/login"
// import Team from "../component/team_member"
// import Fetch from "../component/fetchproduct"
// import Admin from "../component/admin";
// import Status from "../component/status";
// import Index from '../../pages/index';
// // import Routers from "./pages/Routers";
// export default function Home() {
//   return (
//     <>
//     <Index/>
//       {/* <Register/> */}
//       {/* <Login/> */}
//       {/* <Team/> */}
//       {/* <Fetch/> */}
//       {/* <Admin/> */}
//       {/* <Status/> */}
//       {/* <Routers/> */}
//     </>
//   );
// }
import Link from 'next/link';
import React from 'react';

const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
      {/* <nav>
        <ul>
          <li><Link href="/login">Login</Link></li>
          <li><Link href="/register">Register</Link></li>
        </ul>
      </nav> */}
    </div>
  );
};

export default Home;
