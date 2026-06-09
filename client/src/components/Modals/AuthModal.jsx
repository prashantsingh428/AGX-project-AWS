import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate, useLocation } from 'react-router-dom';
import { X, Mail, Lock, User, ArrowRight, Loader2, Github, CheckCircle, AlertCircle } from 'lucide-react';
import api from '../../api/api';
import { useAuth } from '../../context/AuthContext';


const AuthModal = ({ isOpen, onClose, initialView = 'login' }) => {
    const { login, googleLogin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Determine view mode based on prop or URL path
    const [view, setView] = useState(initialView);

    useEffect(() => {
        if (isOpen) {
            setView(initialView);
        }
    }, [isOpen, initialView]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Form states
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [registerData, setRegisterData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [otp, setOtp] = useState('');
    const [notification, setNotification] = useState(null);

    const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleLoginChange = (e) => setLoginData({ ...loginData, [e.target.name]: e.target.value });
    const handleRegisterChange = (e) => setRegisterData({ ...registerData, [e.target.name]: e.target.value });

    const handleClose = () => {
        if (onClose) {
            onClose();
        } else {
            navigate(-1);
        }
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const result = await login(loginData.email, loginData.password);
        if (result.success) {
            showNotification("Login Successful!", "success");
            setTimeout(() => {
                handleClose();
            }, 1000);
        } else {
            setError(result.message);
            showNotification(`Login Failed: ${result.message}`, "error");

            if (result.message === "Verify email first") {
                setView('verify');
            }
        }
        setLoading(false);
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (registerData.password !== registerData.confirmPassword) {
            const msg = 'Passwords do not match';
            setError(msg);
            showNotification(msg, 'error');
            setLoading(false);
            return;
        }

        try {
            await api.post('/auth/register', {
                name: registerData.name,
                email: registerData.email,
                password: registerData.password
            });

            showNotification("Registration Successful. Check email for OTP.", "success");
            // On success, switch to verify view
            setView('verify');
        } catch (err) {
            console.error("Registration Error:", err);
            const msg = err.response?.data?.message || err.message || 'Registration failed. Please try again.';
            setError(msg);
            showNotification(`Registration Failed: ${msg}`, "error");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifySubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Use email from registerData or loginData depending on flow, 
            // but for simplicity let's assume registerData has the email if we just registered.
            // If coming from login 403, we might need to rely on loginData.email.
            // Let's check which one has a value or use a simplified approach.
            const emailToVerify = registerData.email || loginData.email;

            if (!emailToVerify) {
                const msg = "Email missing. Please try logging in again.";
                setError(msg);
                showNotification(msg, "error");
                return;
            }

            await api.post('/auth/verify-email', {
                email: emailToVerify,
                otp
            });

            // Verification successful
            // Auto-login or ask to login?
            // Let's switch to login view and pre-fill email
            setView('login');
            setError(''); // Clear error
            // Maybe show a success message? 
            showNotification('Email verified! Please log in.', 'success');

        } catch (err) {
            const msg = err.response?.data?.message || 'Verification failed. Invalid OTP.';
            setError(msg);
            showNotification(`Verification Failed: ${msg}`, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            setLoading(true);
            const { credential } = credentialResponse;
            const res = await api.post('/auth/google', { token: credential });

            googleLogin(res.data.token, res.data.user || { role: res.data.role });

            showNotification("Google Login Successful!", "success");
            setTimeout(() => {
                handleClose();
                window.location.reload();
            }, 1000);
        } catch (err) {
            console.error('Google Login Error:', err);
            const msg = 'Google Login failed. Please try again.';
            setError(msg);
            showNotification(msg, "error");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 bg-gray-950/80 z-[100] flex items-center justify-center p-4 backdrop-blur-md transition-all duration-300 animate-in fade-in" onClick={handleClose}>

            {/* Notification Toast */}
            {notification && (
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-lg z-[150] animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className={`rounded-xl border bg-white shadow-[0_16px_36px_rgba(15,23,42,0.2)] p-3.5 ${
                        notification.type === 'success' ? 'border-emerald-200' : 'border-rose-200'
                    }`}>
                        <div className="flex items-start gap-3">
                            <div className={`mt-0.5 rounded-full p-1.5 ${
                                notification.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                            }`}>
                                {notification.type === 'success' ? <CheckCircle className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-700">
                                    {notification.type === 'success' ? 'Operation Successful' : 'Action Required'}
                                </p>
                                <p className="text-sm text-slate-900 leading-relaxed font-medium mt-0.5">
                                    {notification.message}
                                </p>
                            </div>
                            <button
                                onClick={() => setNotification(null)}
                                className="text-slate-400 hover:text-slate-700 p-1 rounded-md hover:bg-slate-100 transition-colors"
                                aria-label="Dismiss notification"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Wrapper for positioning Close Button relative to Card */}
            <div className="relative w-full max-w-4xl animate-in zoom-in-95 duration-300 pointer-events-auto" onClick={e => e.stopPropagation()}>

                {/* Close Button - Persistent */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-[110] p-2 text-slate-400 hover:text-slate-950 hover:bg-slate-100/90 rounded-full transition-all duration-300 backdrop-blur-sm cursor-pointer"
                    aria-label="Close modal"
                >
                    <X className="w-5 h-5 shadow-sm" />
                </button>

                {/* Scrollable Content Card */}
                <div className="bg-white rounded-[2rem] w-full shadow-2xl flex flex-col md:flex-row border border-white/10 max-h-[90vh] overflow-y-auto overflow-x-hidden">

                    {/* Left Side: Visuals */}
                    <div className="w-full md:w-1/2 bg-[#0f172a] p-10 text-white relative overflow-hidden flex flex-col justify-center gap-12 min-h-[400px]">
                        {/* Background Elements */}
                        <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-purple-600/20 rounded-full blur-3xl"></div>

                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-white/80 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                                Secure Access
                            </div>

                            <h2 className="text-3xl font-black mb-4 leading-tight">
                                {view === 'login' && 'Welcome Back.'}
                                {view === 'register' && 'Join the Revolution.'}
                                {view === 'verify' && 'Verify Email.'}
                            </h2>
                            <p className="text-slate-400 text-sm leading-relaxed font-medium">
                                {view === 'login' && 'Access your dashboard, manage your projects, and track your growth metrics.'}
                                {view === 'register' && 'Create your account to start your journey with AI-driven growth strategies.'}
                                {view === 'verify' && 'Enter the OTP sent to your email to verify your account.'}
                            </p>
                        </div>

                        <div className="relative z-10 space-y-4">
                            <div className="flex items-center gap-3 text-sm text-slate-300">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span>Real-time Analytics Dashboard</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-300">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span>AI-Powered Insights</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-300">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span>Premium Support Access</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="w-full md:w-1/2 p-8 md:p-12 relative flex flex-col justify-center bg-white">

                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-slate-900 mb-1">
                                {view === 'login' && 'Sign in'}
                                {view === 'register' && 'Create Account'}
                                {view === 'verify' && 'Verification'}
                            </h3>
                            <p className="text-slate-500 text-sm">
                                {view === 'login' && 'Enter your details to proceed'}
                                {view === 'register' && 'Get started for free'}
                                {view === 'verify' && 'Check your email for code'}
                            </p>
                        </div>



                        <form onSubmit={
                            view === 'login' ? handleLoginSubmit :
                                view === 'register' ? handleRegisterSubmit :
                                    handleVerifySubmit
                        } className="space-y-4">

                            {view === 'verify' && (
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase text-slate-500 ml-1">OTP Code</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input
                                            type="text"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-medium text-slate-900 transition-all"
                                            placeholder="123456"
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            {view === 'register' && (
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase text-slate-500 ml-1">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input
                                            type="text"
                                            name="name"
                                            value={registerData.name}
                                            onChange={handleRegisterChange}
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-medium text-slate-900 transition-all"
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            {view !== 'verify' && (
                                <>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold uppercase text-slate-500 ml-1">Email Address</label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <input
                                                type="email"
                                                name="email"
                                                value={view === 'login' ? loginData.email : registerData.email}
                                                onChange={view === 'login' ? handleLoginChange : handleRegisterChange}
                                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-medium text-slate-900 transition-all"
                                                placeholder="name@company.com"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <div className="flex justify-between ml-1">
                                            <label className="text-xs font-bold uppercase text-slate-500">Password</label>
                                            {view === 'login' && (
                                                <button
                                                    type="button"
                                                    onClick={() => showNotification("Please contact support at contact@aigrowthexa.com to reset your password.", "success")}
                                                    className="text-xs text-primary font-semibold hover:text-primary/80"
                                                >
                                                    Forgot?
                                                </button>
                                            )}
                                        </div>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <input
                                                type="password"
                                                name="password"
                                                value={view === 'login' ? loginData.password : registerData.password}
                                                onChange={view === 'login' ? handleLoginChange : handleRegisterChange}
                                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-medium text-slate-900 transition-all"
                                                placeholder="••••••••"
                                                required
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            {view === 'register' && (
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase text-slate-500 ml-1">Confirm Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={registerData.confirmPassword}
                                            onChange={handleRegisterChange}
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-medium text-slate-900 transition-all"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 flex items-center justify-center gap-2 mt-2"
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                                    <>
                                        {view === 'login' && 'Sign In'}
                                        {view === 'register' && 'Create Account'}
                                        {view === 'verify' && 'Verify'}
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>

                        {view !== 'verify' && (
                            <>
                                <div className="relative my-6">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-200"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                    </div>
                                </div>

                                {/* Google Login Button */}
                                <div className="mb-4 flex justify-center">
                                    <GoogleLogin
                                        onSuccess={handleGoogleSuccess}
                                        onError={() => {

                                            setError('Google Login Failed');
                                        }}
                                        useOneTap
                                        containerProps={{
                                            style: { width: '100%' }
                                        }}
                                    />
                                </div>
                            </>
                        )}

                        <div className="mt-6 pt-6 border-t border-slate-100">
                            <div className="text-center">
                                <p className="text-sm text-slate-500 font-medium">
                                    {view === 'login' && "Don't have an account?"}
                                    {view === 'register' && "Already have an account?"}
                                    {view === 'verify' && "Incorrect email?"}

                                    <button
                                        onClick={() => {
                                            if (view === 'verify') setView('register');
                                            else setView(view === 'login' ? 'register' : 'login');
                                        }}
                                        className="ml-2 text-primary font-bold hover:text-primary/80 hover:underline transition-colors"
                                    >
                                        {view === 'login' && 'Sign up free'}
                                        {view === 'register' && 'Sign in'}
                                        {view === 'verify' && 'Register again'}
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default AuthModal;
