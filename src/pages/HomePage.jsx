import React, { useEffect, useState } from 'react';
import Post from '../Post';
import { FiBookmark } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import CreatePost from '../components/CreatePost';
import { useUserContext } from '../UserContext';

function HomePage() {
  const { user, token } = useUserContext();
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    fetch('https://social-app-backend-edkz.onrender.com/posts', {
      headers: { 'Authorization': `Bearer ${token}`}
    }).then(res => res.json())
      .then(data => {
        setPosts(data.posts)
      }).catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
      fetchPosts();
  }, [])

  return (
    <div className='home'>
      <div className='home-left'>
         <div className='home-profile'>
          <Link to="/user/me">
            <img src={user && user.avatar}></img>
          </Link>
         </div>
         <div className='home-profile-body'>
          <Link to="/user/me">{user && user.username}</Link>
          <p className='likes'><span>Total likes</span><span>{user && user.userLikes}</span></p>
         </div>
         <div className='home-profile-footer'>
          <Link to="/user/me"><span style={{marginRight: '10px'}}><FiBookmark /></span>My posts</Link>
         </div>
      </div>
      <div className='home-right'>
        <CreatePost posts={posts} setPosts={setPosts}/>
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
    </div>
  )
}

export default HomePage