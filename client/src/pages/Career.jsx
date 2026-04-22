import React, { useState, useEffect } from 'react';
import api from "../api/api";

import {
    FaSearch,
    FaRocket,
    FaGlobe,
    FaLightbulb,
    FaChartLine,
    FaGraduationCap,
    FaUsers,
    FaChevronRight,
    FaArrowRight,
    FaStar,
    FaBrain,
    FaCode,
    FaPalette,
    FaBullseye,
    FaUserTie,
    FaHandshake,
    FaMagic,
    FaRobot,
    FaMobileAlt,
    FaFire,
    FaTimes,
    FaUpload,
    FaDollarSign,
    FaBriefcase,
    FaLinkedin,
    FaGithub,
    FaFilePdf,
} from 'react-icons/fa';

// Single Job Application Modal Component
const JobApplicationModal = ({ job, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        location: '',
        currentSalary: '',
        expectedSalary: '',
        experience: 'fresher',
        yearsOfExperience: '',
        resume: null,
        resumeName: '',
        linkedin: '',
        github: '',
        coverLetter: '',
        noticePeriod: 'immediate',
        isSubmitting: false
    });

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === 'file') {
            if (files && files[0]) {
                setFormData(prev => ({
                    ...prev,
                    resume: files[0],
                    resumeName: files[0].name
                }));
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setFormData(prev => ({ ...prev, isSubmitting: true }));

            const data = new FormData();

            // Personal Information
            data.append("name", formData.name);
            data.append("email", formData.email);
            data.append("phone", formData.phone);
            data.append("location", formData.location);

            // Professional Information
            data.append("experience", formData.experience);
            data.append("yearsOfExperience", formData.yearsOfExperience);
            data.append("currentSalary", formData.currentSalary);
            data.append("expectedSalary", formData.expectedSalary);
            data.append("linkedin", formData.linkedin);
            data.append("github", formData.github);
            data.append("noticePeriod", formData.noticePeriod);
            data.append("coverLetter", formData.coverLetter);

            // If job is selected, add job details
            if (job) {
                data.append("jobTitle", job.title);
                data.append("jobDepartment", job.department);
                data.append("jobLocation", job.location);
                data.append("jobId", job.id);
                data.append("applicationType", "specific");
            } else {
                data.append("jobTitle", "General Application");
                data.append("jobDepartment", "Various");
                data.append("applicationType", "general");
            }

            // Resume file
            data.append("resume", formData.resume);

            // Submit to single API endpoint
            const res = await api.post("/applications/apply", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            alert("Application submitted successfully ✅");
            onClose();

        } catch (error) {
            console.error(error);
            alert("Something went wrong ❌");
        } finally {
            setFormData(prev => ({ ...prev, isSubmitting: false }));
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center z-10">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            {job ? (
                                <>
                                    Apply for: <span className="text-primary">{job.title}</span>
                                </>
                            ) : (
                                "Start Your Application Journey"
                            )}
                        </h2>
                        <p className="text-gray-600">
                            {job ? `${job.department} • ${job.location}` : "Tell us about yourself and your career aspirations"}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-2xl"
                        type="button"
                    >
                        <FaTimes />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        {/* Personal Information */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                <FaUserTie className="text-primary" />
                                Personal Information
                            </h3>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone Number *
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    placeholder="+1 (555) 123-4567"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Current Location *
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    placeholder="City, Country"
                                />
                            </div>
                        </div>

                        {/* Professional Information */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                <FaBriefcase className="text-primary" />
                                Professional Information
                            </h3>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Experience Level *
                                </label>
                                <select
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                >
                                    <option value="fresher">Fresher (0-1 years)</option>
                                    <option value="junior">Junior (1-3 years)</option>
                                    <option value="mid">Mid-Level (3-5 years)</option>
                                    <option value="senior">Senior (5+ years)</option>
                                    <option value="lead">Lead (8+ years)</option>
                                </select>
                            </div>

                            {formData.experience !== 'fresher' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Years of Experience *
                                    </label>
                                    <input
                                        type="number"
                                        name="yearsOfExperience"
                                        value={formData.yearsOfExperience}
                                        onChange={handleInputChange}
                                        required={formData.experience !== 'fresher'}
                                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                        placeholder="3"
                                        min="0"
                                        max="50"
                                    />
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Current Salary (Annual)
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaDollarSign className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        name="currentSalary"
                                        value={formData.currentSalary}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                        placeholder="e.g., $60,000"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Expected Salary (Annual) *
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaDollarSign className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        name="expectedSalary"
                                        value={formData.expectedSalary}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full pl-10 px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                        placeholder="e.g., $80,000 - $100,000"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Resume Upload */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
                            <FaUpload className="text-primary" />
                            Resume / CV *
                        </h3>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                            <FaFilePdf className="text-3xl text-gray-400 mx-auto mb-2" />
                            <label className="block mb-2 cursor-pointer">
                                <span className="text-primary font-medium hover:text-primary/90">
                                    Click to upload
                                </span>
                                <input
                                    type="file"
                                    name="resume"
                                    onChange={handleInputChange}
                                    accept=".pdf,.doc,.docx"
                                    className="hidden"
                                    required
                                />
                                <span className="text-gray-600"> or drag and drop</span>
                            </label>
                            <p className="text-sm text-gray-500">
                                PDF, DOC, DOCX up to 10MB
                            </p>
                            {formData.resumeName && (
                                <p className="mt-2 text-sm text-green-600">
                                    ✓ Selected: {formData.resumeName}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Social Profiles */}
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                LinkedIn Profile
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaLinkedin className="text-primary" />
                                </div>
                                <input
                                    type="url"
                                    name="linkedin"
                                    value={formData.linkedin}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    placeholder="https://linkedin.com/in/username"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                GitHub Profile
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaGithub className="text-gray-700" />
                                </div>
                                <input
                                    type="url"
                                    name="github"
                                    value={formData.github}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    placeholder="https://github.com/username"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Additional Information */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
                            <FaGraduationCap className="text-primary" />
                            Additional Information
                        </h3>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Notice Period *
                            </label>
                            <select
                                name="noticePeriod"
                                value={formData.noticePeriod}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            >
                                <option value="immediate">Immediate (0-15 days)</option>
                                <option value="1month">1 Month</option>
                                <option value="2months">2 Months</option>
                                <option value="3months">3 Months</option>
                                <option value="negotiable">Negotiable</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {job ? "Cover Letter / Why should we hire you?" : "Tell us about yourself and your career aspirations"} *
                            </label>
                            <textarea
                                name="coverLetter"
                                value={formData.coverLetter}
                                onChange={handleInputChange}
                                required
                                rows="4"
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                placeholder={job ? "Tell us why you're the perfect fit for this role..." : "Share your motivation for joining our team and your career goals..."}
                            />
                        </div>
                    </div>

                    {/* Terms and Submit */}
                    <div className="border-t border-gray-200 pt-6">
                        <div className="flex items-start mb-6">
                            <input
                                type="checkbox"
                                id="terms"
                                required
                                className="mt-1 mr-2"
                            />
                            <label htmlFor="terms" className="text-sm text-gray-600">
                                I agree to the terms and conditions and confirm that the information provided is accurate.
                            </label>
                        </div>

                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={formData.isSubmitting}
                                className={`flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 ${formData.isSubmitting ? 'opacity-50 cursor-not-allowed' : 'transform hover:scale-105'} flex items-center justify-center gap-2`}
                            >
                                {formData.isSubmitting ? 'Submitting...' : 'Submit Application'}
                                {!formData.isSubmitting && <FaArrowRight />}
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 border-2 border-gray-300 hover:border-primary text-gray-700 hover:text-primary bg-white hover:bg-primary/5 font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Main Careers Page Component
const CareersPage = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 300);
        return () => clearTimeout(timer);
    }, []);

    const [searchTerm, setSearchTerm] = useState('');
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeTab, setActiveTab] = useState('all');
    const [hoveredCard, setHoveredCard] = useState(null);

    // Single modal state for all applications
    const [showApplicationModal, setShowApplicationModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

    // Job openings data
    const jobOpenings = [
        {
            id: 1,
            title: "AI Marketing Strategist",
            department: "Marketing",
            location: "Remote",
            experience: "3+ years",
            type: "Full-time",
            featured: true,
            salary: "$80k - $120k",
            icon: <FaBrain className="text-purple-500" />
        },
        {
            id: 2,
            title: "Performance Marketing Specialist",
            department: "Marketing",
            location: "Remote",
            experience: "2+ years",
            type: "Full-time",
            featured: true,
            salary: "$70k - $100k",
            icon: <FaBullseye className="text-red-500" />
        },
        {
            id: 3,
            title: "SEO & Growth Strategist",
            department: "Marketing",
            location: "Remote",
            experience: "3+ years",
            type: "Full-time",
            salary: "$75k - $110k",
            icon: <FaChartLine className="text-green-500" />
        },
        {
            id: 4,
            title: "Automation & CRM Specialist",
            department: "Technology",
            location: "Remote",
            experience: "4+ years",
            type: "Full-time",
            featured: true,
            salary: "$90k - $130k",
            icon: <FaRobot className="text-primary" />
        },
        {
            id: 5,
            title: "Content Writer & Brand Storyteller",
            department: "Creative",
            location: "Remote",
            experience: "2+ years",
            type: "Full-time",
            salary: "$60k - $90k",
            icon: <FaPalette className="text-pink-500" />
        },
        {
            id: 6,
            title: "Graphic Designer & Creative Strategist",
            department: "Creative",
            location: "Remote",
            experience: "3+ years",
            type: "Full-time",
            salary: "$65k - $95k",
            icon: <FaMagic className="text-yellow-500" />
        },
        {
            id: 7,
            title: "Web & App Developer",
            department: "Technology",
            location: "Remote",
            experience: "4+ years",
            type: "Full-time",
            featured: true,
            salary: "$85k - $125k",
            icon: <FaCode className="text-indigo-500" />
        },
        {
            id: 8,
            title: "UX/UI Designer",
            department: "Creative",
            location: "Remote",
            experience: "3+ years",
            type: "Full-time",
            salary: "$70k - $105k",
            icon: <FaMobileAlt className="text-teal-500" />
        },
        {
            id: 9,
            title: "Sales & Growth Consultant",
            department: "Business",
            location: "Remote",
            experience: "5+ years",
            type: "Full-time",
            salary: "$90k - $140k",
            icon: <FaUserTie className="text-orange-500" />
        },
    ];

    // Company stats
    const companyStats = [
        { number: "70+", label: "Team Members", icon: <FaUsers /> },
        { number: "500+", label: "Projects Delivered", icon: <FaGlobe /> },
        { number: "98%", label: "Client Satisfaction", icon: <FaStar /> },
        { number: "50+", label: "AI Projects", icon: <FaRobot /> },
    ];

    // Filter jobs based on search and tab
    const filteredJobs = jobOpenings.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.department.toLowerCase().includes(searchTerm.toLowerCase());

        if (activeTab === 'all') return matchesSearch;
        if (activeTab === 'featured') return matchesSearch && job.featured;
        return matchesSearch && job.department.toLowerCase() === activeTab;
    });

    // Handle scroll progress
    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            const currentScroll = window.scrollY;
            setScrollProgress((currentScroll / totalScroll) * 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Single function for all apply buttons
    const handleApplyClick = (job = null) => {
        setSelectedJob(job);
        setShowApplicationModal(true);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-primary/5">
            {/* Scroll Progress Bar */}
            <div className="fixed top-0 left-0 right-0 h-1 z-50">
                <div
                    className="h-full bg-gradient-to-r from-primary via-primary/70 to-primary/40 transition-all duration-300"
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>

            {/* Hero Section */}
            <div className="relative overflow-hidden bg-primary text-white py-52 px-4">
                <div className="container mx-auto relative z-10">
                    <div className="text-center max-w-5xl mx-auto">
                        <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold mb-6 leading-tight">
                            Build the <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300">
                                Future
                            </span>
                            <br />
                            of <span className="text-white">AI-Driven Growth</span>
                        </h1>

                        <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-primary-foreground/80 leading-relaxed font-light">
                            At AI Growth Exa, we're not just building marketing campaigns — we're architecting careers,
                            cultivating leaders, and crafting future-ready professionals.
                        </p>

                        <div className="flex flex-col md:flex-row justify-center gap-6">
                            {/* Explore Open Roles Button */}
                            <button
                                onClick={() => handleApplyClick(null)}
                                className="group relative overflow-hidden bg-white text-primary font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300 shadow-lg shadow-black/20 flex items-center justify-center gap-2"
                                type="button"
                            >
                                <span className="relative z-10">Explore Open Roles</span>
                                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </button>

                            <button
                                className="group relative bg-primary-foreground/10 border border-white/20 hover:border-white text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300 hover:bg-white/20 flex items-center justify-center gap-2"
                                type="button"
                            >
                                <span className="relative z-10">Meet Our Team</span>
                                <FaUsers className="text-white/60 group-hover:text-white transition-colors" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Abstract Background Shapes */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
            </div>

            {/* Stats Section */}
            <div className="py-16 bg-gradient-to-r from-white via-primary/5 to-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {companyStats.map((stat, index) => (
                            <div
                                key={index}
                                className="text-center group"
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 group-hover:from-primary/20 group-hover:to-primary/10 mb-4 transition-all duration-300 shadow-lg">
                                    <div className="text-primary text-2xl">{stat.icon}</div>
                                </div>
                                <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                                    {stat.number}
                                </div>
                                <div className="text-gray-600 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-16">

                {/* Welcome Message */}
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary/70 text-white px-6 py-2 rounded-full mb-6">
                        <FaStar className="text-yellow-300" />
                        <span className="font-semibold">Welcome to Our Careers Hub</span>
                    </div>

                    <h2 className="text-5xl md:text-6xl font-bold mb-8">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60">
                            This is Not Just a Job
                        </span>
                        <br />
                        <span className="text-gray-900">It's a Career Revolution</span>
                    </h2>

                    <p className="text-2xl text-gray-700 leading-relaxed mb-12">
                        If you're curious, ambitious, and electrified by AI, growth, and innovation,
                        you won't just work here — you'll <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">evolve here</span>.
                    </p>
                </div>

                {/* 3D Cards Section */}
                <div className="mb-24">
                    <h3 className="text-4xl font-bold text-center mb-12 text-gray-900">
                        This is a place for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">visionaries</span> who want to:
                    </h3>

                    <div className="grid md:grid-cols-3 gap-8 mb-20">
                        {[
                            {
                                title: "Learn Faster Than Lightning",
                                desc: "Accelerated learning with cutting-edge AI tools, weekly masterclasses, and access to premium courses.",
                                icon: <FaGraduationCap />,
                            },
                            {
                                title: "Tackle High-Impact Growth Challenges",
                                desc: "Solve real business problems for global clients, driving measurable ROI and transforming industries.",
                                icon: <FaChartLine />,
                            },
                            {
                                title: "Master Future-Ready Skills",
                                desc: "Build expertise in AI-driven marketing, predictive analytics, and growth strategies.",
                                icon: <FaRocket />,
                            }
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="group"
                                onMouseEnter={() => setHoveredCard(index)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                <div className={`
                  relative h-full bg-white
                  rounded-2xl p-8 shadow-xl hover:shadow-2xl
                  transform-gpu transition-all duration-500 ease-out
                  ${hoveredCard === index ? 'shadow-blue-500/10 -translate-y-2' : ''}
                  border border-gray-100
                `}>
                                    <div className="relative z-10">
                                        <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                                            <div className="text-3xl text-primary group-hover:text-white transition-colors duration-300">{item.icon}</div>
                                        </div>

                                        <h4 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h4>
                                        <p className="text-gray-600 leading-relaxed">{item.desc}</p>

                                        <div className="mt-8 pt-6 border-t border-gray-100">
                                            <div className="flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors">
                                                <span>Learn more about this</span>
                                                <FaChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Job Openings Section */}
                <div className="mb-24">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary/80 text-white px-6 py-2 rounded-full mb-4">
                            <FaFire />
                            <span className="font-semibold">We're Hiring!</span>
                        </div>

                        <h2 className="text-5xl font-bold text-gray-900 mb-6">
                            Open Roles{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80">
                                (Future-Focused Hiring)
                            </span>
                        </h2>

                        <p className="text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                            We're actively seeking high-potential professionals across our AI-driven service verticals.
                            Join us in building the future of digital transformation.
                        </p>
                    </div>

                    {/* Search and Filters */}
                    <div className="max-w-4xl mx-auto mb-12">
                        <div className="relative mb-8">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <FaSearch className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="w-full px-4 py-3 pl-12 rounded-lg border-2 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-lg rounded-xl"
                                placeholder="Search roles by title, department, or skills..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Tabs */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            <button
                                onClick={() => setActiveTab('all')}
                                className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'all' ? 'bg-white shadow-md text-primary' : 'text-gray-600 hover:text-gray-900 bg-gray-100'}`}
                                type="button"
                            >
                                All Roles
                            </button>
                            <button
                                onClick={() => setActiveTab('featured')}
                                className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${activeTab === 'featured' ? 'bg-white shadow-md text-primary' : 'text-gray-600 hover:text-gray-900 bg-gray-100'}`}
                                type="button"
                            >
                                <FaStar className="text-yellow-500" />
                                Featured
                            </button>
                            <button
                                onClick={() => setActiveTab('marketing')}
                                className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'marketing' ? 'bg-white shadow-md text-primary' : 'text-gray-600 hover:text-gray-900 bg-gray-100'}`}
                                type="button"
                            >
                                Marketing
                            </button>
                            <button
                                onClick={() => setActiveTab('technology')}
                                className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'technology' ? 'bg-white shadow-md text-primary' : 'text-gray-600 hover:text-gray-900 bg-gray-100'}`}
                                type="button"
                            >
                                Technology
                            </button>
                            <button
                                onClick={() => setActiveTab('creative')}
                                className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'creative' ? 'bg-white shadow-md text-primary' : 'text-gray-600 hover:text-gray-900 bg-gray-100'}`}
                                type="button"
                            >
                                Creative
                            </button>
                        </div>
                    </div>

                    {/* Job Cards Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {filteredJobs.map((job) => (
                            <div
                                key={job.id}
                                className="group"
                            >
                                <div className="bg-white rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 h-full hover:border-blue-300 overflow-hidden">
                                    <div className="p-6 pb-2">
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                                                    {job.icon}
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                                        {job.title}
                                                    </h3>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                                                            {job.department}
                                                        </span>
                                                        {job.featured && (
                                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-primary/60 to-primary/90 text-white">
                                                                <FaStar className="mr-1" /> Featured
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 pt-2">
                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <div className="space-y-1">
                                                <div className="text-sm text-gray-500">Location</div>
                                                <div className="font-medium flex items-center gap-2">
                                                    <FaGlobe className="text-gray-400" />
                                                    {job.location}
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="text-sm text-gray-500">Experience</div>
                                                <div className="font-medium">{job.experience}</div>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="text-sm text-gray-500">Type</div>
                                                <div className="font-medium">{job.type}</div>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="text-sm text-gray-500">Salary Range</div>
                                                <div className="font-medium text-green-600">{job.salary}</div>
                                            </div>
                                        </div>

                                        <p className="text-gray-600 text-sm">
                                            Join our team to work on cutting-edge AI solutions that transform businesses globally.
                                        </p>
                                    </div>

                                    <div className="p-6 pt-2">
                                        {/* Apply Now Button */}
                                        <button
                                            onClick={() => handleApplyClick(job)}
                                            className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 group/btn"
                                            type="button"
                                        >
                                            <span>Apply Now</span>
                                            <FaArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredJobs.length === 0 && (
                        <div className="text-center py-16">
                            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
                                <FaSearch className="text-3xl text-gray-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">No roles match your search</h3>
                            <p className="text-gray-600 max-w-md mx-auto">
                                Try a different search term or browse all roles.
                            </p>
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setActiveTab('all');
                                }}
                                className="mt-6 border-2 border-gray-300 hover:border-primary text-gray-700 hover:text-primary bg-white hover:bg-primary/5 font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                                type="button"
                            >
                                View All Roles
                            </button>
                        </div>
                    )}

                    <div className="text-center mt-12">
                        <p className="text-gray-500 text-sm">
                            *Even if your role isn't listed, we'd still love to hear from driven, high-impact talent.
                        </p>
                    </div>
                </div>

                {/* Final CTA Section */}
                <div className="text-center py-20">
                    <div className="max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary/80 text-white px-8 py-3 rounded-full mb-8">
                            <FaHandshake className="text-xl" />
                            <span className="text-lg font-bold">Ready to Transform Your Career?</span>
                        </div>

                        <h2 className="text-6xl font-bold mb-10">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary/60">
                                Apply to Join
                            </span>
                            <br />
                            <span className="text-gray-900">AI Growth Exa Today</span>
                        </h2>

                        <p className="text-2xl text-gray-700 mb-12 leading-relaxed max-w-3xl mx-auto">
                            Don't just find a job. Find a mission. Find a team that challenges you,
                            supports you, and accelerates your growth beyond imagination.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            {/* Start Your Application Journey Button */}
                            <button
                                onClick={() => handleApplyClick(null)}
                                className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-white font-bold py-5 px-14 rounded-2xl text-xl transition-all duration-300 shadow-2xl shadow-primary/30 flex items-center justify-center gap-4"
                                type="button"
                            >
                                <span className="relative z-10">Start Your Application Journey</span>
                                <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Single Modal for all applications */}
            {showApplicationModal && (
                <JobApplicationModal
                    job={selectedJob}
                    onClose={() => {
                        setShowApplicationModal(false);
                        setSelectedJob(null);
                    }}
                />
            )}
        </div>
    );
};

export default CareersPage;
