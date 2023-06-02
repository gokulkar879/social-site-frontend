import React from 'react';
import { Link } from "react-router-dom";
import { useUserContext } from './UserContext';

function Header() {
  const { token, user, setToken, setUser } = useUserContext();
  const logout = ev => {
    fetch('https://social-app-backend-edkz.onrender.com/user/logout', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`}
    }).then(res => {
        setUser(null);
        setToken(null);
    }).catch(err => {
      console.log(err);
    })

  }
  return (
    <header>
        <Link to="/" className='logo'>MySocial</Link>
        {
          (!token) ? <nav>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </nav> : <nav>
                         <Link to="/"></Link>
                         <button onClick={logout}>Logout</button>
                    </nav>
        }
        
    </header>
  )
}

export default Header;