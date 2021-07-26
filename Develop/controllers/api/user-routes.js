const router = require('express').Router();
const { User } = require('../../models');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { ExpressHandlebars } = require('express-handlebars');

const app = express();

// To support URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// To parse cookies from the HTTP Request
app.use(cookieParser());

app.engine('handlesbars', ExpressHandlebars({
    extname: '.handlesbars'
}));

app.set('view engine', 'handlesbars');

// Our requests handlers will be implemented here...

app.listen(3000);

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

// router.post('/login', (req, res) => {
//     User.findOne({
//     where: {
//       email: req.body.email
//     }
//   }).then(dbUserData => {
//       console.log(dbUserData)
//     if (!dbUserData) {
//         console.log(dbUserData)
//       res.status(400).json({ message: 'No user with that email address!' });
      
//     }

//     const validPassword = dbUserData.checkPassword(req.body.password);

//     if (!validPassword) {
//       res.status(400).json({ message: 'Incorrect password!' });
//       return;
//     }

//     req.session.save(() => {
//       // declare session variables
//       req.session.user_id = dbUserData.id;
//       req.session.email = dbUserData.email;
//       req.session.loggedIn = true;

//       res.json({ user: dbUserData, message: 'You are now logged in!' });
//     });
//   });
// })

// router.put('/:id', (req, res) => {
//     User.update(req.body, {
//         individualHooks: true,
//         where: {
//             id: req.params.id
//         }
//     })
//     .then(dbUserData => {
//         if (!dbUserData) {
//             res.status(404).json({ message: 'No user found with this id' });
//             return;
//         }
//         res.json(dbUserData);
//     })
//     .catch(err => {
//         console.log(err)
//         res.status(500).json(err);
//     })
// });

// router.delete('/:id', (req, res) => {
//     User.destroy({
//         where: {
//             id: req.params.id
//         }
//     })
//     .then(dbUserData => {
//         if (!dbUserData) {
//             res.status(404).json({ message: 'No user found with this id' });
//             return;
//         }
//         res.json(dbUserData)
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     })
// });

// router.post('/logout', (req, res) => {
//     if (req.session.loggedIn) {
//         req.session.destroy(() => {
//           res.status(204).end();
//           res.render('/')
//         });
//       }
//       else {
//           console.log('herfdfs')
//         res.status(404).end();
//         res.render('/')
//       }
// })

app.get('/login', (req, res) => {
    res.render('login');
});

const generateAuthToken = () => {
    return crypto.randomBytes(30).toString('hex');
}

const authTokens = {};

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = getHashedPassword(password);

    const user = users.find(u => {
        return u.email === email && hashedPassword === u.password
    });

    if (user) {
        const authToken = generateAuthToken();

        // Store authentication token
        authTokens[authToken] = user;

        // Setting the auth token in cookies
        res.cookie('AuthToken', authToken);

        // Redirect user to the protected page
        res.redirect('/protected');
    } else {
        res.render('login', {
            message: 'Invalid username or password',
            messageClass: 'alert-danger'
        });
    }
});

app.use((req, res, next) => {
    // Get auth token from the cookies
    const authToken = req.cookies['AuthToken'];

    // Inject the user to the request
    req.user = authTokens[authToken];

    next();
});

app.get('/community', (req, res) => {
    if (req.user) {
        res.render('community');
    } else {
        res.render('login', {
            message: 'Please login to continue',
            messageClass: 'alert-danger'
        });
    }
});

const requireAuth = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.render('login', {
            message: 'Please login to continue',
            messageClass: 'alert-danger'
        });
    }
};

app.get('/events', requireAuth, (req, res) => {
    res.render('events');
});

app.get('/events', (req, res) => {
    if (req.user) {
        res.render('events');
    } else {
        res.render('login', {
            message: 'Please login to continue',
            messageClass: 'alert-danger'
        });
    }
});

const requireAuth = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.render('login', {
            message: 'Please login to continue',
            messageClass: 'alert-danger'
        });
    }
};

module.exports = router;