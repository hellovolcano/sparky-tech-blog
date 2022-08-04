const User = require('./User')
const Post = require('./Post')

// Post has one user
Post.belongsTo(User, {
    foreignKey: 'user_id'
})

// User has many posts
User.hasMany(Post, {
    foreignKey: 'user_id'
})

module.exports = { User, Post }