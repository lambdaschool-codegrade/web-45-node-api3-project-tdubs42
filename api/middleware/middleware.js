const User = require('../users/users-model')

const logger = (req, res, next) => {
  const dateAndTime = new Date()
  const formatDateTime = `${dateAndTime.getFullYear()}-${(dateAndTime.getMonth() + 1)}-${dateAndTime.getDate()} ${dateAndTime.getHours()}:${dateAndTime.getMinutes()}:${dateAndTime.getSeconds()}`
  const formatUrl = `${req.baseUrl}${req.url}`
  const log = `---------------------------
  date: ${formatDateTime} 
  method: ${req.method}
  URL: ${formatUrl}
  status: ${res.statusCode}
  requester IP: ${req.ip} \n************`
  console.log(log)
  next()
}

const validateUserId = (req, res, next) => {
  User.getById(req.params.id)
    .then(found => {
      if (!found) {
        next({status: 404, message: 'user not found'})
      }
      if (found) {
        req.user = found
        next()
      }
    })
    .catch(next)
}

const validateUser = (req, res, next) => {
  if (!req.body.name) {
    next({status: 400, message: 'missing required name field'})
  }
  next()
}

const validatePost = (req, res, next) => {
  if (!req.body.text) {
    next({status: 400, message: 'missing required text field'})
  }
  next()
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}
