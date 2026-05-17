import React, { useState, useEffect } from 'react';
import api from "../api/api";
import { useNotification } from "../context/NotificationContext";

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
    FaCheck,
} from 'react-icons/fa';

// Single Job Application Modal Component
const JobApplicationModal = ({ job, onClose, onSubmit }) => {
    const { showNotification } = useNotification();
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

            showNotification("Application submitted successfully ✅", "success");
            onClose();

        } catch (error) {
            console.error(error);
            showNotification("Something went wrong ❌", "error");
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
    const { showNotification } = useNotification();
    const [consultationData, setConsultationData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
    });
    const [isConsulting, setIsConsulting] = useState(false);

    const handleConsultationChange = (e) => {
        setConsultationData({ ...consultationData, [e.target.name]: e.target.value });
    };

    const handleConsultationSubmit = async () => {
        if (!consultationData.name || !consultationData.email) {
            showNotification('Please fill in required fields', 'error');
            return;
        }
        setIsConsulting(true);
        try {
            // Map subject to message as the backend requires a message field
            const payload = {
                ...consultationData,
                message: `Career/Financial Consultation Inquiry: ${consultationData.subject || 'No subject provided'}`
            };
            await api.post('/contact', payload);
            showNotification('Consultation request sent successfully!', 'success');
            setConsultationData({ name: '', email: '', phone: '', subject: '' });
        } catch (error) {
            showNotification('Failed to send request. Please try again.', 'error');
        } finally {
            setIsConsulting(false);
        }
    };

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
        <div className="min-h-screen bg-white font-sans selection:bg-primary selection:text-white pb-20">
            {/* Scroll Progress Bar */}
            <div className="fixed top-0 left-0 right-0 h-1 z-50">
                <div
                    className="h-full bg-gradient-to-r from-primary via-primary/70 to-primary/40 transition-all duration-300"
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>

            {/* 1. HERO SECTION (matches "Guiding Your Path to Prosperity" screenshot) */}
            <div className="relative w-full h-[600px] md:h-[700px] flex items-center mb-48">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80" alt="Team collaborating" className="w-full h-full object-cover" />
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0B1220]/90 via-[#0B1220]/80 to-[#0B1220]/30" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 text-orange-400 font-bold tracking-wider uppercase text-sm mb-4">
                            <span className="w-2 h-2 rounded-full bg-orange-400" /> Career Vision
                        </div>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight mb-6">
                            Guiding Your Path<br />to Prosperity
                        </h1>
                        <p className="text-gray-300 text-lg mb-8 leading-relaxed max-w-xl">
                            At AI Growth Exa, we're not just building marketing campaigns — we're architecting careers, cultivating leaders, and crafting future-ready professionals dedicated to your growth.
                        </p>
                        <button
                            onClick={() => {
                                document.getElementById("open-roles").scrollIntoView({ behavior: "smooth" });
                            }}
                            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-full transition shadow-lg flex items-center gap-2"
                        >
                            Start Your Journey Today <FaArrowRight />
                        </button>
                    </div>
                </div>

                {/* Overlapping Cards */}
                <div className="absolute -bottom-24 left-0 right-0 z-20">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-3 gap-6">
                            {/* Card 1 */}
                            <div className="bg-white rounded-xl shadow-xl p-6 flex gap-4 items-start border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
                                <div className="w-12 h-12 rounded-full bg-[#0B1220] text-white flex justify-center items-center flex-shrink-0 text-xl shadow-md">
                                    <FaGraduationCap />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">Learn Faster</h3>
                                    <p className="text-sm text-gray-600">Accelerated learning with cutting-edge AI tools and masterclasses.</p>
                                </div>
                            </div>
                            {/* Card 2 */}
                            <div className="bg-white rounded-xl shadow-xl p-6 flex gap-4 items-start border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
                                <div className="w-12 h-12 rounded-full bg-[#0B1220] text-white flex justify-center items-center flex-shrink-0 text-xl shadow-md">
                                    <FaChartLine />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">Tackle Challenges</h3>
                                    <p className="text-sm text-gray-600">Solve real business problems driving measurable ROI.</p>
                                </div>
                            </div>
                            {/* Card 3 */}
                            <div className="bg-white rounded-xl shadow-xl p-6 flex gap-4 items-start border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
                                <div className="w-12 h-12 rounded-full bg-[#0B1220] text-white flex justify-center items-center flex-shrink-0 text-xl shadow-md">
                                    <FaRocket />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">Master Skills</h3>
                                    <p className="text-sm text-gray-600">Build expertise in AI-driven marketing and analytics.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. ABOUT COMPANY */}
            <div id="life-at-exa" className="container mx-auto px-4 py-20">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2 relative">
                        {/* Background orange shape mimicking screenshot */}
                        <div className="absolute -top-10 -left-10 w-full h-full bg-orange-200 rounded-tl-[100px] rounded-br-[100px] -z-10 opacity-80"></div>
                        <img src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=800&q=80" alt="Team discussion" className="w-full rounded-tr-[50px] rounded-bl-[50px] shadow-xl z-10 relative object-cover h-[500px]" />
                        
                        {/* Little floating dot elements */}
                        <div className="absolute top-1/4 -left-4 w-8 h-8 rounded-full bg-orange-400 z-20 flex justify-center items-center text-white shadow-lg"><FaStar size={12}/></div>
                        <div className="absolute bottom-1/4 -right-4 w-8 h-8 rounded-full bg-[#0B1220] z-20 flex justify-center items-center text-white shadow-lg"><FaStar size={12}/></div>
                    </div>
                    
                    <div className="lg:w-1/2 pl-0 md:pl-10">
                        <div className="inline-flex items-center gap-2 text-orange-400 font-bold tracking-wider uppercase text-xs mb-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-400" /> About Company
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0B1220] mb-6 leading-tight">
                            Committed to Your Career <br className="hidden md:block"/> Success and Security
                        </h2>
                        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                            If you're curious, ambitious, and electrified by AI, growth, and innovation, you won't just work here — you'll evolve here. We help you achieve career peace of mind through personalized mentoring and expert guidance.
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                            <div className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full bg-orange-100 text-orange-500 flex justify-center items-center"><FaCheck size={10}/></div>
                                <span className="text-gray-800 font-bold text-sm">Work with Experts</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full bg-orange-100 text-orange-500 flex justify-center items-center"><FaCheck size={10}/></div>
                                <span className="text-gray-800 font-bold text-sm">Unleash Your Potential</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full bg-orange-100 text-orange-500 flex justify-center items-center"><FaCheck size={10}/></div>
                                <span className="text-gray-800 font-bold text-sm">Your Success is Ours</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full bg-orange-100 text-orange-500 flex justify-center items-center"><FaCheck size={10}/></div>
                                <span className="text-gray-800 font-bold text-sm">Transforming Businesses</span>
                            </div>
                        </div>

                        <button className="border border-gray-300 hover:border-orange-400 text-gray-700 hover:text-orange-500 px-8 py-3 rounded-full transition font-semibold text-sm">
                            About Us <FaChevronRight className="inline ml-2 text-[10px]"/>
                        </button>
                    </div>
                </div>
            </div>

            {/* 3. OUR DEPARTMENTS (Mimicking "Our Financial Solutions") */}
            <div className="bg-slate-50 py-24 border-y border-gray-100 mt-10">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                        <div>
                            <div className="inline-flex items-center gap-2 text-orange-400 font-bold tracking-wider uppercase text-xs mb-4">
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-400" /> Latest Roles
                            </div>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0B1220]">
                                Our Departments
                            </h2>
                        </div>
                        <p className="text-gray-500 max-w-md text-sm leading-relaxed">
                            Our commitment is to provide actionable environments that help you make informed decisions and achieve long-term career success. Trust us to be your partner in growth.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Dept 1 */}
                        <div className="bg-white p-6 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 group">
                            <h3 className="text-xl font-bold text-[#0B1220] mb-6 text-center border-b border-gray-100 pb-4">Marketing & Strategy</h3>
                            <div className="relative h-48 overflow-hidden mb-6">
                                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80" alt="Marketing" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                <div className="absolute -bottom-4 right-4 w-10 h-10 bg-[#1A3636] rounded-full flex justify-center items-center text-white z-10 shadow-lg">
                                    <FaChartLine size={16}/>
                                </div>
                            </div>
                            <p className="text-gray-500 text-sm mb-6 line-clamp-3 text-center px-4">
                                We analyze market situations, project future trends, and create holistic growth plans.
                            </p>
                            <div className="text-center">
                                <button className="text-[#0B1220] font-bold text-xs uppercase tracking-wider hover:text-orange-500 transition-colors" onClick={() => { setActiveTab('marketing'); document.getElementById("open-roles").scrollIntoView({ behavior: "smooth" }); }}>
                                    Read More <FaArrowRight className="inline ml-1 text-[10px]"/>
                                </button>
                            </div>
                        </div>
                        {/* Dept 2 */}
                        <div className="bg-white p-6 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 group">
                            <h3 className="text-xl font-bold text-[#0B1220] mb-6 text-center border-b border-gray-100 pb-4">Technology & AI</h3>
                            <div className="relative h-48 overflow-hidden mb-6">
                                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80" alt="Technology" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                <div className="absolute -bottom-4 right-4 w-10 h-10 bg-[#1A3636] rounded-full flex justify-center items-center text-white z-10 shadow-lg">
                                    <FaCode size={16}/>
                                </div>
                            </div>
                            <p className="text-gray-500 text-sm mb-6 line-clamp-3 text-center px-4">
                                We develop comprehensive technical solutions, including automation and custom architecture.
                            </p>
                            <div className="text-center">
                                <button className="text-[#0B1220] font-bold text-xs uppercase tracking-wider hover:text-orange-500 transition-colors" onClick={() => { setActiveTab('technology'); document.getElementById("open-roles").scrollIntoView({ behavior: "smooth" }); }}>
                                    Read More <FaArrowRight className="inline ml-1 text-[10px]"/>
                                </button>
                            </div>
                        </div>
                        {/* Dept 3 */}
                        <div className="bg-white p-6 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 group">
                            <h3 className="text-xl font-bold text-[#0B1220] mb-6 text-center border-b border-gray-100 pb-4">Creative & Design</h3>
                            <div className="relative h-48 overflow-hidden mb-6">
                                <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80" alt="Creative" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                <div className="absolute -bottom-4 right-4 w-10 h-10 bg-[#1A3636] rounded-full flex justify-center items-center text-white z-10 shadow-lg">
                                    <FaPalette size={16}/>
                                </div>
                            </div>
                            <p className="text-gray-500 text-sm mb-6 line-clamp-3 text-center px-4">
                                We tailor visual solutions to your brand goals and risk tolerance, ensuring a stellar portfolio.
                            </p>
                            <div className="text-center">
                                <button className="text-[#0B1220] font-bold text-xs uppercase tracking-wider hover:text-orange-500 transition-colors" onClick={() => { setActiveTab('creative'); document.getElementById("open-roles").scrollIntoView({ behavior: "smooth" }); }}>
                                    Read More <FaArrowRight className="inline ml-1 text-[10px]"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. HIRING PROCESS (Mimicking "How We Operate") */}
            <div className="container mx-auto px-4 py-24">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 text-orange-400 font-bold tracking-wider uppercase text-xs mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400" /> Work Process
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0B1220]">
                        How We Operate
                    </h2>
                </div>

                <div className="relative max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center text-center gap-12 md:gap-0 mt-10">
                    {/* Connecting line for desktop */}
                    <div className="hidden md:block absolute top-10 left-24 right-24 border-t-2 border-dotted border-gray-300 -z-10"></div>

                    {/* Step 1 */}
                    <div className="flex flex-col items-center bg-white z-10 w-56 group">
                        <div className="w-20 h-20 bg-orange-50 group-hover:bg-orange-100 rounded-full flex justify-center items-center text-2xl text-orange-500 border-4 border-white shadow-sm transition-colors mb-6 relative">
                            <span className="absolute -top-1 -right-1 w-6 h-6 bg-orange-400 rounded-full text-white text-[10px] font-bold flex justify-center items-center border-2 border-white">01</span>
                            <FaFilePdf />
                        </div>
                        <h4 className="font-bold text-[#0B1220] text-sm mb-2">Initial Application</h4>
                        <p className="text-xs text-gray-500 px-4 leading-relaxed">Discuss your career goals and needs during a personalized review.</p>
                    </div>
                    {/* Step 2 */}
                    <div className="flex flex-col items-center bg-white z-10 w-56 group">
                        <div className="w-20 h-20 bg-orange-50 group-hover:bg-orange-100 rounded-full flex justify-center items-center text-2xl text-orange-500 border-4 border-white shadow-sm transition-colors mb-6 relative">
                            <span className="absolute -top-1 -right-1 w-6 h-6 bg-orange-400 rounded-full text-white text-[10px] font-bold flex justify-center items-center border-2 border-white">02</span>
                            <FaUserTie />
                        </div>
                        <h4 className="font-bold text-[#0B1220] text-sm mb-2">Strategy Development</h4>
                        <p className="text-xs text-gray-500 px-4 leading-relaxed">We create a tailored pathway designed to meet your specific objectives.</p>
                    </div>
                    {/* Step 3 */}
                    <div className="flex flex-col items-center bg-white z-10 w-56 group">
                        <div className="w-20 h-20 bg-orange-50 group-hover:bg-orange-100 rounded-full flex justify-center items-center text-2xl text-orange-500 border-4 border-white shadow-sm transition-colors mb-6 relative">
                            <span className="absolute -top-1 -right-1 w-6 h-6 bg-orange-400 rounded-full text-white text-[10px] font-bold flex justify-center items-center border-2 border-white">03</span>
                            <FaBrain />
                        </div>
                        <h4 className="font-bold text-[#0B1220] text-sm mb-2">Plan Implementation</h4>
                        <p className="text-xs text-gray-500 px-4 leading-relaxed">Execute the customized strategies with our support, ensuring alignment.</p>
                    </div>
                    {/* Step 4 */}
                    <div className="flex flex-col items-center bg-white z-10 w-56 group">
                        <div className="w-20 h-20 bg-orange-50 group-hover:bg-orange-100 rounded-full flex justify-center items-center text-2xl text-orange-500 border-4 border-white shadow-sm transition-colors mb-6 relative">
                            <span className="absolute -top-1 -right-1 w-6 h-6 bg-orange-400 rounded-full text-white text-[10px] font-bold flex justify-center items-center border-2 border-white">04</span>
                            <FaHandshake />
                        </div>
                        <h4 className="font-bold text-[#0B1220] text-sm mb-2">Ongoing Monitoring</h4>
                        <p className="text-xs text-gray-500 px-4 leading-relaxed">We regularly review and adjust your plan to adapt to any changes.</p>
                    </div>
                </div>
            </div>

            {/* 5. OPEN ROLES (Retaining Original Filtered Jobs) */}
            <div id="open-roles" className="bg-slate-50 py-24 border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 text-orange-400 font-bold tracking-wider uppercase text-xs mb-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-400" /> We're Hiring
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0B1220] mb-4">
                            Explore Open Roles
                        </h2>
                    </div>

                    {/* Search and Filters */}
                    <div className="max-w-4xl mx-auto mb-12">
                        <div className="relative mb-8">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <FaSearch className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="w-full px-4 py-4 pl-12 rounded-lg border border-gray-200 bg-white focus:border-orange-400 outline-none transition-all text-sm shadow-sm"
                                placeholder="Search roles by title, department, or skills..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Tabs */}
                        <div className="flex flex-wrap justify-center gap-2 mb-8">
                            <button onClick={() => setActiveTab('all')} className={`px-6 py-2.5 rounded-full font-bold transition-all text-xs uppercase tracking-wide border ${activeTab === 'all' ? 'bg-[#0B1220] text-white border-[#0B1220]' : 'text-gray-600 bg-white border-gray-200 hover:border-gray-300'}`}>All Roles</button>
                            <button onClick={() => setActiveTab('featured')} className={`px-6 py-2.5 rounded-full font-bold transition-all text-xs uppercase tracking-wide border flex items-center gap-2 ${activeTab === 'featured' ? 'bg-[#0B1220] text-white border-[#0B1220]' : 'text-gray-600 bg-white border-gray-200 hover:border-gray-300'}`}><FaStar className={activeTab === 'featured' ? "text-yellow-400" : "text-yellow-500"} /> Featured</button>
                            <button onClick={() => setActiveTab('marketing')} className={`px-6 py-2.5 rounded-full font-bold transition-all text-xs uppercase tracking-wide border ${activeTab === 'marketing' ? 'bg-[#0B1220] text-white border-[#0B1220]' : 'text-gray-600 bg-white border-gray-200 hover:border-gray-300'}`}>Marketing</button>
                            <button onClick={() => setActiveTab('technology')} className={`px-6 py-2.5 rounded-full font-bold transition-all text-xs uppercase tracking-wide border ${activeTab === 'technology' ? 'bg-[#0B1220] text-white border-[#0B1220]' : 'text-gray-600 bg-white border-gray-200 hover:border-gray-300'}`}>Technology</button>
                            <button onClick={() => setActiveTab('creative')} className={`px-6 py-2.5 rounded-full font-bold transition-all text-xs uppercase tracking-wide border ${activeTab === 'creative' ? 'bg-[#0B1220] text-white border-[#0B1220]' : 'text-gray-600 bg-white border-gray-200 hover:border-gray-300'}`}>Creative</button>
                        </div>
                    </div>

                    {/* Job Cards Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
                        {filteredJobs.map((job) => (
                            <div key={job.id} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 h-full overflow-hidden flex flex-col group p-6">
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-xl border border-gray-100 group-hover:border-orange-200 group-hover:bg-orange-50 transition-colors">
                                            {job.icon}
                                        </div>
                                        {job.featured && (
                                            <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-bold bg-yellow-100 text-yellow-700 uppercase tracking-widest">
                                                <FaStar className="mr-1" size={8} /> Featured
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-lg font-serif font-bold text-[#0B1220] mb-2 leading-snug">
                                        {job.title}
                                    </h3>
                                    <span className="inline-block px-2 py-1 rounded text-[10px] font-bold bg-gray-100 text-gray-500 mb-6 uppercase tracking-wider">
                                        {job.department}
                                    </span>
                                    
                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center text-xs text-gray-600 font-medium">
                                            <FaGlobe className="w-4 text-gray-400" /> <span className="ml-2">{job.location}</span>
                                        </div>
                                        <div className="flex items-center text-xs text-gray-600 font-medium">
                                            <FaBriefcase className="w-4 text-gray-400" /> <span className="ml-2">{job.type} • {job.experience}</span>
                                        </div>
                                        <div className="flex items-center text-xs font-bold text-[#0B1220]">
                                            <FaDollarSign className="w-4 text-green-600" /> <span className="ml-2">{job.salary}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-gray-100">
                                    <button
                                        onClick={() => handleApplyClick(job)}
                                        className="w-full bg-white border border-gray-200 hover:border-orange-400 hover:bg-orange-50 hover:text-orange-600 text-gray-800 font-bold py-2.5 px-4 rounded text-xs transition-colors duration-300 flex items-center justify-center gap-2"
                                    >
                                        Apply Now <FaArrowRight size={10}/>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredJobs.length === 0 && (
                        <div className="text-center py-16">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">No roles match your search</h3>
                            <button
                                onClick={() => { setSearchTerm(''); setActiveTab('all'); }}
                                className="mt-4 border border-gray-300 hover:border-orange-400 text-gray-700 hover:text-orange-500 bg-white py-2 px-6 rounded text-sm font-semibold transition-colors"
                            >
                                View All Roles
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* 6. BOTTOM CTA (Schedule Consultation / Quick Apply) */}
            <div className="container mx-auto px-4 py-24">
                <div className="bg-[#1A3636] rounded-[40px] overflow-hidden shadow-2xl flex flex-col md:flex-row relative">
                    {/* Decorative element */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>

                    <div className="md:w-5/12 relative">
                        <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="Team" className="w-full h-full object-cover min-h-[300px]" />
                    </div>
                    <div className="md:w-7/12 p-8 md:p-16 flex flex-col justify-center z-10">
                        <div className="inline-flex items-center gap-2 text-white/60 font-bold tracking-wider uppercase text-[10px] mb-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-400" /> Get In Touch
                        </div>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4 leading-tight">
                            Schedule Your Free <br/> Financial Consultation
                        </h2>
                        <p className="text-white/60 mb-8 text-sm max-w-md leading-relaxed">
                            Looking to supercharge your career or need career advice? Drop us a message. We're always looking for brilliant minds to join our teams.
                        </p>
                        
                        {/* Quick form UI mirroring the screenshot */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 max-w-xl">
                            <input 
                                type="text" 
                                name="name"
                                value={consultationData.name}
                                onChange={handleConsultationChange}
                                placeholder="Name" 
                                className="bg-[#2A4747] border-none text-white text-sm px-4 py-3 rounded focus:outline-none focus:ring-1 focus:ring-white/30 placeholder-white/40" 
                            />
                            <input 
                                type="email" 
                                name="email"
                                value={consultationData.email}
                                onChange={handleConsultationChange}
                                placeholder="Email" 
                                className="bg-[#2A4747] border-none text-white text-sm px-4 py-3 rounded focus:outline-none focus:ring-1 focus:ring-white/30 placeholder-white/40" 
                            />
                            <input 
                                type="tel" 
                                name="phone"
                                value={consultationData.phone}
                                onChange={handleConsultationChange}
                                placeholder="Phone" 
                                className="bg-[#2A4747] border-none text-white text-sm px-4 py-3 rounded focus:outline-none focus:ring-1 focus:ring-white/30 placeholder-white/40" 
                            />
                            <input 
                                type="text" 
                                name="subject"
                                value={consultationData.subject}
                                onChange={handleConsultationChange}
                                placeholder="Subject" 
                                className="bg-[#2A4747] border-none text-white text-sm px-4 py-3 rounded focus:outline-none focus:ring-1 focus:ring-white/30 placeholder-white/40" 
                            />
                        </div>
                        
                        <div className="flex">
                            <button 
                                onClick={handleConsultationSubmit}
                                disabled={isConsulting}
                                className="bg-gray-100 hover:bg-white text-[#1A3636] font-bold py-3.5 px-8 rounded flex items-center gap-2 text-sm transition-colors disabled:opacity-50"
                            >
                                {isConsulting ? 'Sending...' : 'Send Message'} <FaArrowRight size={12}/>
                            </button>
                        </div>

                        {/* Floating button icon like screenshot */}
                        <div className="absolute top-1/2 -right-8 -translate-y-1/2 w-20 h-20 bg-gray-200 rounded-2xl hidden lg:flex justify-center items-center shadow-lg transform -rotate-12">
                            <FaSearch className="text-3xl text-gray-400" />
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
