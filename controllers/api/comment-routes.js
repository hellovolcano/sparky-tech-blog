const router = require('express').Router()
const { Comment } = require('../../models')

//GET all comments
router.get('/', (req,res) => {
    Comment.findAll()
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

// CREATE a new comment
router.post('/', (req, res) => {
    // check the session
    
    if (req.session) {

       Comment.create({
        comment_body: req.body.comment_body,
        post_id: req.body.post_id,
        // use the id from the session
        user_id: req.session.user_id
        // user_id: 1
        })
            .then(dbCommentData => res.json(dbCommentData))
            .catch(err => {
                console.log(err)
                res.status(400).json(err)
            }) 
    }

    
})

// DELETE a comment
router.delete('/:id', (req,res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then((dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({ message: 'No comment with that id was found!'})
            return
        }
        res.json(dbCommentData)
    }))
    .catch(err => {
        console.log(err)
        res.status(500).res(err)
    })
})

module.exports = router