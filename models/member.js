const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    photo: String,
    address: String,
    phone: String,
    email: String,
    number: Number
});

module.exports = mongoose.model('Member', MemberSchema);
