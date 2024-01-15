const mongoose = require('mongoose');
const {Schema} = mongoose;
const SecretSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
});


const Secret = mongoose.model('notes', SecretSchema);
module.exports = Secret