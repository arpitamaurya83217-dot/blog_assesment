import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

export default function BlogDetail(){
  const { id } = useParams();
  const nav = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    API.get(`/blogs/${id}`).then(res => {
      setBlog(res.data);
      setLoading(false);
    });
    // Get userId from localStorage (assuming you store it after login)
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setUserId(user?._id);
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await API.delete(`/blogs/${id}`);
        nav('/');
      } catch (err) {
        alert(err.response?.data?.msg || 'Delete failed');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!blog) return <div>Blog not found</div>;

  // Show delete/edit only if logged-in user is the author
  const isAuthor = userId && blog.author && (blog.author._id === userId);

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>By: {blog.author?.name || 'Unknown'}</p>
      <div style={{whiteSpace:'pre-wrap', margin:'20px 0'}}>{blog.content}</div>
      {isAuthor && (
        <div>
          <Link to={`/edit/${blog._id}`}><button>Edit</button></Link>
          <button onClick={handleDelete} style={{ marginLeft: 10, color: 'red' }}>Delete</button>
        </div>
      )}
    </div>
  );
}

