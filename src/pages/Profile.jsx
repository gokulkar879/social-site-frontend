import React, { useEffect, useState } from 'react';
import { useUserContext } from '../UserContext';
import { FiBookmark } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { FiEdit2 } from 'react-icons/fi';
import Post from '../Post.jsx';

function Profile() {
  const [isHovering, setisHovering] = useState(false); 
  const [image, setImage] = useState(''); 
  const [posts, setPosts] = useState([]);
  const { token, user, setUser } = useUserContext();

  const handleMouseOver = ev => {
    setisHovering(true);
  }

  const handleMouseOut = ev => {
    setisHovering(false);
  }

  const handleChange = ev => {
    const file = ev.target.files[0];
    const data = new FormData();
    data.set('avatar', file);
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` },
        body: data
       }

       fetch('https://social-app-backend-edkz.onrender.com/user/me', requestOptions)
          .then(res => res.json())
          .then(data => {
            setUser(data.user)
          }).catch(err => {
            console.log(err);
          })
  }

  const getUserPosts = ev => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
       }
     fetch('https://social-app-backend-edkz.onrender.com/user/me/posts', requestOptions)
      .then(res => res.json())
      .then(data => {
        setPosts(data.posts);
      }).catch(err => {
         console.log(err);
      }) 
  }

  useEffect(() => {
    if(user) {
        getUserPosts();
    }
  }, [user])

  return (
    <div className='profile'>
        <div className='profile-left'>
        <div className='profile-profile'>
            <div className='profile-avatar' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            
            {
                isHovering ? (<label className='profile-pic'>
                                    <input className='profile-value' type="file" value={image} onChange={handleChange}></input>
                                    <FiEdit2 />
                               </label> ) : (<img src={user && user.avatar}></img>)
            }
            </div>

         </div>
         <div className='profile-profile-body'>
          <Link to="/user/me">{user && user.username}</Link>
          <p className='likes'><span>Total likes</span><span>{user && user.userLikes}</span></p>
         </div>
         <div className='profile-profile-footer'>
          <Link to="/user/me"><span style={{marginRight: '10px'}}><FiBookmark /></span>My posts</Link>
         </div>
        </div>
        <div className='posts'>
          {
            posts.map(post => {
              const {_id, description, likes, comments, createdBy} = post;
              let imageUrl = null;
              if(post.imageUrl) imageUrl = post.imageUrl;

              return <Post key={_id}
                    id={_id}
                    imageUrl={imageUrl}
                    description={description}
                    likes={likes}
                    comments={comments}
                    createdBy={createdBy}
              />
            })
          }
        </div>

    </div>
  )
}

export default Profile