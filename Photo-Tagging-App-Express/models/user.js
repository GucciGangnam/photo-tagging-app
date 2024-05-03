
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    ID: {
        type: String,
        required: true,
    },
    DURATION: { 
        type: Number,
        required: false
    },
    FIRST_NAME: {
        type: String,
        required: false,
    },
    LAST_NAME: {
        type: String,
        required: false,
    },
    START_TIME: {
        type: Date,
        required: true,
    },
    FINISH_TIME: {
        type: Date,
        required: false,
    },
    FOUND_TOM: {
        type: Boolean,
        required: true,
    },
    FOUND_SPIDERMAN: {
        type: Boolean,
        required: true,
    },
    FOUND_KENNY: {
        type: Boolean,
        required: true,
    },
    FOUND_ROGER: {
        type: Boolean,
        required: true,
    },
    FOUND_BRIAN: {
        type: Boolean,
        required: true,
    },
    IP_ADDRESSES: {
        type: Array,
        required: false
    },
}, { collection: 'Users' }); // Specify the collection name here

// Set the connection explicitly
module.exports = mongoose.model('User', usersSchema, 'Users');