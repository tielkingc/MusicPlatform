const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('homepage')
})

router.get('/home', (req, res) => {
    res.render('landing')
})

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/home');
        return;
    }
    
    res.render('login');
})

router.get('/signup', (req, res) => {
    res.render('signup')
})

router.get('/community', (req, res) => {
    res.render('community')
})

router.get('/events', (req, res) => {
    res.render('events')
})

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

module.exports = router;