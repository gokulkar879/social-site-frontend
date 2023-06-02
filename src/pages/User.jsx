import React, { useState, useEffect } from 'react';
import Post from '../Post.jsx';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../UserContext.jsx';
import { FiBookmark } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function User() {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null);
    const { id } = useParams();
    const { token } = useUserContext();

    const getUser = ev => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        }
        fetch(`https://social-app-backend-edkz.onrender.com/user/${id}`, requestOptions)
        .then(res => res.json())
        .then(data => {
          setUser(data);
        }).catch(err => {
           console.log(err);
        }) 

    }

    const getUserPosts = ev => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
           }
         fetch(`https://social-app-backend-edkz.onrender.com/user/${id}/posts`, requestOptions)
          .then(res => res.json())
          .then(data => {
            setPosts(data.posts);
          }).catch(err => {
             console.log(err);
          }) 
      }

    useEffect(() => {
     if(token) getUser();
    }, [token])

    useEffect(() => {
    if(user) {
        getUserPosts();
    }
    }, [user])

  return (
    <div className='profile'>
        <div className='profile-left'>
            <div className='profile-profile'>
                <img src={user && user.avatar}></img>
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

export default User;