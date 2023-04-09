const mongoose = require('mongoose');
const { Schema } = mongoose;
const ClassSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user_obj'
    },
    TeacherName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    discription: {
        type: String,
        required: true,
    },
    classCode: {
        type: String,
        default: ""
    },
    ScheduledTime: {
        type: String,
        default: true,
    }
})

// model declared 
module.exports = mongoose.model('classes', ClassSchema)