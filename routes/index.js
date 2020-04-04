const router = require('express').Router()

router.use('/api', require('./booksearchRoutes.js'))

module.exports = router