const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {
        type: String,
        required: [true, 'title is required']

    },
    description: {
        type: String,
        required: [true, 'description is required']
    },
    tags: {
        type: String,
        enum: ['important', 'urgent'],
        required: true
    }

}, { timestamps: true })


const TASKS = mongoose.model('task', taskSchema);


module.exports = TASKS