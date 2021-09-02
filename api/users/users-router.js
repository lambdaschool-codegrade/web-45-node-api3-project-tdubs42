const router = require('express').Router()
const User = require('./users-model')
const Post = require('../posts/posts-model')
const {validateUserId, validateUser, validatePost} = require('../middleware/middleware')

router.get('/', (req, res, next) => {
  User.get()
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:id', validateUserId, (req, res) => {
  res.json(req.user)
})

router.post('/', validateUser, (req, res, next) => {
  User.insert(req.body)
    .then(newUser => res.status(201).json(newUser))
    .catch(next)
})

router.put('/:id', validateUser, validateUserId, (req, res, next) => {
  const {id} = req.user
  const changes = req.body
  User.update(id, changes)
    .then(updated => res.json(updated))
    .catch(next)
})

router.delete('/:id', validateUserId, (req, res, next) => {
  const {id} = req.user
  User.remove(id)
    .then(numberOfRecordsDeleted => res.json(req.user))
    .catch(next)
})

router.get('/:id/posts', validateUserId, (req, res, next) => {
  const {id} = req.user
  User.getUserPosts(id)
    .then(posts => res.json(posts))
    .catch(next)
})

router.post('/:id/posts', validatePost, validateUserId, (req, res, next) => {
  const newPost = {...req.body, user_id: req.user.id}
  Post.insert(newPost)
    .then(posted => res.status(201).json(posted))
    .catch(next)
})

/* eslint-disable */
router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    fromTheDev: 'Mistakes were made'
  })
})
/* eslint-enable */

module.exports = router
