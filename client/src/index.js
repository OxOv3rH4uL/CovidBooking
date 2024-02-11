import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './index.css';
import App from './App';
import Home from './pages/Home';
import Login from './pages/Login';

// export default function Redirect(){
//   return (
//     <>
//       <BrowserRouter>
//         <Routes>
//           <Route path="home" element={<Home/>}/>
//           <Route path="login" element={<Login/>}/>
//         </Routes>
//       </BrowserRouter>
//     </>
//   )
// }



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

