const router = require('express').Router();
const path = require('path')
const sequelize = require('../config/connection');
const { Post, User, Comment, Vote } = require('../models');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/homePage/index.html'))
})

router.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/userForm/form.html'))
})

router.get('/loginPage/login.html', (req, res) => {
  // if (req.session.loggedIn) {
  //   res.redirect('/');
  //   return;
  // }

  res.sendFile(path.join(__dirname, '../views/loginPage/login.html'));
});

router.get('/userForm/form.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/userForm/form.html'))
})

router.get('/loginPage/userForm/form.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/userForm/form.html'))
})

router.post('/api/users', (req, res) => {
  // expects {email: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
  User.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    genre3: req.body.userGenre3
  })
    .then(dbUserData => {
      // req.session.save(() => {
      //   req.session.user_id = dbUserData.id;
      //   req.session.email = dbUserData.email;
      //   req.session.loggedIn = true;
  
        res.json(dbUserData);
      
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/api/users', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] }
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  })

router.get('/events', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/eventsPage/events.html'))
});

router.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/landingPage/landingPage.html'))
})

router.get('/community', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/communityPage/community.html'))
})
// get all posts for homepage
// router.get('/', (req, res) => {
  // console.log('======================');
  // Post.findAll({
  //   attributes: [
  //     'id',
  //     'post_content',
  //     'title',
  //     'created_at',
  //     [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
  //   ],
  //   include: [
  //     {
  //       model: Comment,
  //       attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
  //       include: {
  //         model: User,
  //         attributes: ['email']
  //       }
  //     },
  //     {
  //       model: User,
  //       attributes: ['email']
  //     }
  //   ]
  // })
  //   .then(dbPostData => {
  //     const posts = dbPostData.map(post => post.get({ plain: true }));

  //     res.render('community', {
  //       posts,
  //       loggedIn: req.session.loggedIn
  //     });
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     res.status(500).json(err);
  //   });
// });

// router.get('/', (req, res) => {
//   res.render('hub')
// })

// get single post
// router.get('/post/:id', (req, res) => {
//   Post.findOne({
//     where: {
//       id: req.params.id
//     },
//     attributes: [
//       'id',
//       'post_content',
//       'title',
//       'created_at',
//       [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
//     ],
//     include: [
//       {
//         model: Comment,
//         attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//         include: {
//           model: User,
//           attributes: ['email']
//         }
//       },
//       {
//         model: User,
//         attributes: ['email']
//       }
//     ]
//   })
//     .then(dbPostData => {
//       if (!dbPostData) {
//         res.status(404).json({ message: 'No post found with this id' });
//         return;
//       }

//       const post = dbPostData.get({ plain: true });

//       res.render('single-post', {
//         post,
//         loggedIn: req.session.loggedIn
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

module.exports = router;
