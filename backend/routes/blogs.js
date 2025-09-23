const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const blogCtrl = require('../controllers/blogController');
const Blog = require('../models/Blog'); // Import the Blog model

router.get('/', async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 10);
    const skip = (page - 1) * limit;
    const total = await Blog.countDocuments();
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author', 'name');
    res.json({
      blogs,
      total,
      page,
      pages: Math.ceil(total / limit)
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});           // public, with pagination
router.get('/:id', blogCtrl.getBlogById);    // public
router.post('/', auth, blogCtrl.createBlog); // protected
router.put('/:id', auth, blogCtrl.updateBlog); // protected (author only)
router.delete('/:id', auth, blogCtrl.deleteBlog); // protected (author only)

module.exports = router;
