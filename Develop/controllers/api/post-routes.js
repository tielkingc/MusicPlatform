const router = require('express').Router();
const { Post, User } = require('../../models');

router.get('/', (req, res) => {
    console.log("======================");
    Post.findAll({
        attribues: ['id', 'post_content', 'created_at'],
        order: [['created_at', 'DESC']],
        include : [
            {
                model: User,
                attributes: ['first_name', 'last_name']
            }
        ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'post_conent', 'created_at'],
        include: [
            {
                model: User,
                attributes: ['first_name', 'last_name']
            }
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post with that ID. '});
            return;
        }

        res.json(dbPostData);
    })
    .catch(dbPostData => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.post('/', (req, res) => {
    Post.create({
        // title: req.body.title,
        post_content: req.body.post_content
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
});

router.put('/:id', (req, res) => {
    Post.update(
        {
            title: req.body.title
        },
        {
        where: {
            id: req.params.id
        }
    }
    )
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: "No post with that ID." });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: "No post with that ID." });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;