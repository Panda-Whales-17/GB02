const express = require('express');

const postController = require('../controllers/postController');
const techController = require('../controllers/techController');
const userController = require('../controllers/userController');

const router = express.Router();

// USERS
// Add new User to the database
router.post('/newuser', userController.makeUser, (req, res) => {
  // userController.newSession,
  return res.status(200).json(res.locals.userId);
});

// Login
router.post(
  '/login',
  userController.authenticate,
  // FIX: session seems to be having some errors. will look into this tomororw -DK.
  userController.newSession,
  (req, res) => {
    return res.status(200).send(res.locals.userId);
  }
);

//Sign-Out
router.get('/signout', userController.endSession, (req, res) => {
  res.status(200).redirect('/');
});

// Look up a single user
router.get(
  '/:id',
  userController.findUser,
  postController.findPostsByUser,
  (req, res) => {
    // res.locals.userRequest && res.locals.postList
    res
      .status(200)
      .json({ user: res.locals.userRequest, posts: res.locals.postList });
  }
);

module.exports = router;
