const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    clientName: { type: String, required: true },
    company: { type: String, required: true },
    content: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    image: { type: String } // URL to image
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);
