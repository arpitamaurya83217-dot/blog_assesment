const Blog = require('../models/Blog');

exports.createBlog = async (req, res) => {
  const { title, content } = req.body;
  try {
    const blog = await Blog.create({ title, content, author: req.user._id });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;
    const total = await Blog.countDocuments();
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author', 'name email');
    res.json({ total, page, limit, blogs });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'name email');
    if (!blog) return res.status(404).json({ msg: 'Not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ msg: 'Not found' });
    if (String(blog.author) !== String(req.user._id)) return res.status(403).json({ msg: 'Forbidden' });
    blog.title = req.body.title ?? blog.title;
    blog.content = req.body.content ?? blog.content;
    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ msg: 'Not found' });
    if (String(blog.author) !== String(req.user._id)) return res.status(403).json({ msg: 'Forbidden' });
    await blog.remove();
    res.json({ msg: 'Deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
