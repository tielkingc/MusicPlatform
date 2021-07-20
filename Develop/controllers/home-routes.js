const router = require('express').Router();
const path = require('path')
const sequelize = require('../config/connection');
const { Post, User, Comment, Vote } = require('../models');

// get all posts for homepage
router.get('/', (req, res) => {
  console.log('======================');
  Post.findAll({
    attributes: [
      'id',
      'post_content',
      'title',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['email']
        }
      },
      {
        model: User,
        attributes: ['email']
      }
    ]
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));

      res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get single post
router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'post_content',
      'title',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['email']
        }
      },
      {
        model: User,
        attributes: ['email']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      const post = dbPostData.get({ plain: true });

      res.render('single-post', {
        post,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/userForm/form.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/userForm/form.html'))
})

module.exports = router;
