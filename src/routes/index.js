const express = require('express');
const router = express.Router();

//? Middleware
const { auth: Private } = require('../middleware/auth');
const { uploadFile } = require('../middleware/upload');

//? Subscribtion
const {
  addSubscribe,
  removeSubscribe,
  getSubscribers,
  getCountSubscriber,
} = require('../controllers/subscribe');

//? Register & Login
const { register } = require('../controllers/register');
const { login } = require('../controllers/login');
const { checkAuth } = require('../controllers/checkUser');

//? Channel
const {
  getChannelsAll,
  getChannelById,
  editChannel,
  deleteChannel,
} = require('../controllers/channelSub');

//? Video
const {
  getVideoAll,
  getVideoById,
  addVideo,
  updateVideo,
  deleteVideo,
} = require('../controllers/video');

//? Comments
const {
  getAllCommentsByVideoId,
  getCommentById,
  addComment,
  updateComment,
  deleteComment,
} = require('../controllers/comment');

//! Routers

//? Susbcribe routes
router.post('/subscribe', Private, addSubscribe);
router.delete('/subscribe/:id', Private, removeSubscribe);
router.get('/subscribes', Private, getSubscribers);
router.get('/subscribe-count', Private, getCountSubscriber);

//? Register & Login route
router.post('/register', register);
router.post('/login', login);
router.get('/check-auth', Private, checkAuth);

//? channel routes
router.get('/channels', getChannelsAll);
router.get('/channel/:id', getChannelById);
router.patch(
  '/channel/:id',
  uploadFile('thumbnail', 'photo'),
  Private,
  editChannel
);
router.delete('/channel/:id', Private, deleteChannel);

//? Video routes
router.get('/videos', getVideoAll);
router.get('/video/:id', getVideoById);
router.post('/video', Private, uploadFile('thumbnail', 'video'), addVideo);
router.patch('/video/:id', Private, updateVideo);
router.delete('/video/:id', Private, deleteVideo);

//? Comment routes
router.get('/video/:id/comments', getAllCommentsByVideoId);
router.get('/video/:id/comment/:commentId', getCommentById);
router.post('/video/:id/comment', Private, addComment);
router.patch('/video/:id/comment/:commentId', Private, updateComment);
router.delete('/video/:id/comment/:commentId', Private, deleteComment);

module.exports = router;
