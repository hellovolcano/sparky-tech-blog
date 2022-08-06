const User = require('./User')
const Post = require('./Post')
const Comment = require('./Comment')

// Post has one user
Post.belongsTo(User, {
    foreignKey: 'user_id'
})

// User has many posts
User.hasMany(Post, {
    foreignKey: 'user_id'
})

User.hasMany(Comment, {
    foreignKey: 'user_id'
})

Post.hasMany(Comment, {
    foreignKey: 'post_id'
})

module.exports = { User, Post, Comment }