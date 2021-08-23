const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true    
    },
    src: {
        type: String,
        required: true,
    },
    albumId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album'
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});


const ImageModel = mongoose.model('ImageModel', ImageSchema);
module.exports = ImageModel;