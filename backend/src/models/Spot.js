const mongoose = require('mongoose');
const env = require('../config/env');
const appUrl = env.appUrl;

const SpotSchema = new mongoose.Schema({
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, {
    toJSON: {
        virtuals: true,
    },
});

SpotSchema.virtual('thumbnail_url').get(function () {
    return `${appUrl}/files/${this.thumbnail}`;
});

module.exports = mongoose.model('Spot', SpotSchema);