import React, { useState, useEffect, useMemo, memo, useRef } from 'react';
import { useTheme as useAppTheme } from '../context/ThemeContext';
import api from "../api/api";
import {
    Box, Container, Typography, Grid, Card, CardContent, CardActions,
    Button, Chip, Accordion, AccordionSummary, AccordionDetails,
    List, ListItem, ListItemIcon, ListItemText, Stack,
    useTheme as useMuiTheme, useMediaQuery, alpha, Fade, Grow,
    createTheme, ThemeProvider, CssBaseline, Dialog, DialogTitle,
    DialogContent, DialogActions, IconButton, Divider, Paper,
    TextField, MenuItem, Select, InputLabel, FormControl,
    FormHelperText, Snackbar, Alert, Avatar, LinearProgress,
} from '@mui/material';
import {
    ExpandMore as ExpandMoreIcon, AutoAwesome as AutoAwesomeIcon,
    RocketLaunch as RocketLaunchIcon, TrendingUp as TrendingUpIcon,
    Campaign as CampaignIcon, Store as StoreIcon, Bolt as BoltIcon,
    Star as StarIcon, Smartphone as SmartphoneIcon, Email as EmailIcon,
    Groups as GroupsIcon, ShoppingCart as ShoppingCartIcon, Chat as ChatIcon,
    Handshake as HandshakeIcon, Person as PersonIcon, AppShortcut as AppShortcutIcon,
    Flag as FlagIcon, CheckCircle as CheckCircleIcon,
    KeyboardArrowRight as KeyboardArrowRightIcon, Brush as BrushIcon,
    Code as CodeIcon, Draw as DrawIcon, DesignServices as DesignServicesIcon,
    Close as CloseIcon, ChevronRight as ChevronRightIcon, Send as SendIcon,
    Phone as PhoneIcon, Business as BusinessIcon, Description as DescriptionIcon,
    Psychology as PsychologyIcon, Search as SearchIcon, Podcasts as PodcastsIcon,
    Public as PublicIcon, FilterFrames as FilterFramesIcon, Web as WebIcon,
    Create as CreateIcon, Mail as MailIcon, ShoppingBag as ShoppingBagIcon,
    WhatsApp as WhatsAppIcon, GroupWork as HandshakeOutlinedIcon,
    People as PeopleIcon, BrandingWatermark as BrandingWatermarkIcon,
    Speed as SpeedIcon, SmartToy as SmartToyIcon, Dashboard as DashboardIcon,
    ChevronLeft as ChevronLeftIcon,
    FormatQuote as FormatQuoteIcon, EmojiEvents as EmojiEventsIcon,
    AccessTime as AccessTimeIcon, BarChart as BarChartIcon,
    Verified as VerifiedIcon, ArrowForward as ArrowForwardIcon,
    HeadsetMic as SupportAgentIcon, Insights as AnalyticsIcon,
    Lightbulb as LightbulbIcon, WorkspacePremium as WorkspacePremiumIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { keyframes } from '@emotion/react';
import InView from '../components/InView';
const ChevronRightOutlined = ChevronRightIcon;

// ─── Animations ───────────────────────────────────────────────────────────────
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;
const marquee = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-33.33%); }
`;
const bgFade = keyframes`
  from { opacity: 0; transform: scale(1.06); }
  to   { opacity: 1; transform: scale(1); }
`;
const pulseRing = keyframes`
  0% { transform: scale(1); opacity: 0.4; }
  100% { transform: scale(1.6); opacity: 0; }
`;
const floatAnim = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
`;
const shimmerAnim = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

// ─── Service Images ───────────────────────────────────────────────────────────
const SERVICE_IMAGES = [
    { id: 1, title: "AI Marketing Solutions", label: "LLM Growth", url: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=700&q=80" },
    { id: 2, title: "Performance Marketing", label: "Paid Ads & ROI", url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80" },
    { id: 3, title: "SEO & Growth Strategy", label: "Organic Traffic", url: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=700&q=80" },
    { id: 4, title: "Podcast Marketing", label: "Audio Authority", url: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=700&q=80" },
    { id: 5, title: "GMB & Local SEO", label: "Local Growth", url: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=700&q=80" },
    { id: 6, title: "Funnel & Automation", label: "Convert at Scale", url: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=700&q=80" },
    { id: 7, title: "Branding & Creative", label: "Visual Identity", url: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=700&q=80" },
    { id: 8, title: "Web & App Development", label: "Digital Presence", url: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=700&q=80" },
    { id: 9, title: "Content Creation", label: "Words that Convert", url: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=700&q=80" },
    { id: 10, title: "Sales-Aligned Marketing", label: "Revenue Systems", url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=80" },
    { id: 11, title: "Social Media Marketing", label: "Community Growth", url: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=700&q=80" },
    { id: 12, title: "Email Marketing", label: "Inbox Revenue", url: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=700&q=80" },
    { id: 13, title: "E-commerce Marketing", label: "Online Store Growth", url: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=700&q=80" },
    { id: 14, title: "WhatsApp Marketing", label: "Direct Messaging", url: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=700&q=80" },
    { id: 15, title: "Brand Collaborations", label: "Strategic Partnerships", url: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=700&q=80" },
    { id: 16, title: "Influencer Marketing", label: "Trust & Reach", url: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=700&q=80" },
    { id: 17, title: "App Marketing", label: "Installs & Retention", url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=700&q=80" },
    { id: 18, title: "Go-To-Market Strategy", label: "Launch Planning", url: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=700&q=80" },
    { id: 19, title: "Site Optimization", label: "Speed & Conversions", url: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=700&q=80" },
    { id: 20, title: "Product Branding", label: "Market Positioning", url: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=700&q=80" },
];

// ─── Hero Slider ──────────────────────────────────────────────────────────────
const HeroSliderSection = memo(({ current, onGoTo, onPrev, onNext, total }) => {
    const img = SERVICE_IMAGES[current];
    return (
        <>
            <Box key={current} component="img" src={img.url} alt={img.title} sx={{
                position: 'absolute', inset: 0, width: '100%', height: '100%',
                objectFit: 'cover', objectPosition: 'center', display: 'block',
                animation: `${bgFade} 0.8s ease both`, zIndex: 0,
            }} />
            <Box sx={{
                position: 'absolute', inset: 0, zIndex: 1,
                background: 'linear-gradient(to bottom, rgba(10,10,30,0.62) 0%, rgba(10,10,30,0.45) 40%, rgba(10,10,30,0.75) 100%)',
            }} />
            <IconButton onClick={onPrev} sx={{
                position: 'absolute', left: { xs: 10, md: 24 }, top: '50%', transform: 'translateY(-50%)',
                zIndex: 10, background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.18)', color: '#fff', width: { xs: 40, md: 52 }, height: { xs: 40, md: 52 },
                '&:hover': { background: 'rgba(167,139,250,0.35)' }, transition: 'all 0.2s',
            }}><ChevronLeftIcon /></IconButton>
            <IconButton onClick={onNext} sx={{
                position: 'absolute', right: { xs: 10, md: 24 }, top: '50%', transform: 'translateY(-50%)',
                zIndex: 10, background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.18)', color: '#fff', width: { xs: 40, md: 52 }, height: { xs: 40, md: 52 },
                '&:hover': { background: 'rgba(167,139,250,0.35)' }, transition: 'all 0.2s',
            }}><ChevronRightOutlined /></IconButton>
            <Box sx={{
                position: 'absolute', bottom: { xs: 100, md: 110 }, left: '50%', transform: 'translateX(-50%)',
                display: 'flex', gap: 0.7, flexWrap: 'wrap', justifyContent: 'center', maxWidth: '70%', zIndex: 10,
            }}>
                {SERVICE_IMAGES.map((_, i) => (
                    <Box key={i} onClick={() => onGoTo(i)} sx={{
                        width: i === current ? 22 : 6, height: 6, borderRadius: '3px',
                        background: i === current ? '#a78bfa' : 'rgba(255,255,255,0.35)',
                        cursor: 'pointer', transition: 'all 0.3s ease', flexShrink: 0,
                    }} />
                ))}
            </Box>
            <Box sx={{
                position: 'absolute', top: 16, right: { xs: 16, md: 24 }, zIndex: 10,
                background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)',
                borderRadius: '20px', px: 1.5, py: 0.5, border: '1px solid rgba(255,255,255,0.2)',
            }}>
                <Typography sx={{ color: '#fff', fontSize: '0.75rem', fontWeight: 700 }}>{current + 1} / {total}</Typography>
            </Box>
            <Box sx={{
                position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10, textAlign: 'center',
                pt: { xs: 4, md: 5 }, pb: { xs: 2, md: 3 }, px: 2,
                background: 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, transparent 100%)',
                pointerEvents: 'none',
            }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                    <Box key={`pill-${current}`} sx={{
                        background: 'rgba(167,139,250,0.88)', backdropFilter: 'blur(8px)',
                        borderRadius: '20px', px: 2, py: 0.4,
                        animation: `${bgFade} 0.45s ease both`, display: 'inline-block',
                    }}>
                        <Typography sx={{ color: '#1e1b4b', fontSize: '0.68rem', fontWeight: 800, letterSpacing: 2.5, textTransform: 'uppercase' }}>
                            {img.label}
                        </Typography>
                    </Box>
                </Box>
                <Typography key={`name-${current}`} sx={{
                    color: '#fff', fontWeight: 900,
                    fontSize: { xs: '1.2rem', md: '1.8rem', lg: '2.2rem' },
                    lineHeight: 1.15, letterSpacing: '-0.02em',
                    textShadow: '0 4px 28px rgba(0,0,0,0.65)', animation: `${bgFade} 0.55s ease both`,
                }}>{img.title}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.6, mt: 2, flexWrap: 'wrap', pointerEvents: 'all' }}>
                    {SERVICE_IMAGES.map((_, i) => (
                        <Box key={i} onClick={(e) => { e.stopPropagation(); onGoTo(i); }} sx={{
                            width: i === current ? 24 : 6, height: 6, borderRadius: '3px',
                            background: i === current ? '#a78bfa' : 'rgba(255,255,255,0.3)',
                            cursor: 'pointer', transition: 'all 0.3s ease', flexShrink: 0,
                        }} />
                    ))}
                </Box>
            </Box>
        </>
    );
});

// ─── Contact Form Modal ────────────────────────────────────────────────────────
const ContactFormModal = memo(({ open, onClose, serviceName, theme }) => {
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', company: '',
        service: serviceName || 'AI Marketing Solutions', budget: '', message: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!formData.company.trim()) newErrors.company = 'Company name is required';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
        setLoading(true);
        try {
            await api.post('/services/submit', {
                serviceName: serviceName || 'AI Marketing Solutions',
                fullName: formData.name, email: formData.email, phone: formData.phone,
                companyName: formData.company, budget: formData.budget, goals: formData.message
            });
            alert("Service inquiry submitted successfully 🎉");
            setFormData({ name: '', email: '', phone: '', company: '', budget: '', message: '' });
        } catch (error) {
            console.error(error);
            alert("Failed to submit form. Please try again.");
        } finally { setLoading(false); }
    };

    const budgetOptions = [
        { value: 'under-5k', label: 'Under $5,000' }, { value: '5k-10k', label: '$5,000 - $10,000' },
        { value: '10k-25k', label: '$10,000 - $25,000' }, { value: '25k-50k', label: '$25,000 - $50,000' },
        { value: '50k-plus', label: '$50,000+' }, { value: 'not-sure', label: 'Not Sure Yet' }
    ];

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth
                PaperProps={{ sx: { borderRadius: 3, maxHeight: '90vh' } }}>
                <DialogTitle sx={{
                    m: 0, p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    background: theme.palette.primary.main, color: 'white'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <RocketLaunchIcon />
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 800 }}>Start Your Growth Journey</Typography>
                            <Typography variant="body2" sx={{ opacity: 0.9 }}>Get Started with {serviceName}</Typography>
                        </Box>
                    </Box>
                    <IconButton aria-label="close" onClick={onClose} sx={{ color: 'white' }}><CloseIcon /></IconButton>
                </DialogTitle>
                <DialogContent sx={{ p: 0 }}>
                    <Grid container>
                        <Grid item xs={12} md={6} sx={{
                            display: { xs: 'none', md: 'block' }, p: 4,
                            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
                            borderRight: `1px solid ${alpha(theme.palette.divider, 0.1)}`
                        }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: theme.palette.primary.main }}>
                                Why Choose Our {serviceName}?
                            </Typography>
                            <List>
                                {["Predict customer behavior with AI analytics", "Intelligent targeting & messaging",
                                    "Marketing automation that thinks", "Funnel optimization with AI",
                                    "Data-driven decisions - no assumptions", "Higher conversion rates"
                                ].map((item, index) => (
                                    <ListItem key={index} sx={{ px: 0, py: 1 }}>
                                        <ListItemIcon sx={{ minWidth: 36 }}>
                                            <CheckCircleIcon sx={{ color: theme.palette.primary.main, fontSize: 20 }} />
                                        </ListItemIcon>
                                        <ListItemText primary={item} primaryTypographyProps={{ fontSize: '0.9rem' }} />
                                    </ListItem>
                                ))}
                            </List>
                            <Box sx={{ mt: 4, p: 3, background: alpha(theme.palette.primary.main, 0.08), borderRadius: 2 }}>
                                <Typography variant="body2" sx={{ fontStyle: 'italic', color: theme.palette.text.secondary }}>
                                    "Most clients see measurable improvements within 30-60 days."
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ p: 4 }}>
                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>Tell us about your project</Typography>
                                <form onSubmit={handleSubmit}>
                                    <Stack spacing={3}>
                                        <TextField fullWidth label="Full Name" name="name" value={formData.name} onChange={handleChange}
                                            error={!!errors.name} helperText={errors.name} required
                                            InputProps={{ startAdornment: <PersonIcon sx={{ mr: 1, color: theme.palette.text.secondary }} /> }} />
                                        <TextField fullWidth label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange}
                                            error={!!errors.email} helperText={errors.email} required
                                            InputProps={{ startAdornment: <EmailIcon sx={{ mr: 1, color: theme.palette.text.secondary }} /> }} />
                                        <TextField fullWidth label="Phone Number" name="phone" value={formData.phone} onChange={handleChange}
                                            error={!!errors.phone} helperText={errors.phone} required
                                            InputProps={{ startAdornment: <PhoneIcon sx={{ mr: 1, color: theme.palette.text.secondary }} /> }} />
                                        <TextField fullWidth label="Company Name" name="company" value={formData.company} onChange={handleChange}
                                            error={!!errors.company} helperText={errors.company} required
                                            InputProps={{ startAdornment: <BusinessIcon sx={{ mr: 1, color: theme.palette.text.secondary }} /> }} />
                                        <FormControl fullWidth>
                                            <InputLabel>Monthly Marketing Budget</InputLabel>
                                            <Select name="budget" value={formData.budget} onChange={handleChange} label="Monthly Marketing Budget">
                                                {budgetOptions.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                                ))}
                                            </Select>
                                            <FormHelperText>Helps us tailor our recommendations</FormHelperText>
                                        </FormControl>
                                        <TextField fullWidth label="Tell us about your goals" name="message" value={formData.message}
                                            onChange={handleChange} multiline rows={4}
                                            InputProps={{ startAdornment: <DescriptionIcon sx={{ mr: 1, color: theme.palette.text.secondary, mt: 1, alignSelf: 'flex-start' }} /> }}
                                            placeholder="What are your main marketing challenges?" />
                                        <Button type="submit" variant="contained" size="large" fullWidth startIcon={loading ? null : <SendIcon />}
                                            disabled={loading}
                                            sx={{ mt: 2, py: 1.5, background: theme.palette.primary.main, '&:hover': { background: theme.palette.primary.dark } }}>
                                            {loading ? 'Sending...' : 'Submit Application'}
                                        </Button>
                                        <Typography variant="caption" color="text.secondary" align="center">
                                            By submitting, you agree to our Privacy Policy. We'll contact you within 24 hours.
                                        </Typography>
                                    </Stack>
                                </form>
                            </Box>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
            <Snackbar open={success} autoHideDuration={3000} onClose={() => setSuccess(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert severity="success" variant="filled" onClose={() => setSuccess(false)}>
                    Thank you! We've received your application. Our team will contact you within 24 hours.
                </Alert>
            </Snackbar>
        </>
    );
});

// ─── Service Modal ─────────────────────────────────────────────────────────────
const ServiceModal = memo(({ service, open, onClose, theme, onStartService }) => {
    if (!service) return null;
    const getFullContent = () => {
        switch (service.id) {
            case 1:
                return (
                    <Box>
                        <Typography variant="h4" gutterBottom sx={{ fontWeight: 800, color: theme.palette.primary.main }}>
                            AI Marketing Solutions (LLM-Powered Growth)
                        </Typography>
                        <Divider sx={{ my: 3 }} />
                        <Box sx={{ my: 4, p: 3, bgcolor: alpha(theme.palette.primary.main, 0.05), borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                                Traditional marketing relies on guesswork.{' '}
                                <Typography component="span" sx={{ color: theme.palette.primary.main, fontWeight: 700 }}>We rely on intelligence.</Typography>
                            </Typography>
                            <Typography variant="body1" paragraph>
                                At AI Growth Era, we built an LLM-powered marketing framework that helps brands grow faster, smarter, and more predictably.
                            </Typography>
                        </Box>
                        <Grid container spacing={3}>
                            {[
                                { icon: <AutoAwesomeIcon />, title: "1. Predict Customer Behavior", desc: "We use AI-driven analytics to understand how users think, browse, and buy." },
                                { icon: <CampaignIcon />, title: "2. Intelligent Targeting & Messaging", desc: "LLM-powered systems personalize messaging across email, ads, landing pages, and chat." },
                                { icon: <BoltIcon />, title: "3. Marketing Automation That Thinks", desc: "Automate decision-making using AI logic — campaigns adapt automatically based on performance." },
                                { icon: <TrendingUpIcon />, title: "4. Funnel Optimization With AI", desc: "From awareness to conversion, optimize each stage of your funnel for maximum ROI." },
                            ].map((item, idx) => (
                                <Grid item xs={12} md={6} key={idx}>
                                    <Paper elevation={0} sx={{ p: 3, height: '100%', border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`, borderRadius: 2 }}>
                                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Box sx={{ color: theme.palette.primary.main }}>{item.icon}</Box> {item.title}
                                        </Typography>
                                        <Typography variant="body2">{item.desc}</Typography>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                        <Box sx={{ mt: 6 }}>
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>Frequently Asked Questions</Typography>
                            {[
                                { q: "What are AI marketing solutions?", a: "AI marketing uses ML to analyze data, predict behavior, automate campaigns, and improve performance." },
                                { q: "How do LLMs improve marketing?", a: "LLMs enhance personalization, automate content, and optimize communication across channels." },
                                { q: "Is AI marketing suitable for small businesses?", a: "Yes, it helps small businesses reduce costs and compete with data-driven strategies." },
                                { q: "How long does it take to see results?", a: "Most clients see improvements within 30-60 days depending on data availability." },
                            ].map((faq, idx) => (
                                <Box key={idx} sx={{ mb: 3 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.primary.main, mb: 1 }}>{idx + 1}. {faq.q}</Typography>
                                    <Typography variant="body1">{faq.a}</Typography>
                                    <Divider sx={{ mt: 2 }} />
                                </Box>
                            ))}
                        </Box>
                    </Box>
                );
            default:
                return (
                    <Box>
                        <Chip label={`Service ${service.id}`} size="small" sx={{ mb: 2, background: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main, fontWeight: 700 }} />
                        <Typography variant="h4" gutterBottom sx={{ fontWeight: 800 }}>{service.title}</Typography>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, color: theme.palette.primary.main }}>{service.tagline}</Typography>
                        <Divider sx={{ my: 3 }} />
                        <Box sx={{ my: 4, p: 3, bgcolor: alpha(theme.palette.primary.main, 0.05), borderRadius: 2 }}>
                            <Typography variant="body1" paragraph>{service.shortDesc}</Typography>
                        </Box>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mt: 4 }}>What We Offer</Typography>
                        <List>
                            {service.features.map((feature, idx) => (
                                <ListItem key={idx} sx={{ px: 0 }}>
                                    <ListItemIcon sx={{ minWidth: 40 }}><ChevronRightIcon sx={{ color: theme.palette.primary.main }} /></ListItemIcon>
                                    <ListItemText primary={feature} />
                                </ListItem>
                            ))}
                        </List>
                        <Box sx={{ mt: 4, p: 3, border: `2px dashed ${alpha(theme.palette.success.main, 0.2)}`, borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: theme.palette.success.main }}>Benefits You Get</Typography>
                            <Grid container spacing={2}>
                                {service.benefits.map((benefit, idx) => (
                                    <Grid item xs={12} sm={6} key={idx}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <CheckCircleIcon sx={{ fontSize: 16, color: theme.palette.success.main }} />
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>{benefit}</Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Box>
                );
        }
    };
    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth scroll="paper"
            PaperProps={{ sx: { borderRadius: 3, maxHeight: '90vh' } }}>
            <DialogTitle sx={{
                m: 0, p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.palette.primary.main }}>
                        {React.cloneElement(service.icon, { sx: { fontSize: 20 } })}
                    </Box>
                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 800 }}>{service.title}</Typography>
                        <Typography variant="body2" color="text.secondary">{service.category}</Typography>
                    </Box>
                </Box>
                <IconButton aria-label="close" onClick={onClose} sx={{ color: theme.palette.text.secondary }}><CloseIcon /></IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ p: 4 }}>{getFullContent()}</DialogContent>
            <DialogActions sx={{ p: 3, borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`, justifyContent: 'space-between' }}>
                <Button onClick={onClose} sx={{ color: 'text.secondary' }}>Close</Button>
                <Button variant="contained" startIcon={<RocketLaunchIcon />}
                    onClick={() => { onClose(); onStartService(service.title); }}
                    sx={{ bgcolor: theme.palette.primary.main, '&:hover': { bgcolor: theme.palette.primary.dark } }}>
                    Start with {service.title}
                </Button>
            </DialogActions>
        </Dialog>
    );
});

// ─── Service Card ──────────────────────────────────────────────────────────────
const ServiceCard = memo(({ service, index, theme, onExploreDetails }) => (
    <InView threshold={0.1} triggerOnce={true} placeholderHeight="300px">
        <Grow in={true} timeout={500}>
            <Card sx={{
                height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 4,
                border: '1px solid', borderColor: alpha(theme.palette.divider, 0.1),
                background: alpha(theme.palette.background.paper, 0.4), backdropFilter: 'blur(20px)',
                transition: 'all 0.4s ease', position: 'relative', overflow: 'visible',
                '&:hover': {
                    transform: 'translateY(-8px)', borderColor: theme.palette.primary.main,
                    boxShadow: `0 12px 30px -10px ${alpha(theme.palette.primary.main, 0.15)}`,
                    '& .icon-box': { transform: 'scale(1.1) rotate(5deg)', background: theme.palette.primary.main, color: 'white', boxShadow: `0 8px 20px -6px ${alpha(theme.palette.primary.main, 0.4)}` }
                }
            }}>
                <CardContent sx={{ flexGrow: 1, p: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                        <Box className="icon-box" sx={{
                            width: 64, height: 64, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: alpha(theme.palette.primary.main, 0.08), color: theme.palette.primary.main,
                            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        }}>
                            {React.cloneElement(service.icon, { sx: { fontSize: 32 } })}
                        </Box>
                        <Chip label={service.category || "Premium"} size="small" sx={{
                            height: 24, background: alpha(theme.palette.primary.main, 0.05), color: theme.palette.primary.main,
                            fontWeight: 700, fontSize: '0.7rem', borderRadius: 1
                        }} />
                    </Box>
                    <Typography variant="h5" sx={{
                        fontWeight: 800, mb: 2, fontSize: '1.4rem',
                        background: theme.palette.mode === 'dark' ? 'linear-gradient(to right, #fff, #ccc)' : 'linear-gradient(to right, #1a1a1a, #4a4a4a)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                    }}>{service.title}</Typography>
                    <Typography variant="body2" sx={{
                        mb: 3, color: 'text.secondary', lineHeight: 1.7, minHeight: '4.8em',
                        display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                    }}>{service.shortDesc}</Typography>
                    <Box sx={{ pt: 3, borderTop: '1px dashed', borderColor: alpha(theme.palette.divider, 0.1) }}>
                        {service.features.slice(0, 3).map((feature, idx) => (
                            <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                                <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: theme.palette.primary.main, mr: 2, opacity: 0.7 }} />
                                <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 600, fontSize: '0.85rem' }}>{feature}</Typography>
                            </Box>
                        ))}
                    </Box>
                </CardContent>
                <CardActions sx={{ p: 4, pt: 0, mt: 'auto' }}>
                    <Button endIcon={<KeyboardArrowRightIcon />} onClick={() => onExploreDetails(service)}
                        sx={{ color: 'text.primary', fontWeight: 700, p: 0, '&:hover': { background: 'transparent', gap: 2, color: theme.palette.primary.main }, gap: 1, transition: 'all 0.3s ease' }}>
                        Explore Details
                    </Button>
                </CardActions>
            </Card>
        </Grow>
    </InView>
));

// ─── Service Detail Accordion ──────────────────────────────────────────────────
const ServiceDetail = memo(({ service, expanded, onChange, theme, onStartService }) => (
    <InView threshold={0.1} triggerOnce={true} placeholderHeight="80px">
        <Accordion id={`service-${service.id}`} expanded={expanded} onChange={onChange}
            TransitionProps={{ unmountOnExit: true }}
            sx={{
                mb: 3, borderRadius: '24px !important', overflow: 'hidden',
                background: theme.palette.background.paper,
                boxShadow: expanded ? `0 20px 40px -4px ${alpha(theme.palette.common.black, 0.1)}` : 'none',
                border: '1px solid', borderColor: expanded ? theme.palette.primary.main : alpha(theme.palette.divider, 0.1),
                '&:before': { display: 'none' }, transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
            <AccordionSummary
                expandIcon={<Box sx={{
                    width: 40, height: 40, borderRadius: '50%', border: '1px solid', borderColor: alpha(theme.palette.divider, 0.1),
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: expanded ? 'white' : 'text.secondary', background: expanded ? theme.palette.primary.main : 'transparent', transition: 'all 0.3s ease'
                }}><ExpandMoreIcon /></Box>}
                sx={{ px: 4, py: 2, '& .MuiAccordionSummary-content': { alignItems: 'center' }, '&:hover': { background: alpha(theme.palette.background.default, 0.5) } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 3 }}>
                    <Box sx={{ width: 50, height: 50, borderRadius: '14px', background: alpha(theme.palette.primary.main, 0.08), color: theme.palette.primary.main, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {React.cloneElement(service.icon, { sx: { fontSize: 24 } })}
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.2rem' }}>{service.title}</Typography>
                        {!expanded && (
                            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5, display: { xs: 'none', sm: 'block' }, opacity: 0.8 }}>{service.tagline}</Typography>
                        )}
                    </Box>
                </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
                <Box sx={{ p: 6, background: alpha(theme.palette.background.default, 0.3), borderTop: '1px solid', borderColor: alpha(theme.palette.divider, 0.05) }}>
                    <Grid container spacing={8}>
                        <Grid item xs={12} md={5}>
                            <Typography variant="overline" sx={{ color: theme.palette.primary.main, fontWeight: 800, letterSpacing: 2, display: 'block', mb: 2 }}>OVERVIEW</Typography>
                            <Typography variant="h4" sx={{ mb: 3, fontWeight: 800, lineHeight: 1.2 }}>{service.tagline}</Typography>
                            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 5, fontSize: '1.1rem' }}>{service.shortDesc}</Typography>
                            <Button variant="contained" size="large" endIcon={<RocketLaunchIcon />} onClick={() => onStartService(service.title)}
                                sx={{ borderRadius: '50px', background: theme.palette.primary.main, fontWeight: 700, px: 5, py: 1.8, color: 'white', boxShadow: `0 8px 20px -4px ${alpha(theme.palette.primary.main, 0.4)}`, '&:hover': { background: theme.palette.primary.dark, transform: 'translateY(-2px)' } }}>
                                Start with {service.title}
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={7}>
                            <Grid container spacing={6}>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                        <Box sx={{ p: 0.8, borderRadius: 1, background: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main }}><AutoAwesomeIcon sx={{ fontSize: 18 }} /></Box>
                                        Key Features
                                    </Typography>
                                    <Stack spacing={2}>
                                        {service.features.map((feature, idx) => (
                                            <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                                <CheckCircleIcon sx={{ fontSize: 20, color: theme.palette.primary.main, mr: 1.5, opacity: 0.8 }} />
                                                <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>{feature}</Typography>
                                            </Box>
                                        ))}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                        <Box sx={{ p: 0.8, borderRadius: 1, background: alpha(theme.palette.warning.main, 0.1), color: theme.palette.warning.main }}><TrendingUpIcon sx={{ fontSize: 18 }} /></Box>
                                        Benefits
                                    </Typography>
                                    {service.benefits && (
                                        <Stack spacing={2}>
                                            {service.benefits.slice(0, 5).map((benefit, idx) => (
                                                <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                                    <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: theme.palette.warning.main, mt: 1, mr: 2, flexShrink: 0 }} />
                                                    <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>{benefit}</Typography>
                                                </Box>
                                            ))}
                                        </Stack>
                                    )}
                                </Grid>
                            </Grid>
                            {service.platforms && (
                                <Box sx={{ mt: 2, p: 3, borderRadius: 3, background: alpha(theme.palette.background.paper, 0.5), border: '1px solid', borderColor: alpha(theme.palette.divider, 0.1) }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: 'text.secondary', letterSpacing: 1 }}>TECHNOLOGIES</Typography>
                                    <Stack direction="row" flexWrap="wrap" gap={1}>
                                        {service.platforms.map((platform, idx) => (
                                            <Chip key={idx} label={platform} size="small" variant="outlined" sx={{ borderColor: alpha(theme.palette.divider, 0.2), fontWeight: 600, background: 'transparent' }} />
                                        ))}
                                    </Stack>
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                    {service.faqs && (
                        <Box sx={{ mt: 8, pt: 6, borderTop: '1px solid', borderColor: alpha(theme.palette.divider, 0.1) }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 4, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Box sx={{ p: 0.8, borderRadius: 1, background: alpha(theme.palette.secondary.main, 0.1), color: theme.palette.secondary.main }}><ChatIcon sx={{ fontSize: 18 }} /></Box>
                                Frequently Asked Questions
                            </Typography>
                            <Grid container spacing={4}>
                                {service.faqs.map((faq, idx) => (
                                    <Grid item xs={12} md={4} key={idx}>
                                        <Box sx={{ p: 3, height: '100%', borderRadius: 2, background: alpha(theme.palette.background.paper, 0.5), border: '1px solid', borderColor: alpha(theme.palette.divider, 0.1) }}>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5, lineHeight: 1.4 }}>{faq.q}</Typography>
                                            <Typography variant="body2" color="text.secondary">{faq.a}</Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    )}
                </Box>
            </AccordionDetails>
        </Accordion>
    </InView>
));

// ══════════════════════════════════════════════════════════════════
// ─── StatsSection (hidden) ────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════
const StatsSection = memo(({ theme }) => { return null; });

// ══════════════════════════════════════════════════════════════════
// ─── WhyChooseUsSection (hidden) ──────────────────────────────────
// ══════════════════════════════════════════════════════════════════
const WhyChooseUsSection = memo(({ theme, onStartService }) => { return null; });

// ══════════════════════════════════════════════════════════════════
// ─── HowItWorksSection (hidden) ───────────────────────────────────
// ══════════════════════════════════════════════════════════════════
const HowItWorksSection = memo(({ theme }) => { return null; });

// ══════════════════════════════════════════════════════════════════
// ─── TestimonialsSection (hidden) ─────────────────────────────────
// ══════════════════════════════════════════════════════════════════
const TestimonialsSection = memo(({ theme }) => {
    const [active, setActive] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setActive(a => (a + 1) % 5), 5500);
        return () => clearInterval(t);
    }, []);
    return null;
});

// ══════════════════════════════════════════════════════════════════
// ─── FeaturedServicesSpotlight (hidden) ───────────────────────────
// ══════════════════════════════════════════════════════════════════
const FeaturedServicesSpotlight = memo(({ theme, onStartService }) => { return null; });

// ══════════════════════════════════════════════════════════════════
// ─── HowWeWorkSection (hidden) ────────────────────────────────────
// ══════════════════════════════════════════════════════════════════
const marquee2 = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;
const HowWeWorkSection = memo(({ theme }) => { return null; });

// ══════════════════════════════════════════════════════════════════
// ─── FIX 1: Industries Section — Grid fixed, boxes properly sized ─
// ══════════════════════════════════════════════════════════════════
const IndustriesSection = memo(({ theme }) => {
    const industries = [
        { name: 'E-commerce & D2C', icon: '🛒', desc: 'Shopify, WooCommerce, Amazon — scale your store with AI marketing.' },
        { name: 'SaaS & Tech', icon: '💻', desc: 'Product-led growth, trial conversions, and B2B pipeline building.' },
        { name: 'Real Estate', icon: '🏠', desc: 'Lead generation, GMB dominance, and funnel automation for properties.' },
        { name: 'Healthcare & Clinics', icon: '🏥', desc: 'Patient acquisition, local SEO, and reputation management.' },
        { name: 'Education & EdTech', icon: '🎓', desc: 'Student acquisition funnels, content marketing, and app growth.' },
        { name: 'Restaurants & F&B', icon: '🍽️', desc: 'Local SEO, Google Maps, influencer tie-ups, and WhatsApp campaigns.' },
        { name: 'Finance & FinTech', icon: '💰', desc: 'Trust-first content, performance marketing, and compliance-aware funnels.' },
        { name: 'Fashion & Lifestyle', icon: '👗', desc: 'Influencer marketing, Instagram growth, and e-commerce optimization.' },
        { name: 'Startups', icon: '🚀', desc: 'Go-to-market strategy, rapid testing, and lean growth systems.' },
        { name: 'Professional Services', icon: '🤝', desc: 'LinkedIn B2B, authority content, and reputation marketing.' },
    ];

    return (
        <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: alpha(theme.palette.background.default, 0.5), overflow: 'hidden' }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: 8 }}>
                    <Chip label="INDUSTRIES WE SERVE" size="small" sx={{
                        mb: 3, fontWeight: 800, letterSpacing: 2,
                        background: alpha('#43e97b', 0.1), color: '#43e97b',
                        border: `1px solid ${alpha('#43e97b', 0.3)}`, borderRadius: 1,
                    }} />
                    <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, letterSpacing: '-0.02em' }}>
                        We've Driven Growth Across{' '}
                        <Box component="span" sx={{
                            background: 'linear-gradient(135deg, #43e97b, #4facfe)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                        }}>Every Industry</Box>
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400, maxWidth: 520, mx: 'auto' }}>
                        AI Growth Era's frameworks are battle-tested across 10+ industries and counting.
                    </Typography>
                </Box>

                {/* ✅ FIX: xs={6} sm={4} md={3} — no lg prop, proper centering */}
                <Grid container spacing={2} justifyContent="center">
                    {industries.map((ind, i) => (
                        <Grid item xs={6} sm={4} md={3} key={i}>
                            <InView threshold={0.1} triggerOnce placeholderHeight="160px">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: i * 0.06 }}
                                    viewport={{ once: true }}
                                >
                                    <Box sx={{
                                        p: 2.5,
                                        borderRadius: 3,
                                        border: '1px solid', borderColor: alpha(theme.palette.divider, 0.1),
                                        background: theme.palette.background.paper,
                                        transition: 'all 0.35s ease',
                                        cursor: 'default',
                                        height: '100%',
                                        '&:hover': {
                                            transform: 'translateY(-6px)',
                                            borderColor: alpha('#43e97b', 0.4),
                                            boxShadow: `0 16px 40px -8px ${alpha('#43e97b', 0.15)}`,
                                            '& .ind-emoji': { transform: 'scale(1.3) rotate(5deg)' },
                                        },
                                    }}>
                                        <Typography className="ind-emoji" sx={{
                                            fontSize: '2rem', mb: 1.2, display: 'block', lineHeight: 1,
                                            transition: 'transform 0.3s ease',
                                        }}>{ind.icon}</Typography>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 0.6, lineHeight: 1.3, fontSize: '0.88rem' }}>
                                            {ind.name}
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: 'text.secondary', lineHeight: 1.5, display: 'block', fontSize: '0.75rem' }}>
                                            {ind.desc}
                                        </Typography>
                                    </Box>
                                </motion.div>
                            </InView>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
});

// ══════════════════════════════════════════════════════════════════
// ─── Tools & Technologies Marquee ─────────────────────────────────
// ══════════════════════════════════════════════════════════════════
const toolsMarquee = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;
const toolsMarqueeReverse = keyframes`
  from { transform: translateX(-50%); }
  to { transform: translateX(0); }
`;

const ToolsSection = memo(({ theme }) => {
    const row1 = [
        { name: 'Google Ads', emoji: '🔍' }, { name: 'Meta Ads', emoji: '📘' },
        { name: 'HubSpot', emoji: '🧡' }, { name: 'Klaviyo', emoji: '📧' },
        { name: 'Shopify', emoji: '🛍️' }, { name: 'Figma', emoji: '🎨' },
        { name: 'React', emoji: '⚛️' }, { name: 'Next.js', emoji: '▲' },
        { name: 'Google Analytics', emoji: '📊' }, { name: 'Semrush', emoji: '🔎' },
        { name: 'WhatsApp API', emoji: '💬' }, { name: 'Mailchimp', emoji: '🐒' },
    ];
    const row2 = [
        { name: 'TikTok Ads', emoji: '🎵' }, { name: 'LinkedIn Ads', emoji: '💼' },
        { name: 'YouTube Ads', emoji: '▶️' }, { name: 'WooCommerce', emoji: '🛒' },
        { name: 'ActiveCampaign', emoji: '⚡' }, { name: 'Ahrefs', emoji: '🔗' },
        { name: 'Zapier', emoji: '🔄' }, { name: 'Notion', emoji: '📝' },
        { name: 'Canva', emoji: '✏️' }, { name: 'OpenAI', emoji: '🤖' },
        { name: 'Hotjar', emoji: '🔥' }, { name: 'Stripe', emoji: '💳' },
    ];

    const ToolChip = ({ tool }) => (
        <Box sx={{
            display: 'inline-flex', alignItems: 'center', gap: 1.5,
            px: 3, py: 1.5, mx: 1.5, borderRadius: '50px', flexShrink: 0,
            border: '1px solid', borderColor: alpha(theme.palette.divider, 0.15),
            background: theme.palette.background.paper,
            transition: 'all 0.3s ease',
            '&:hover': {
                borderColor: theme.palette.primary.main,
                transform: 'translateY(-3px)',
                boxShadow: `0 8px 20px -4px ${alpha(theme.palette.primary.main, 0.15)}`,
            },
        }}>
            <Typography sx={{ fontSize: '1.15rem', lineHeight: 1 }}>{tool.emoji}</Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, whiteSpace: 'nowrap', color: 'text.primary' }}>
                {tool.name}
            </Typography>
        </Box>
    );

    return (
        <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper', overflow: 'hidden' }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: 8 }}>
                    <Chip label="TOOLS & PLATFORMS" size="small" sx={{
                        mb: 3, fontWeight: 800, letterSpacing: 2,
                        background: alpha('#f093fb', 0.1), color: '#f093fb',
                        border: `1px solid ${alpha('#f093fb', 0.3)}`, borderRadius: 1,
                    }} />
                    <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, letterSpacing: '-0.02em' }}>
                        We Work With the{' '}
                        <Box component="span" sx={{
                            background: 'linear-gradient(135deg, #f093fb, #667eea)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                        }}>Best Tools in the Industry</Box>
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400, maxWidth: 500, mx: 'auto' }}>
                        24+ platforms, tools, and technologies — all orchestrated by our AI systems.
                    </Typography>
                </Box>
            </Container>

            {/* Row 1 */}
            <Box sx={{
                position: 'relative', overflow: 'hidden', mb: 3,
                '&::before, &::after': {
                    content: '""', position: 'absolute', top: 0, width: '120px', height: '100%', zIndex: 2, pointerEvents: 'none',
                },
                '&::before': { left: 0, background: `linear-gradient(to right, ${theme.palette.background.paper}, transparent)` },
                '&::after': { right: 0, background: `linear-gradient(to left, ${theme.palette.background.paper}, transparent)` },
            }}>
                <Box sx={{
                    display: 'flex', width: 'max-content', py: 1,
                    animation: `${toolsMarquee} 28s linear infinite`,
                    '&:hover': { animationPlayState: 'paused' },
                }}>
                    {[...row1, ...row1].map((tool, i) => <ToolChip key={i} tool={tool} />)}
                </Box>
            </Box>

            {/* Row 2 */}
            <Box sx={{
                position: 'relative', overflow: 'hidden',
                '&::before, &::after': {
                    content: '""', position: 'absolute', top: 0, width: '120px', height: '100%', zIndex: 2, pointerEvents: 'none',
                },
                '&::before': { left: 0, background: `linear-gradient(to right, ${theme.palette.background.paper}, transparent)` },
                '&::after': { right: 0, background: `linear-gradient(to left, ${theme.palette.background.paper}, transparent)` },
            }}>
                <Box sx={{
                    display: 'flex', width: 'max-content', py: 1,
                    animation: `${toolsMarqueeReverse} 32s linear infinite`,
                    '&:hover': { animationPlayState: 'paused' },
                }}>
                    {[...row2, ...row2].map((tool, i) => <ToolChip key={i} tool={tool} />)}
                </Box>
            </Box>
        </Box>
    );
});

// ══════════════════════════════════════════════════════════════════
// ─── FIX 2: Final CTA Section — dark background removed ───────────
// ══════════════════════════════════════════════════════════════════
const FinalCTASection = memo(({ theme, onStartService }) => (
    <Box sx={{
        position: 'relative', overflow: 'hidden',
        // ✅ FIX: removed dark gradient background — now uses site background
        background: theme.palette.mode === 'dark'
            ? theme.palette.background.default
            : '#ffffff',
    }}>
        {/* ✅ FIX: background image removed (opacity: 0) */}
        <Box component="img"
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80"
            alt="CTA"
            sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0 }}
        />
        {/* Subtle gradient orbs — adjusted for light bg */}
        <Box sx={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(102,126,234,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <Box sx={{ position: 'absolute', bottom: -100, left: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(240,147,251,0.10) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2, py: { xs: 10, md: 16 }, textAlign: 'center' }}>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <Box sx={{
                    display: 'inline-flex', alignItems: 'center', gap: 1, px: 3, py: 1, mb: 4,
                    borderRadius: '50px',
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.25)}`,
                    background: alpha(theme.palette.primary.main, 0.06),
                    backdropFilter: 'blur(10px)',
                }}>
                    <Box sx={{
                        width: 8, height: 8, borderRadius: '50%', background: '#43e97b',
                        boxShadow: '0 0 0 3px rgba(67,233,123,0.25)',
                        animation: `${pulseRing} 2s ease infinite`,
                    }} />
                    <Typography sx={{
                        color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.9)' : theme.palette.text.primary,
                        fontSize: '0.85rem', fontWeight: 700,
                    }}>
                        AI Systems Live & Running 24/7
                    </Typography>
                </Box>

                <Typography variant="h2" sx={{
                    fontWeight: 900,
                    color: theme.palette.text.primary,
                    mb: 3, lineHeight: 1.1, letterSpacing: '-0.03em',
                    fontSize: { xs: '2rem', md: '3.5rem', lg: '4rem' },
                }}>
                    Ready to Build{' '}
                    <Box component="span" sx={{
                        background: 'linear-gradient(135deg, #f9a8d4, #d8b4fe, #a5b4fc)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                        backgroundSize: '200% 200%',
                        animation: `${shimmerAnim} 4s linear infinite`,
                    }}>Intelligent Growth?</Box>
                </Typography>

                <Typography variant="h6" sx={{
                    color: 'text.secondary',
                    mb: 6, fontWeight: 400, lineHeight: 1.7, maxWidth: 580, mx: 'auto',
                }}>
                    Let's turn your data into decisions — and decisions into revenue. Most clients see results within 30–60 days. No contracts. No fluff. Just growth.
                </Typography>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5} justifyContent="center">
                    <Button variant="contained" size="large" endIcon={<RocketLaunchIcon />}
                        onClick={() => onStartService('AI Growth Era — All Services')}
                        sx={{
                            borderRadius: '50px', fontWeight: 800, px: 6, py: 2,
                            background: 'linear-gradient(135deg, #667eea, #764ba2)',
                            fontSize: '1rem',
                            boxShadow: '0 0 40px rgba(102,126,234,0.3)',
                            '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 0 60px rgba(102,126,234,0.5)', filter: 'brightness(1.1)' },
                            transition: 'all 0.3s ease',
                        }}>
                        Start Your Growth Journey
                    </Button>
                    <Button variant="outlined" size="large"
                        sx={{
                            borderRadius: '50px', fontWeight: 700, px: 5, py: 2,
                            color: theme.palette.text.primary,
                            borderColor: alpha(theme.palette.primary.main, 0.4),
                            fontSize: '1rem',
                            '&:hover': {
                                borderColor: theme.palette.primary.main,
                                background: alpha(theme.palette.primary.main, 0.05),
                                transform: 'translateY(-3px)',
                            },
                            transition: 'all 0.3s ease',
                        }}>
                        View All 20+ Services
                    </Button>
                </Stack>

                <Grid container spacing={4} sx={{ mt: 8 }} justifyContent="center">
                    {[
                        { icon: <CheckCircleIcon sx={{ fontSize: 20, color: '#43e97b' }} />, label: 'Free Strategy Call' },
                        { icon: <CheckCircleIcon sx={{ fontSize: 20, color: '#43e97b' }} />, label: 'No Long-Term Contracts' },
                        { icon: <CheckCircleIcon sx={{ fontSize: 20, color: '#43e97b' }} />, label: 'Results Within 30 Days' },
                        { icon: <CheckCircleIcon sx={{ fontSize: 20, color: '#43e97b' }} />, label: '24/7 AI Systems' },
                    ].map((item, i) => (
                        <Grid item key={i}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                {item.icon}
                                <Typography sx={{
                                    color: 'text.secondary',
                                    fontWeight: 600, fontSize: '0.9rem',
                                }}>{item.label}</Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </motion.div>
        </Container>
    </Box>
));

// ══════════════════════════════════════════════════════════════════
// ─── MAIN PAGE CONTENT ────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════
const ServicesContent = () => {
    const theme = useMuiTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [expandedService, setExpandedService] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [serviceModalOpen, setServiceModalOpen] = useState(false);
    const [contactFormOpen, setContactFormOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [selectedServiceName, setSelectedServiceName] = useState('');
    const [heroCurrent, setHeroCurrent] = useState(0);
    const [heroPaused, setHeroPaused] = useState(false);
    const heroIntervalRef = useRef(null);

    useEffect(() => {
        if (!heroPaused) {
            heroIntervalRef.current = setInterval(() => {
                setHeroCurrent(c => (c + 1) % SERVICE_IMAGES.length);
            }, 3800);
        }
        return () => clearInterval(heroIntervalRef.current);
    }, [heroPaused, heroCurrent]);

    useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

    const handleExploreDetails = (service) => { setSelectedService(service); setServiceModalOpen(true); };
    const handleServiceModalClose = () => { setServiceModalOpen(false); setSelectedService(null); };
    const handleStartService = (serviceName) => { setSelectedServiceName(serviceName); setContactFormOpen(true); setServiceModalOpen(false); };
    const handleContactFormClose = () => { setContactFormOpen(false); setSelectedServiceName(''); };
    const handleServiceExpand = (serviceId) => setExpandedService(expandedService === serviceId ? null : serviceId);

    const services = [
        { id: 1, title: "AI Marketing Solutions (LLM Growth)", icon: <AutoAwesomeIcon />, tagline: "Smart Growth Starts With Intelligent AI Systems", category: "AI-POWERED MARKETING", shortDesc: "AI & LLM-powered marketing frameworks that analyze behavior, automate decisions, and maximize conversions.", features: ["Predict customer behavior with AI analytics", "Intelligent targeting & messaging", "Marketing automation that thinks", "Funnel optimization with AI"], benefits: ["Data-driven decisions - no assumptions", "Higher conversion rates", "Cost efficiency with predictive targeting", "Scalable growth systems"], faqs: [{ q: "What are AI marketing solutions?", a: "AI marketing uses ML to analyze data, predict behavior, automate campaigns, and improve performance." }, { q: "How do LLMs improve marketing?", a: "LLMs enhance personalization, automate content, and optimize communication across channels." }, { q: "Is AI marketing suitable for small businesses?", a: "Yes, it helps small businesses reduce costs and automate workflows efficiently." }] },
        { id: 2, title: "Performance Marketing Services", icon: <TrendingUpIcon />, tagline: "AI-Powered Advertising That Delivers Real ROI", category: "PAID ADVERTISING", shortDesc: "Measurable growth campaigns across Google, Meta, LinkedIn, and YouTube with AI optimization.", features: ["Precision AI-powered targeting", "Data-driven campaign optimization", "AI-assisted decision making", "Full-funnel performance strategy", "Real-time performance tracking", "Multi-platform campaign management"], benefits: ["Higher ROI on ad spend", "Lower cost per lead & acquisition", "AI-optimized campaign performance", "Clear reporting & transparency", "Scalable paid growth systems"], platforms: ["Google Ads", "Meta Ads", "LinkedIn Ads", "YouTube Ads", "TikTok Ads"] },
        { id: 3, title: "SEO & Growth Strategy", icon: <SearchIcon />, tagline: "AI-Driven SEO That Fuels Long-Term Growth", category: "SEO & GROWTH", shortDesc: "Build search ecosystems that align visibility with business goals for sustainable traffic and revenue.", features: ["AI-powered keyword & intent research", "Technical SEO optimization", "Content & topical authority strategy", "Growth-focused SEO execution"], benefits: ["Higher search engine rankings", "Sustainable organic traffic growth", "Improved website authority & trust", "Better conversion rates from SEO"], platforms: ["Google Search", "Bing", "Local SEO", "E-commerce SEO"] },
        { id: 4, title: "Podcast & Social Media Marketing", icon: <PodcastsIcon />, tagline: "Build Authority. Earn Attention. Create Trust at Scale.", category: "CONTENT MARKETING", shortDesc: "Authority-building audio and social content for deep audience connection.", features: ["Podcast strategy & positioning", "Authority-building content planning", "Niche audience targeting", "Social media community building"], benefits: ["Stronger brand authority & trust", "Loyal, high-intent audience", "Long-form trust building", "Position as industry expert"], platforms: ["Spotify", "Apple Podcasts", "LinkedIn", "Instagram", "YouTube"] },
        { id: 5, title: "GMB with AI Model (Local Growth)", icon: <StoreIcon />, tagline: "Dominate Local Search with AI-Powered Visibility", category: "LOCAL SEO", shortDesc: "AI-powered Google Business Profile optimization for local rankings, calls, and visits.", features: ["Complete GMB optimization", "AI-driven local keyword strategy", "Automated reviews & engagement", "Local ranking improvement"], benefits: ["Higher Google Maps rankings", "More phone calls & walk-in customers", "Automated review management", "Hands-free local growth system"], platforms: ["Google Business Profile", "Google Maps", "Local Directories"] },
        { id: 6, title: "Funnel & Automation Systems", icon: <BoltIcon />, tagline: "Turn Traffic Into Revenue — Automatically", category: "AUTOMATION", shortDesc: "Capture leads, nurture prospects, and convert customers without manual effort.", features: ["High-converting lead funnels", "Sales automation workflows", "CRM integrations & data syncing", "AI-assisted funnel optimization"], benefits: ["Higher conversion rates", "Reduced manual work & errors", "Faster lead response times", "Scalable automation systems"], platforms: ["CRM Systems", "Email Marketing", "WhatsApp", "SMS"] },
        { id: 7, title: "Branding, Creative & Design", icon: <BrushIcon />, tagline: "Design That Builds Recall. Creativity That Drives Growth.", category: "BRANDING", shortDesc: "Cohesive brand systems that stand out, stay memorable, and convert consistently.", features: ["Brand positioning & messaging", "Visual identity systems", "Logo design & brand guidelines", "Performance-optimized assets"], benefits: ["Stronger brand recognition & recall", "Higher engagement & conversion rates", "Professional, scalable brand identity", "Consistent brand experience"], platforms: ["Adobe Creative Suite", "Figma", "Canva", "Brand Guidelines"] },
        { id: 8, title: "Web, App & UX/UI Development", icon: <WebIcon />, tagline: "Your Digital Salesperson — Built to Convert", category: "DEVELOPMENT", shortDesc: "High-performance websites, mobile apps, and UX/UI systems that guide users and drive conversions.", features: ["High-conversion website development", "Mobile app design & development", "User behavior-driven UX/UI", "Speed & performance optimization"], benefits: ["Higher conversion rates", "Improved user experience & retention", "Faster load times & performance", "Mobile-first responsive design"], platforms: ["React", "Next.js", "React Native", "Figma", "Webflow"] },
        { id: 9, title: "Content Creation & Writing", icon: <CreateIcon />, tagline: "Words Sell. Stories Convert. Strategy Scales.", category: "CONTENT", shortDesc: "Human-written, emotion-driven content that builds trust, ranks, and converts.", features: ["Website copy & messaging", "SEO blogs & articles", "Brand storytelling", "Sales-driven content"], benefits: ["Clear, persuasive brand messaging", "Higher engagement & conversion rates", "SEO-optimized, rank-ready content", "Emotionally resonant storytelling"], platforms: ["WordPress", "Medium", "SEO Tools", "Content Management"] },
        { id: 10, title: "Sales-Aligned Marketing Systems", icon: <DashboardIcon />, tagline: "Where Marketing Meets Sales — and Revenue Follows", category: "MARKETING SYSTEMS", shortDesc: "Connect marketing, sales, and revenue into one seamless growth engine.", features: ["Email marketing systems", "WhatsApp bulk messaging", "CRM workflows & automation", "Lead qualification systems"], benefits: ["Higher lead-to-sale conversion rates", "Better marketing ROI", "Faster sales response times", "Automated follow-ups & workflows"], platforms: ["CRM Systems", "Email Platforms", "WhatsApp Business API", "Automation Tools"] },
        { id: 11, title: "Social Media Marketing", icon: <PeopleIcon />, tagline: "Community-Led. Conversion-Focused. Trust-Driven.", category: "SOCIAL MEDIA", shortDesc: "Build real communities and meaningful engagement that turn into conversions.", features: ["Social media strategy & planning", "Community-focused content creation", "Platform-specific content execution", "Engagement & comment management"], benefits: ["Stronger brand voice & identity", "Engaged, loyal online communities", "Consistent, high-quality content", "Conversion-supportive social presence"], platforms: ["LinkedIn", "Instagram", "Facebook", "X/Twitter", "TikTok"] },
        { id: 12, title: "Email Marketing", icon: <MailIcon />, tagline: "Turn Inboxes Into Conversations — and Conversations Into Revenue", category: "EMAIL MARKETING", shortDesc: "Nurture leads, activate customers, and drive repeat revenue — automatically.", features: ["Email strategy & planning", "Email automation & workflows", "Sales & conversion email copy", "Analytics, testing & optimization"], benefits: ["Higher open & click-through rates", "Better lead nurturing & conversions", "Automated, consistent communication", "Stronger customer relationships"], platforms: ["Mailchimp", "Klaviyo", "SendGrid", "ActiveCampaign", "HubSpot"] },
        { id: 13, title: "E-commerce Marketing", icon: <ShoppingBagIcon />, tagline: "Turn Browsers Into Buyers — and Buyers Into Repeat Customers", category: "E-COMMERCE", shortDesc: "Scale online stores with performance marketing, CRO, automation, and retention strategies.", features: ["Performance-driven e-commerce campaigns", "Conversion rate optimization (CRO)", "Retention & repeat purchase systems", "Data, tracking & optimization"], benefits: ["Higher conversion rates", "Lower cost per purchase", "Increased average order value", "Better customer retention"], platforms: ["Shopify", "WooCommerce", "BigCommerce", "Amazon", "Google Shopping"] },
        { id: 14, title: "Bulk WhatsApp Marketing", icon: <WhatsAppIcon />, tagline: "Direct. Personal. High-Conversion Messaging at Scale.", category: "WHATSAPP MARKETING", shortDesc: "Reach customers instantly, personally, and at scale with permission-based WhatsApp systems.", features: ["Bulk WhatsApp campaigns", "WhatsApp automation & flows", "CRM & funnel integration", "Performance tracking & optimization"], benefits: ["90%+ message open rates", "Faster lead response & conversions", "Automated, scalable communication", "Higher engagement than email or SMS"], platforms: ["WhatsApp Business API", "CRM Integration", "Automation Tools"] },
        { id: 15, title: "Brand Collaboration", icon: <HandshakeOutlinedIcon />, tagline: "Grow Faster by Growing Together", category: "COLLABORATIONS", shortDesc: "Expand reach, credibility, and revenue through strategic partnerships with aligned brands.", features: ["Strategic brand partnerships", "Campaign & co-marketing execution", "Creator & influencer collaborations", "Performance tracking & reporting"], benefits: ["Access to new, relevant audiences", "Higher trust & brand credibility", "Shared marketing effort & cost efficiency", "Stronger brand positioning"], platforms: ["Cross-Platform Promotion", "Co-Branded Campaigns", "Influencer Networks"] },
        { id: 16, title: "Influencer Marketing", icon: <PeopleIcon />, tagline: "Leverage Trust. Amplify Reach. Drive Real Conversions.", category: "INFLUENCER MARKETING", shortDesc: "Partner with authentic creators who have the trust of your ideal audience.", features: ["Influencer discovery & vetting", "Campaign strategy & execution", "Content & UGC creation", "Tracking, analytics & optimization"], benefits: ["Access to trust-built audiences", "Higher engagement than traditional ads", "Authentic brand storytelling", "Reusable influencer content (UGC)"], platforms: ["Instagram", "YouTube", "TikTok", "LinkedIn", "Twitch"] },
        { id: 17, title: "App Marketing", icon: <SmartphoneIcon />, tagline: "Drive Installs. Activate Users. Scale Retention.", category: "APP MARKETING", shortDesc: "Get apps discovered, downloaded, and actively used with sustainable growth systems.", features: ["App user acquisition", "App store optimization (ASO)", "Activation & onboarding optimization", "Retention & re-engagement systems"], benefits: ["More quality app installs", "Lower cost per install (CPI)", "Higher activation & retention rates", "Improved app store visibility"], platforms: ["Google Play", "App Store", "App Campaigns", "ASO Tools"] },
        { id: 18, title: "Go-To-Market (GTM) Strategies", icon: <FlagIcon />, tagline: "Launch Smarter. Enter Faster. Scale Confidently.", category: "STRATEGY", shortDesc: "Align product, audience, pricing, channels, and messaging into one executable growth plan.", features: ["Market & customer research", "Product positioning & messaging", "Pricing & offer strategy", "Channel & launch strategy"], benefits: ["Faster market entry & adoption", "Clear product positioning", "Lower customer acquisition risk", "Aligned marketing & sales execution"], platforms: ["Market Research", "Positioning Frameworks", "Launch Planning"] },
        { id: 19, title: "Site Optimization", icon: <SpeedIcon />, tagline: "Turn Your Website Into a High-Performance Growth Engine", category: "OPTIMIZATION", shortDesc: "Improve speed, usability, SEO health, and conversion flow for better results.", features: ["Website speed & performance optimization", "Technical SEO optimization", "Conversion rate optimization (CRO)", "UX/UI optimization"], benefits: ["Faster website load times", "Higher conversion rates", "Improved SEO rankings", "Better user experience"], platforms: ["Core Web Vitals", "SEO Tools", "CRO Tools", "Analytics"] },
        { id: 20, title: "Product Branding", icon: <BrandingWatermarkIcon />, tagline: "Turn Your Product Into a Recognizable, Trust-Built Brand", category: "PRODUCT BRANDING", shortDesc: "Position products clearly, differentiate in the market, and build emotional connection.", features: ["Product positioning & strategy", "Visual identity for products", "Product messaging & storytelling", "Brand guidelines & consistency"], benefits: ["Clear product positioning", "Stronger brand recall & recognition", "Higher customer trust & adoption", "Consistent product experience"], platforms: ["Brand Identity", "Packaging Design", "Visual Systems", "Brand Guidelines"] }
    ];

    return (
        <Box sx={{ minHeight: '100vh', background: theme.palette.mode === 'dark' ? '#111827' : '#ffffff', position: 'relative', overflow: 'hidden' }}>
            <Box sx={{ width: '100%', overflow: 'hidden' }}>

                {/* ── HERO SECTION ── */}
                <Box sx={{
                    position: 'relative', height: '100vh', minHeight: 560, maxHeight: 900,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    overflow: 'hidden', textAlign: 'center', color: 'white',
                }}
                    onMouseEnter={() => setHeroPaused(true)}
                    onMouseLeave={() => setHeroPaused(false)}
                >
                    <HeroSliderSection
                        current={heroCurrent}
                        onGoTo={setHeroCurrent}
                        onPrev={() => setHeroCurrent(c => (c - 1 + SERVICE_IMAGES.length) % SERVICE_IMAGES.length)}
                        onNext={() => setHeroCurrent(c => (c + 1) % SERVICE_IMAGES.length)}
                        total={SERVICE_IMAGES.length}
                    />
                    <Container maxWidth="md" sx={{ position: 'relative', zIndex: 5, pt: { xs: 8, md: 10 }, pb: { xs: 16, md: 18 } }}>
                        <Fade in={loaded} timeout={500}>
                            <Typography variant="h1" sx={{
                                fontWeight: 900, mb: 2,
                                fontSize: { xs: '2rem', md: '3.2rem', lg: '4rem' },
                                lineHeight: 1.1, letterSpacing: '-0.02em',
                                animation: `${fadeInUp} 0.8s ease-out`,
                                textShadow: '0 4px 30px rgba(0,0,0,0.5)',
                            }}>
                                Build the{' '}
                                <Box component="span" sx={{ background: 'linear-gradient(to right, #f9a8d4, #d8b4fe, #a5b4fc)', backgroundClip: 'text', textFillColor: 'transparent', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Future</Box>
                                <br />of{' '}
                                <Box component="span" sx={{ color: 'white' }}>Service Excellence</Box>
                            </Typography>
                        </Fade>
                        <Fade in={loaded} timeout={800}>
                            <Typography variant="h5" sx={{ mb: 2, color: 'rgba(219,234,254,0.95)', fontWeight: 400, maxWidth: 640, mx: 'auto', fontSize: { xs: '0.95rem', md: '1.15rem' }, lineHeight: 1.5, animation: `${fadeInUp} 0.8s ease-out 0.2s both`, textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}>
                                AI-Powered Marketing Solutions Built for Scalable Growth
                            </Typography>
                        </Fade>
                        <Fade in={loaded} timeout={900}>
                            <Typography variant="body1" sx={{ mb: 3, fontSize: { xs: '0.88rem', md: '0.95rem' }, lineHeight: 1.6, color: 'rgba(255,255,255,0.8)', maxWidth: 620, mx: 'auto', animation: `${fadeInUp} 0.8s ease-out 0.35s both`, textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
                                At AI Growth Era, we don't offer random services. We build complete growth ecosystems where AI, performance marketing, automation, and creativity work together.
                            </Typography>
                        </Fade>
                        <Fade in={loaded} timeout={1000}>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1.5, animation: `${fadeInUp} 0.8s ease-out 0.5s both` }}>
                                {[
                                    { label: '20+ Services', color: '#a78bfa' },
                                    { label: 'AI-Powered', color: '#67e8f9' },
                                    { label: 'ROI-Focused', color: '#86efac' },
                                    { label: 'Scalable Systems', color: '#fda4af' },
                                ].map((badge, i) => (
                                    <Box key={i} sx={{ px: 2, py: 0.6, borderRadius: '20px', border: `1px solid ${badge.color}50`, background: `${badge.color}20`, backdropFilter: 'blur(10px)' }}>
                                        <Typography sx={{ color: badge.color, fontSize: '0.8rem', fontWeight: 700, letterSpacing: 0.5 }}>{badge.label}</Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Fade>
                    </Container>
                </Box>

                {/* Stats (hidden) */}
                <StatsSection theme={theme} />

                {/* ── Philosophy Section ── */}
                <Box sx={{ py: 10, bgcolor: 'background.paper' }}>
                    <Container maxWidth="lg">
                        <Typography variant="h3" align="center" sx={{ mb: 6, fontWeight: 800, color: theme.palette.text.primary }}>
                            Our Core Philosophy (Why Our Services Work)
                        </Typography>
                        <Typography variant="h5" align="center" sx={{ mb: 8, maxWidth: 800, mx: 'auto', fontStyle: 'italic', color: 'text.secondary' }}>
                            "Most agencies focus on activities. We focus on outcomes."
                        </Typography>
                        <Box sx={{ width: '100%', mx: 'auto', textAlign: 'center', mb: 4 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 4 }}>Every service is:</Typography>
                            <Box sx={{
                                width: '100%', overflow: 'hidden', position: 'relative',
                                '&::before, &::after': { content: '""', position: 'absolute', top: 0, width: '100px', height: '100%', zIndex: 2, pointerEvents: 'none' },
                                '&::before': { left: 0, background: `linear-gradient(to right, ${theme.palette.background.paper}, transparent)` },
                                '&::after': { right: 0, background: `linear-gradient(to left, ${theme.palette.background.paper}, transparent)` }
                            }}>
                                <Box sx={{ display: 'flex', width: 'max-content', animation: `${marquee} 20s linear infinite`, '&:hover': { animationPlayState: 'paused' } }}>
                                    {[...Array(3)].map((_, i) => (
                                        [{ title: 'AI-Driven', icon: <PsychologyIcon sx={{ fontSize: 30, color: theme.palette.primary.main }} />, desc: 'Strategies powered by data, not guesswork.' },
                                        { title: 'ROI-Focused', icon: <TrendingUpIcon sx={{ fontSize: 30, color: theme.palette.primary.main }} />, desc: 'Every campaign differs, but the goal is profit.' },
                                        { title: 'Designed to Scale', icon: <RocketLaunchIcon sx={{ fontSize: 30, color: theme.palette.primary.main }} />, desc: 'Systems built to grow with your business.' },
                                        { title: 'Sales Integrated', icon: <HandshakeIcon sx={{ fontSize: 30, color: theme.palette.primary.main }} />, desc: 'Marketing that actually drives closed deals.' }
                                        ].map((item, index) => (
                                            <Box key={`${i}-${index}`} sx={{ width: { xs: 200, md: 220 }, mx: 1.5, flexShrink: 0, display: 'flex' }}>
                                                <Paper elevation={0} sx={{
                                                    p: 3, width: '100%', height: '100%', borderRadius: 3,
                                                    bgcolor: alpha(theme.palette.background.paper, 0.6), backdropFilter: 'blur(20px)',
                                                    border: '1px solid', borderColor: alpha(theme.palette.divider, 0.1),
                                                    textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                                    transition: 'all 0.3s ease',
                                                    '&:hover': { transform: 'translateY(-8px)', borderColor: theme.palette.primary.main, boxShadow: `0 12px 30px -10px ${alpha(theme.palette.primary.main, 0.15)}` }
                                                }}>
                                                    <Box sx={{ mb: 2, p: 1.5, borderRadius: '50%', bgcolor: alpha(theme.palette.primary.main, 0.05), width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto' }}>
                                                        <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                                                            {item.icon}
                                                        </motion.div>
                                                    </Box>
                                                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1, lineHeight: 1.2 }}>{item.title}</Typography>
                                                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem', lineHeight: 1.4 }}>{item.desc}</Typography>
                                                </Paper>
                                            </Box>
                                        ))
                                    ))}
                                </Box>
                            </Box>
                            <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.primary.main, mt: 4 }}>
                                That's why our services don't work in isolation — they work together.
                            </Typography>
                        </Box>
                    </Container>
                </Box>

                {/* Why Choose Us (hidden) */}
                <WhyChooseUsSection theme={theme} onStartService={handleStartService} />

                {/* How It Works (hidden) */}
                <HowItWorksSection theme={theme} />

                {/* ── All Services Grid ── */}
                <Box sx={{ py: 10, bgcolor: alpha(theme.palette.background.default, 0.5) }}>
                    <Container maxWidth="lg">
                        <Box sx={{ textAlign: 'center', mb: 8 }}>
                            <Typography variant="h2" align="center" sx={{ mb: 2, fontWeight: 800, color: theme.palette.text.primary, fontSize: { xs: '2rem', md: '3rem' } }}>
                                Our All Services
                            </Typography>
                            <Typography variant="h6" align="center" sx={{ color: 'text.secondary', fontWeight: 400, maxWidth: 560, mx: 'auto' }}>
                                20+ AI-powered growth services designed to scale your business
                            </Typography>
                        </Box>
                        <Grid container spacing={3} justifyContent="center">
                            {[
                                { name: "AI Marketing Solutions", sub: "LLM Growth", icon: <PsychologyIcon />, img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=500&q=80", color: '#667eea' },
                                { name: "Performance Marketing", sub: "Google • Meta • LinkedIn • YouTube", icon: <CampaignIcon />, img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80", color: '#4facfe' },
                                { name: "SEO & Growth Strategy", sub: "Organic Traffic", icon: <SearchIcon />, img: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=500&q=80", color: '#43e97b' },
                                { name: "Podcast Marketing", sub: "Audio Authority", icon: <PodcastsIcon />, img: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=500&q=80", color: '#f093fb' },
                                { name: "Social Media Marketing", sub: "Community Growth", icon: <PublicIcon />, img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500&q=80", color: '#fa709a' },
                                { name: "GMB with AI Model", sub: "Local Growth", icon: <StoreIcon />, img: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=500&q=80", color: '#f7971e' },
                                { name: "Funnel & Automation", sub: "Convert at Scale", icon: <FilterFramesIcon />, img: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=500&q=80", color: '#fda085' },
                                { name: "Branding & Creative", sub: "Visual Identity", icon: <BrushIcon />, img: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=500&q=80", color: '#a18cd1' },
                                { name: "Logo Design", sub: "Brand Mark", icon: <DrawIcon />, img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=500&q=80", color: '#fd79a8' },
                                { name: "Website Development", sub: "Digital Presence", icon: <CodeIcon />, img: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=500&q=80", color: '#6c5ce7' },
                                { name: "Mobile Applications", sub: "Android / iOS", icon: <SmartphoneIcon />, img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&q=80", color: '#00b894' },
                                { name: "Content Creation", sub: "Words that Convert", icon: <CreateIcon />, img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&q=80", color: '#00cec9' },
                                { name: "Sales-Aligned Marketing", sub: "Revenue Systems", icon: <HandshakeIcon />, img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80", color: '#0984e3' },
                                { name: "Email Marketing", sub: "Inbox Revenue", icon: <EmailIcon />, img: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=500&q=80", color: '#74b9ff' },
                                { name: "E-commerce Marketing", sub: "Online Store Growth", icon: <ShoppingCartIcon />, img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&q=80", color: '#fd79a8' },
                                { name: "WhatsApp Bulk Messaging", sub: "Direct Messaging", icon: <WhatsAppIcon />, img: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=500&q=80", color: '#55efc4' },
                                { name: "Brand Collaborations", sub: "Strategic Partnerships", icon: <GroupsIcon />, img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=500&q=80", color: '#fdcb6e' },
                                { name: "Influencer Marketing", sub: "Trust & Reach", icon: <PeopleIcon />, img: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=500&q=80", color: '#e17055' },
                                { name: "UX/UI Design", sub: "User Experience", icon: <DesignServicesIcon />, img: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=500&q=80", color: '#a29bfe' },
                                { name: "Application Marketing", sub: "Installs & Retention", icon: <AppShortcutIcon />, img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&q=80", color: '#fd79a8' },
                                { name: "Go-To-Market Strategies", sub: "Launch Planning", icon: <FlagIcon />, img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&q=80", color: '#e84393' },
                            ].map((service, index) => (
                                <Grid item xs={6} sm={4} md={3} key={index}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: (index % 8) * 0.06 }}
                                        viewport={{ once: true }}
                                    >
                                        <Box sx={{
                                            borderRadius: 4, overflow: 'hidden', cursor: 'pointer',
                                            border: '1px solid', borderColor: alpha(theme.palette.divider, 0.1),
                                            background: theme.palette.background.paper,
                                            transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                                            '&:hover': {
                                                transform: 'translateY(-8px)',
                                                boxShadow: `0 20px 40px -10px ${alpha(service.color, 0.3)}`,
                                                borderColor: alpha(service.color, 0.5),
                                                '& .svc-img': { transform: 'scale(1.08)' },
                                                '& .svc-icon-wrap': { background: service.color, color: 'white' },
                                            },
                                        }}>
                                            <Box sx={{ position: 'relative', height: 150, overflow: 'hidden' }}>
                                                <Box
                                                    className="svc-img"
                                                    component="img"
                                                    src={service.img}
                                                    alt={service.name}
                                                    sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                                                />
                                                <Box sx={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, transparent 30%, ${alpha(service.color, 0.7)} 100%)` }} />
                                                <Box sx={{
                                                    position: 'absolute', top: 10, left: 10,
                                                    background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
                                                    borderRadius: '20px', px: 1.2, py: 0.3,
                                                    border: '1px solid rgba(255,255,255,0.25)',
                                                }}>
                                                    <Typography sx={{ color: 'white', fontSize: '0.6rem', fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase' }}>
                                                        {service.sub}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Box sx={{ p: 2.5 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                    <Box className="svc-icon-wrap" sx={{
                                                        width: 40, height: 40, borderRadius: 2, flexShrink: 0,
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        background: alpha(service.color, 0.1), color: service.color,
                                                        transition: 'all 0.3s ease',
                                                    }}>
                                                        {React.cloneElement(service.icon, { sx: { fontSize: 20 } })}
                                                    </Box>
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.3, fontSize: '0.88rem', color: theme.palette.text.primary }}>
                                                        {service.name}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Box sx={{ height: 3, background: `linear-gradient(to right, ${service.color}, ${alpha(service.color, 0.3)})` }} />
                                        </Box>
                                    </motion.div>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>

                {/* Featured Spotlight (hidden) */}
                <FeaturedServicesSpotlight theme={theme} onStartService={handleStartService} />

                {/* Testimonials (hidden) */}
                <TestimonialsSection theme={theme} />

                {/* ── Service Detail Accordions ── */}
                <Box sx={{ py: 10, bgcolor: 'background.paper' }}>
                    <Container maxWidth="lg">
                        <Typography variant="h3" align="center" sx={{ mb: 8, fontWeight: 800, color: theme.palette.text.primary }}>
                            Explore Details
                        </Typography>
                        {services.map((service) => (
                            <ServiceDetail
                                key={service.id}
                                service={service}
                                expanded={expandedService === service.id}
                                onChange={() => handleServiceExpand(service.id)}
                                theme={theme}
                                onStartService={handleStartService}
                            />
                        ))}
                    </Container>
                </Box>

                {/* How We Work (hidden) */}
                <HowWeWorkSection theme={theme} />

                {/* ── Industries Section (FIXED) ── */}
                <IndustriesSection theme={theme} />

                {/* ── Tools & Technologies ── */}
                <ToolsSection theme={theme} />

                {/* ── Final CTA Banner (FIXED - no dark background) ── */}
                <FinalCTASection theme={theme} onStartService={handleStartService} />

            </Box>

            {/* Modals */}
            <ServiceModal service={selectedService} open={serviceModalOpen} onClose={handleServiceModalClose} theme={theme} onStartService={handleStartService} />
            <ContactFormModal open={contactFormOpen} onClose={handleContactFormClose} serviceName={selectedServiceName} theme={theme} />
        </Box>
    );
};

// ─── Page Wrapper ──────────────────────────────────────────────────────────────
const ServicesPage = () => {
    const { theme: appTheme } = useAppTheme();
    const muiTheme = useMemo(() => createTheme({
        palette: {
            mode: appTheme || 'light',
            primary: { main: '#667eea' },
            background: {
                default: appTheme === 'dark' ? '#0f172a' : '#f8fafc',
                paper: appTheme === 'dark' ? '#1e293b' : '#ffffff',
            },
            text: {
                primary: appTheme === 'dark' ? '#f1f5f9' : '#0f172a',
                secondary: appTheme === 'dark' ? '#94a3b8' : '#475569',
            },
        },
        typography: {
            fontFamily: '"Geist Sans", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
            h1: { fontWeight: 800 }, h2: { fontWeight: 800 }, h3: { fontWeight: 700 },
        },
        components: {
            MuiButton: { styleOverrides: { root: { textTransform: 'none', fontWeight: 600, borderRadius: '0.5rem' } } },
            MuiPaper: { styleOverrides: { root: { borderRadius: '1rem' } } }
        }
    }), [appTheme]);

    return (
        <ThemeProvider theme={muiTheme}>
            <CssBaseline />
            <Box sx={{
                minHeight: '100vh',
                background: appTheme === 'dark'
                    ? 'linear-gradient(to bottom, #0f172a, #1e1b4b)'
                    : 'linear-gradient(to bottom, #f8fafc, #ffffff, #eff6ff)',
                color: 'text.primary'
            }}>
                <ServicesContent />
            </Box>
        </ThemeProvider>
    );
};

export default ServicesPage;
