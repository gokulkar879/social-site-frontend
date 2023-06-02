import React, { useEffect, useState } from 'react';
import './MessageProfile.css';
import { useUserContext } from '../UserContext';
import { Link } from 'react-router-dom';

function MessageProfile({id, postedBy, text}) {
  const [messageUser, setMessageUser] = useState(null);
  const { token, user} = useUserContext();
  
  const getMessageUser = ev => {
    fetch(`https://social-app-backend-edkz.onrender.com/user/${postedBy}`, {
      method: 'GET',
      headers: {'Content-type': 'application/json', 'Authorization': `Bearer ${token}`}
    }).then(res => res.json())
      .then(data => {
        setMessageUser(data)
      })
      .catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    getMessageUser();
  }, [])
  return (
    <div className='messageProfile'>
        <Link to={`${(postedBy == user._id) ? '/user/me' : `user/${postedBy}`}`}><img src={messageUser && messageUser.avatar}></img></Link>
        <div className='message-text'>
        <Link to={`${(postedBy == user._id) ? '/user/me' : `user/${postedBy}`}`} style={{textDecoration: 'none', color: 'black'}}>
          <p className='message-user'>{messageUser && messageUser.username}</p>
        </Link>
            <p className='message-comment'>{text}</p>
        </div>
    </div>
  )
}

export default MessageProfile