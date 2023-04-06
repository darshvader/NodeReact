// import React from 'react';
// import { redirect } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";

// const WithAuth = (Component) => {
//     let navigate = useNavigate();

//   const AuthenticatedComponent = (props) => {
//     const isAuthenticated = localStorage.getItem('token');
//     return isAuthenticated ? <Component {...props} /> : <redirect to="/LoginPage" />;
//   };
//   return AuthenticatedComponent;
// };

// export default WithAuth;