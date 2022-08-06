const router = require('express').Router()
const sequelize = require('../config/connection')
const { Post, User, Comment } = require('../models')

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

// get one post
router.get('/post/:id', (req,res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id','title','post_content','created_at'],
        include: [
            {
                model: Comment,
                attributes: ['id','comment_body','user_id','post_id'],
                includes: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']  
            }
            
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post founnd with this id'})
            return
        }
        // serialize the data
        const post = dbPostData.get({ plain: true })

        // pass the data to the template
        res.render('post', {
            post,
            loggedIn: req.session.loggedIn
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})


// signup route
router.get('/signup', (req, res) => {
    res.render('signup')
})

module.exports = router