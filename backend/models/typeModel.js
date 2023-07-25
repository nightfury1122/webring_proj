const mongoose = require('mongoose');

const typeSchema = mongoose.Schema({

    type_name:{
        
        type:String
    }
})

module.exports= mongoose.model('types',typeSchema); 
