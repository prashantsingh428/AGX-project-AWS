const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({
    title: { type: String, required: true },
    department: { type: String, required: true },
    location: { type: String, default: 'Remote' },
    type: { type: String, enum: ['Full-time', 'Part-time', 'Contract'], default: 'Full-time' },
    description: { type: String, required: true },
    requirements: [{ type: String }],
    active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Career', careerSchema);
