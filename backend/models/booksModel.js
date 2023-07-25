const mongoose = require('mongoose');

const languageNameSchema = mongoose.Schema({

    languageName: {
        
        type: String
    }
})
const bookSchema = mongoose.Schema({
   
    name: {

        type: String
    },
    languages: [languageNameSchema],

    typeName: {

        type: String
    }
})

module.exports = mongoose.model('books', bookSchema);