const mongoose = require('mongoose');
const { Schema, model } = mongoose;


const topicsSchema = new Schema({
    name: { type: String },
})

const Topic = model('Topics', topicsSchema)
module.exports = Topic
