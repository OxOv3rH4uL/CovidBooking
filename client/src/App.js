import React from 'react';
import { BrowserRouter as Router, Route , Routes} from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Centres from './pages/Centres';
import Profile from './pages/Profile';
import AdminLogin from './pages/admin/AdminLogin';
import AdminHome from './pages/admin/AdminHome';
import AdminCreateCentre from './pages/admin/AdminCreateCentre';
import AdminUpdateCentre from './pages/admin/AdminUpdateCentre';

const App = () => {
  return (
    <Router>
      <Routes>

          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/signup" element={<Signup/>}/>
          <Route exact path="/centres" element={<Centres/>}/>
          <Route exact path="/profile" element={<Profile/>}/>
          <Route exact path="/admin_login" element={<AdminLogin/>}/>
          <Route exact path="/admin" element={<AdminHome/>}/>
          <Route exact path="/create_centre" element={<AdminCreateCentre/>}/>
          <Route exact path="/update_centre" element={<AdminUpdateCentre/>}/>
      </Routes>
    </Router>
  );
}

export default App;
