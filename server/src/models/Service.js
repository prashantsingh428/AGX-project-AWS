const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    title: { type: String, required: true },
    tagline: { type: String },
    category: { type: String, required: true },
    shortDesc: { type: String, required: true },
    features: [{ type: String }],
    benefits: [{ type: String }],
    faqs: [{
        q: { type: String },
        a: { type: String }
    }],
    platforms: [{ type: String }],
    iconName: { type: String }
}, { timestamps: true });

serviceSchema.index({
    title: 'text',
    category: 'text',
    shortDesc: 'text',
    tagline: 'text'
});

module.exports = mongoose.model('Service', serviceSchema);
