import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

export default function CreateEditBlog({ edit }) {
  const { id } = useParams();
  const nav = useNavigate();
  const [form, setForm] = useState({ title:'', content:'' });

  useEffect(()=> {
    if (edit && id) {
      API.get(`/blogs/${id}`).then(res => {
        setForm({ title: res.data.title, content: res.data.content });
      });
    }
  }, [edit, id]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (edit) {
        await API.put(`/blogs/${id}`, form);
      } else {
        await API.post('/blogs', form);
      }
      nav('/');
    } catch (err) {
      alert(err.response?.data?.msg || 'Error');
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>{edit ? 'Edit' : 'Create'} Blog</h2>
      <input placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} required />
      <textarea rows={12} placeholder="Content" value={form.content} onChange={e=>setForm({...form, content:e.target.value})} required />
      <button type="submit">{edit? 'Update' : 'Publish'}</button>
    </form>
  );
}
