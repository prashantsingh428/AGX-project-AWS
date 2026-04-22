import React, { useEffect } from 'react';

const CookieInfo = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            {/* MAIN CONTENT — with proper top padding to clear navbar */}
            <main className="bg-white pt-8">
                <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

                    {/* MAIN TITLE */}
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-2">
                        Cookie Policy
                    </h1>
                    <p className="text-gray-500 text-base mb-2">
                        Last Updated: January 2026
                    </p>
                    <p className="text-gray-700 mb-8 border-b border-gray-100 pb-6">
                        This Cookie Policy explains how AI Growthexa uses cookies and similar tracking technologies
                        when you visit our website, platforms, applications, or interact with our digital services
                        (collectively, the "Site"). This policy should be read together with our{' '}
                        <a href="/privacy-policy" className="text-primary underline underline-offset-2 hover:text-primary/80">
                            Privacy Policy
                        </a>.
                    </p>

                    {/* 1. WHAT ARE COOKIES? */}
                    <section className="mb-10">
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">
                            1. What Are Cookies?
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-3">
                            Cookies are small text files that are stored on your computer, mobile device, tablet,
                            or other internet-enabled devices when you visit a website. Cookies help websites function
                            efficiently, improve user experience, remember preferences, analyze performance, and deliver
                            relevant content or advertisements.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            Cookies do not typically contain information that directly identifies you as an individual,
                            but they may be linked to personal data that we store about you.
                        </p>
                    </section>

                    {/* 2. WHY AI GROWTHEXA USES COOKIES */}
                    <section className="mb-10">
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">
                            2. Why AI Growthexa Uses Cookies
                        </h2>
                        <p className="text-gray-700 mb-2">
                            AI Growthexa uses cookies to:
                        </p>
                        <ul className="list-disc pl-6 mb-2 text-gray-700 space-y-1">
                            <li>Ensure proper functionality and security of the website</li>
                            <li>Improve website performance, usability, and navigation</li>
                            <li>Analyze traffic, user behavior, and engagement</li>
                            <li>Personalize content and user experience</li>
                            <li>Support marketing, remarketing, and advertising campaigns</li>
                            <li>Measure campaign effectiveness and conversion performance</li>
                        </ul>
                    </section>

                    {/* 3. TYPES OF COOKIES WE USE */}
                    <section className="mb-10">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            3. Types of Cookies We Use
                        </h2>

                        <h3 className="font-medium text-gray-900 mt-5 mb-2">
                            a) Strictly Necessary (Functional) Cookies
                        </h3>
                        <p className="text-gray-700 mb-3">
                            These cookies are essential for the website to function properly. They enable core features such as:
                            Page navigation; Secure access to forms or dashboards; Session management.
                            Without these cookies, certain parts of the Site may not work correctly.
                        </p>

                        <h3 className="font-medium text-gray-900 mt-5 mb-2">
                            b) Performance & Analytics Cookies
                        </h3>
                        <p className="text-gray-700 mb-3">
                            These cookies help us understand how visitors interact with our Site by collecting anonymous
                            information such as: Pages visited; Time spent on the website; Traffic sources; Error reports.
                            We use tools such as Google Analytics and similar platforms to analyze this data and improve
                            website performance.
                        </p>

                        <h3 className="font-medium text-gray-900 mt-5 mb-2">
                            c) Personalization Cookies
                        </h3>
                        <p className="text-gray-700 mb-3">
                            Personalization cookies allow us to: Remember your preferences (language, region, device type);
                            Customize the appearance and content of the Site; Improve your overall browsing experience.
                        </p>

                        <h3 className="font-medium text-gray-900 mt-5 mb-2">
                            d) Advertising & Marketing Cookies
                        </h3>
                        <p className="text-gray-700 mb-3">
                            These cookies are used to: Deliver relevant advertisements across platforms; Limit the number of
                            times you see the same ad; Measure ad performance and conversions; Support remarketing on platforms
                            such as Google, Meta, LinkedIn, and other advertising networks.
                            Advertising cookies may be set by AI Growthexa or third-party advertising partners.
                        </p>

                        <h3 className="font-medium text-gray-900 mt-5 mb-2">
                            e) Third-Party Cookies
                        </h3>
                        <p className="text-gray-700">
                            Third-party cookies may be placed by: Advertising platforms; Analytics providers; Social media
                            networks (e.g., Facebook, LinkedIn, X). AI Growthexa does not control these cookies. Their use is
                            governed by the respective third-party privacy and cookie policies.
                        </p>
                    </section>

                    {/* 4. FIRST-PARTY VS THIRD-PARTY COOKIES */}
                    <section className="mb-10">
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">
                            4. First-Party vs Third-Party Cookies
                        </h2>
                        <p className="text-gray-700 mb-2">
                            <span className="font-medium">First-party cookies</span> are set directly by AI Growthexa to support
                            website functionality and analytics.
                        </p>
                        <p className="text-gray-700 mb-2">
                            <span className="font-medium">Third-party cookies</span> are set by external service providers to
                            deliver analytics, advertising, or social media features.
                        </p>
                        <p className="text-gray-700">
                            Cookies may be <span className="font-medium">session-based</span> (deleted when you close your browser)
                            or <span className="font-medium">persistent</span> (stored until they expire or are deleted manually).
                        </p>
                    </section>

                    {/* 5. SOCIAL MEDIA & EMBEDDED CONTENT */}
                    <section className="mb-10">
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">
                            5. Social Media & Embedded Content
                        </h2>
                        <p className="text-gray-700">
                            Our Site may include social media buttons, plugins, or embedded content. When you interact with these
                            features, social media platforms may collect data about your browsing activity in accordance with their
                            own privacy policies. AI Growthexa has no control over how these platforms process your data.
                        </p>
                    </section>

                    {/* 6. ACCEPTING OR MANAGING COOKIES */}
                    <section className="mb-10">
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">
                            6. Accepting or Managing Cookies
                        </h2>
                        <p className="text-gray-700 mb-2">
                            When you visit our website for the first time, a cookie consent banner will inform you about the use of cookies.
                        </p>
                        <p className="text-gray-700 mb-2">
                            You may:
                        </p>
                        <ul className="list-disc pl-6 mb-2 text-gray-700">
                            <li>Accept all cookies</li>
                            <li>Reject non-essential cookies</li>
                            <li>Manage cookie preferences through your browser settings</li>
                        </ul>
                        <p className="text-gray-700">
                            Please note that disabling certain cookies may affect website functionality and user experience.
                        </p>
                    </section>

                    {/* 7. HOW TO DISABLE COOKIES */}
                    <section className="mb-10">
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">
                            7. How to Disable Cookies
                        </h2>
                        <p className="text-gray-700 mb-2">
                            You can control or delete cookies through your browser settings. Each browser provides different options to:
                        </p>
                        <ul className="list-disc pl-6 mb-2 text-gray-700">
                            <li>Block cookies</li>
                            <li>Delete existing cookies</li>
                            <li>Receive alerts before cookies are placed</li>
                        </ul>
                        <p className="text-gray-700">
                            Refer to your browser's help section for instructions.
                        </p>
                    </section>

                    {/* 8. DATA PROTECTION & COMPLIANCE */}
                    <section className="mb-10">
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">
                            8. Data Protection & Compliance
                        </h2>
                        <p className="text-gray-700">
                            AI Growthexa uses cookies in compliance with: Information Technology Act, 2000; IT Rules, 2011;
                            Digital Personal Data Protection Act, 2023 (India). Cookie-related data is handled in accordance with
                            our <a href="/privacy-policy" className="text-primary underline underline-offset-2 hover:text-primary/80">Privacy Policy</a>.
                        </p>
                    </section>

                    {/* 9. UPDATES TO THIS COOKIE POLICY */}
                    <section className="mb-10">
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">
                            9. Updates to This Cookie Policy
                        </h2>
                        <p className="text-gray-700 mb-2">
                            We may update this Cookie Policy from time to time to reflect changes in technology, law, or business practices.
                            Any updates will be posted on this page with the revised date.
                        </p>
                        <p className="text-gray-700">
                            Continued use of our Site after changes indicates acceptance of the updated policy.
                        </p>
                    </section>

                    {/* 10. CONTACT INFORMATION */}
                    <section className="mb-12">
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">
                            10. Contact Information
                        </h2>
                        <p className="text-gray-700">
                            For questions or concerns regarding this Cookie Policy, please contact:
                        </p>
                        <p className="text-gray-700 mt-2">
                            Email: <span className="font-medium">support@aigrowthexa.com</span>
                        </p>
                        <p className="text-gray-600 text-sm mt-4 border-l-4 border-gray-300 pl-4 py-2 bg-gray-50 -mx-4 sm:mx-0 sm:bg-transparent sm:border-l-4 sm:pl-4">
                            By continuing to use AI Growthexa's website, you consent to the use of cookies as described in this Cookie Policy.
                        </p>
                    </section>

                </article>
            </main>
        </>
    );
};

export default CookieInfo;
