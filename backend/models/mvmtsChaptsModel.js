const mongoose = require('mongoose');

const languageNameSchema = mongoose.Schema({

    languageName: {

        type: String
    }
});

const mvmtsChapsSchema = mongoose.Schema({

    name: {

        type: String
    },
    bookName: {

        type: String
    },
    type: {

        type: String
    },
    languages: [languageNameSchema]

})

module.exports = mongoose.model('mvmtsChaps', mvmtsChapsSchema);