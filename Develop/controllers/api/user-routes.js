const router = require('express').Router();
const { User } = require('../../models');

router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password']}
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password']},
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.post('/', (req, res) => {
    User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        genre3: req.body.strUser
    })
    .then(dbUserData => {
        req.session.save(() => {
            // declare session variables
            req.session.user_id = dbUserData.id;
            req.session.email = dbUserData.email;
            req.session.loggedIn = true;
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
});

router.post('/login', (req, res) => {
    User.findOne({
    where: {
      email: req.body.email
    },
  }).then(dbUserData => {
      console.log(dbUserData)
    if (!dbUserData) {
        console.log(dbUserData)
      res.status(400).json({ message: 'No user with that email address!' });
      
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    req.session.save(() => {
      // declare session variables
      req.session.user_id = dbUserData.id;
      req.session.email = dbUserData.email;
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
  });
})

router.put('/:id', (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err);
    })
});

router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
          res.status(204).end();
          res.render('/')
        });
      }
      else {
          console.log('herfdfs')
        res.status(404).end();
        res.render('/')
      }
})


// var sessionId = req.cookies.session;
// if (
//     !sessionId ||
//     sessionId.search(/^[A-Fa-f0-9]+$/) == -1
// ) {
//     res.locals.loggedIn = false;
//     next();
//     return;
// }   
// Session.findOne({sessionId: sessionId}).select('timeStamp username').exec(function(err, session) {
//     if (err) throw new Error(err);
//     if (!session) {
//         res.locals.loggedIn = false;
//         next();
//         return;
//     }
//     var now = (new Date()).getTime();
//     if (!session.timeStamp || (now - session.timeStamp > sessionTimeout)) { 
//         res.locals.loggedIn = false;
//         next();
//         return;
//     }
//     User.findOne({username: session.username}).select('name').exec(function(err, user) {
//         if (err) throw new Error(err);
//         if (!user) {
//             res.locals.loggedIn = false;
//             next();
//             return;
//         }
//         res.locals.loggedIn = true;
//         res.locals.fullName = `${user.name.firstname} ${user.name.lastname}`;
//         next();
//     });
// });
// };

module.exports = router;