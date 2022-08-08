const router = require('express').Router()
const sequelize = require('../../config/connection')
const { Post, Comment, User } = require('../../models')
const withAuth = require('../../utils/auth')

// get all posts
router.get('/', (req, res) => {
    Post.findAll()
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})


// get one post
router.get('/:id', (req,res) => {
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
        res.json(dbPostData)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

// create a post
router.post('/', withAuth, (req, res) => {
    Post.create({
        title: req.body.title,
        post_content: req.body.post_content,
        user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

// Update the title of the post
router.put('/:id', withAuth, (req,res) => {
    Post.update(
        {
            title: req.body.title,
            post_content: req.body.post_content
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: 'No post found with this id!'})
            retur
        }
        res.json(dbPostData)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

// delete a post
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: "No post with that ID found"})
            return
        }
        res.json(dbPostData)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})
module.exports = router