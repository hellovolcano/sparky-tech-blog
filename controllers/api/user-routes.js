const router = require('express').Router()
const sequelize = require('../../config/connection')
const { User, Post } = require('../../models')

// GET ALL users
router.get('/', (req,res) => {
    User.findAll({
        attributes: { exclude: ['password']}
    })
    .then(dbUserData => res.json(dbUserData))
})

// GET one user
router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user with that id found'})
        }

        res.json(dbUserData)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})


// Create a user
router.post('/', (req,res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

// login route for a user
router.post('/login', (req,res) => {

    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user with that email address! '})
            return
        }
        
        const validPassword = dbUserData.checkPassword(req.body.password)

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!'})
            return
        }
        req.session.save(() => {
            // declare session variables
            req.session.user_id = dbUserData.id
            req.session.username = dbUserData.username
            req.session.loggedIn = true
                
            res.json({ user: dbUserData, message: 'You are now logged in!'})
        })
    })
})

//logout route
router.post('/logout', (req, res) => {
    // if the session loggedIn variable evaluates to true, destroy the session
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end()
        })
    }
    else {
        res.status(404).end()
    }
})

// delete a user
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: "No user with that ID found"})
            return
        }
        res.json(dbUserData)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

module.exports = router