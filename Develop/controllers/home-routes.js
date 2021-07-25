const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('homepage')
})

router.get('/home', (req, res) => {
    res.render('landing')
})

router.get('/login', (req, res) => {
    res.render('login')
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

module.exports = router;