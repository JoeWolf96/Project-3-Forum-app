const mongoose = require('mongoose');
const { Schema, model } = mongoose;


const usersSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    topics: [{
        type: String,
        ref: 'Topics',
    }]
})


module.exports = model('User', usersSchema)
