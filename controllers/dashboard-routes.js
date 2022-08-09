const router = require('express').Router()
const sequelize = require('../config/connection')
const { User, Post, Comment } = require('../models')
const withAuth = require('../utils/auth')

// Render the dashboard
router.get('/', withAuth, (req,res) => {
    Post.findAll({
        where: {
            //use the id from the session
            user_id: req.session.user_id
        },
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
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id','title','post_content','created_at'],
        include: [
            {
                model: Comment,
                attributes: ['id','comment_body','user_id','post_id','created_at'],
                include: {
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
            res.status(404).json({ message: 'No post found'})
            return
        }

        // serialize data before passing to template
        const post = dbPostData.get({ plain: true });
        res.render('edit-post', { post, loggedIn: req.session.loggedIn })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.get('/new-post', (req,res) => {
    res.render('new-post', { loggedIn: req.session.loggedIn})
})

module.exports = router