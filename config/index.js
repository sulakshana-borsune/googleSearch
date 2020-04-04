
module.exports = require('mongoose').connect('mongodb://localhost/bookdb',{
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true
})