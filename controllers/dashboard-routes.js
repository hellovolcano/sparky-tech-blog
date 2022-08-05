const router = require('express').Router()
const sequelize = require('../config/connection')
const { User, Post } = require('../models')

// Render the dashboard
router.get('/', (req,res) => {
    Post.findAll({
        where: {
            //use the id from the session
            id: req.session.user_id
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

module.exports = router