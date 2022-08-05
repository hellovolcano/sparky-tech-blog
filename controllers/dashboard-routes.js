const router = require('express').Router()
const sequelize = require('../config/connection')
const { User, Post } = require('../models')

// Render the dashboard
router.get('/', (req,res) => {
    Post.findAll({
        where: {
            //use the id from the session
            user_id: req.session.user_id
        }
    })
    
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.get('/edit/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found'})
            return
        }

        // serialize data before passing to template
        const post = dbPostData.get({ plain: true });
        res.render('edit-post', { post, loggedIn: true })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.get('/new-post', (req,res) => {
    res.render('new-post')
})

module.exports = router