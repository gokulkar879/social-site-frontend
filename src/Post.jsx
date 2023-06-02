import React, { useEffect, useState } from 'react';
import { FiThumbsUp, FiMessageSquare } from 'react-icons/fi';
import './Post.css';
import MessageProfile from './components/MessageProfile';
import { useUserContext } from './UserContext';
import { Link, useNavigate } from 'react-router-dom';

function Post({id, description, imageUrl, likes, comments, createdBy}) {
  const [postComments, setPostComments] = useState(0);
  const [comment, setComment] = useState('');
  const [liked, setLiked] = useState(0);
  const { token, user } = useUserContext();
  const navigate = useNavigate();

  const handleLike = ev => {
     fetch(`https://social-app-backend-edkz.onrender.com/posts/${id}`, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${token}`}
     }).then(res => res.json())
       .then(data => {
        setLiked(!liked);
       })
       .catch(err => {
        console.log(err);
       })
  }

  const handleClick = ev => {
    setPostComments(!postComments);
  }

  const handleNavigate = ev => {
    navigate(`${(user && createdBy._id == user._id) ? '/user/me' : `/user/${createdBy._id}`}`, {replace: 'true'})
  }

  const handleCommentSubmit = ev => {
    ev.preventDefault();
    fetch(`https://social-app-backend-edkz.onrender.com/posts/comment/${id}`, {
      method: 'PATCH',
      headers: {'Authorization': `Bearer ${token}`, 'Content-type': 'application/json'},
      body: JSON.stringify({
        text: comment
      })
    }).then(res => res.json())
    .then(data => {
      setComment('');
    })
    .catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    if(user) {
      const isLiked = likes.filter(like => like.likedBy == user._id);
      if(isLiked.length) {
        setLiked(1);
      }
    } 
  }, [])

  return (
    <div className='post'>
        <div className='post-info'>
            <img src={createdBy.avatar} onClick={handleNavigate} style={{cursor:'pointer'}}></img>
            <p onClick={handleNavigate} style={{cursor:'pointer'}}>{createdBy.username}</p>
        </div>
        <div className='post-body'>
            <p>{description}</p>
            {
              imageUrl && <img src={imageUrl}></img>
            }
        </div>
        <div className='post-footer'>
            <button onClick={handleLike} style={{color: `${liked ? 'black':'rgb(101, 101, 101)'}`}}> <FiThumbsUp /> <span>Like</span> </button>
            <button onClick={handleClick}> <FiMessageSquare /> <span>Comment</span> </button>
        </div>
        <div className={`post-comments ${postComments ? 'active' : ''}`}>
             <form className='post-comment-form' onSubmit={handleCommentSubmit}>
                <input placeholder='Write a comment...' value={comment} onChange={ev => setComment(ev.target.value)}></input>
             </form>
             {
              comments.map(_comment => {
                const {_id, comment} = _comment;

                return <MessageProfile key={_id}
                        id={_id}
                        postedBy={comment.postedBy}
                        text={comment.text}
                        />
              })
             }
        </div>
    </div>
  )
}

export default Post