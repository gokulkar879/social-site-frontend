import React, { useState } from 'react';
import './CreatePost.css';
import { FaFileUpload } from 'react-icons/fa';
import { useUserContext } from '../UserContext';

function CreatePost({ posts, setPosts }) {
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const {token, user} = useUserContext();

    const removeImage = ev => {
        ev.preventDefault();
        setImage(null);
        setImagePreview('');
    }

    const handleSubmit = ev => {
        ev.preventDefault();
        const data = new FormData();
        data.set('description', description);
       if(image) data.set('image', image);
       const requestOptions = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: data
       }
       fetch('https://social-app-backend-edkz.onrender.com/posts', requestOptions).then(res => {
        return res.json();
       }).then(data => {
        setDescription('');
        setImage(null);
        setImagePreview('');
        setPosts([data.post , ...posts])
       }).catch(err => {
        console.log(err)
       })
       
    }

    const _handleFileUpload = ev => {
       setImage(ev.target.files[0]);
       setImagePreview(URL.createObjectURL(ev.target.files[0]))
    }

  return (
    <form className='createPost' onSubmit={handleSubmit}>
        <div className='left'>
            <img src={user && user.avatar}></img>
        </div>
        <div className='right'>
            <textarea type="text" name="description" value={description} onChange={ev => setDescription(ev.target.value)} placeholder='Tell us something...'></textarea>
            {
                imagePreview && <div>
                    <button onClick={removeImage}>Clear</button>
                    <img src={imagePreview}></img>
                </div>
            }
            <div className='file_button'>
                <label>
                    <FaFileUpload />
                    <input type="file" onChange={_handleFileUpload} name="image"></input>
                </label>
                <button>Post</button>
            </div>
        </div>
    </form>
  )
}

export default CreatePost;