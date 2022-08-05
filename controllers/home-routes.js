const router = require('express').Router()
const sequelize = require('../config/connection')
const { Post, User } = require('../models')

// GET all posts
router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'post_content',
            'created_at'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        // pass a single post object into the homepage template
        const posts = dbPostData.map(post => post.get({ plain: true }))
        res.render('home', { 
            posts,
            loggedIn: req.session.loggedIn })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

// login route
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/')
        return
    }

    res.render('login')
})

module.exports = router