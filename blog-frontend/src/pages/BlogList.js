import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    API.get(`/blogs?page=${page}`)
      .then(res => {
        setBlogs(res.data.blogs);
        setPages(res.data.pages);
        setTotal(res.data.total);
      });
  }, [page]);

  return (
    <div>
      <h2>All Blogs</h2>
      {blogs.map(blog => (
        <div key={blog._id} style={{ border: '1px solid #ccc', margin: 10, padding: 10 }}>
          <Link to={`/blogs/${blog._id}`}><h3>{blog.title}</h3></Link>
          <p>By: {blog.author?.name || 'Unknown'}</p>
        </div>
      ))}
      <div style={{ marginTop: 20 }}>
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>Prev</button>
        <span style={{ margin: '0 10px' }}>Page {page} of {pages}</span>
        <button disabled={page >= pages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
      <div style={{ marginTop: 10, color: '#888' }}>
        Total Blogs: {total}
      </div>
    </div>
  );
}
