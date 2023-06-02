import React, { useState } from 'react'
import { useUserContext } from '../UserContext.jsx';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setUser, setToken } = useUserContext();

    const login = e => {
        e.preventDefault();
        fetch('https://social-app-backend-edkz.onrender.com/user/login', {
          method: 'POST',
          headers:  {'Content-Type': 'application/json'},
          body: JSON.stringify({username, password})
        }).then(res => {
          return res.json();
        }).then(data => {
           setUser(data.user);
           setToken(data.token);
           localStorage.setItem('token', JSON.stringify(data.token));
        }).catch(err => {
          console.log(err)
        })
    }

  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      <input type="text"
             placeholder="username"
             value={username}
             onChange={ev => setUsername(ev.target.value)}/>
      <input type="password"
             placeholder="password"
             value={password}
             onChange={ev => setPassword(ev.target.value)}/>
      <button>Login</button>
    </form>
  )
}

export default LoginPage