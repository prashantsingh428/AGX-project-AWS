import React, { useEffect } from 'react';

const PrivacyInfo = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const policySections = [
        {
            title: "1. Scope of This Policy",
            content: (
                <>
                    <p>
                        This Privacy Policy applies only to information collected directly by AI Growthexa through our website, applications, marketing platforms, communication channels, forms, and service engagements. It does not apply to third-party websites or platforms linked from our Services.
                    </p>
                </>
            ),
        },
        {
            title: "2. Information We Collect",
            content: (
                <>
                    <p className="font-medium">a) Information You Provide Directly</p>
                    <p>
                        We may collect personal information when you: Fill out contact, inquiry, demo, or consultation forms; Register for services or enter into contracts; Communicate with us via email, phone, WhatsApp, or social media. This may include: Name, company name, designation; Email address, phone number; Billing and payment-related information; Project details, business data, credentials (shared voluntarily).
                    </p>
                    <p className="font-medium mt-4">b) Information Collected Automatically</p>
                    <p>
                        When you visit our website, we may collect: IP address; Browser type and device information; Pages visited, time spent, referral URLs; Cookies and tracking data. This data is collected for analytics, security, and performance optimization.
                    </p>
                </>
            ),
        },
        {
            title: "3. Cookies & Tracking Technologies",
            content: (
                <p>
                    AI Growthexa uses cookies and similar technologies to: Improve website functionality; Analyze traffic and usage behavior; Support marketing and remarketing campaigns. You may disable cookies through your browser settings, though some features may be affected.
                </p>
            ),
        },
        {
            title: "4. How We Use Your Information",
            content: (
                <p>
                    We use collected information to: Provide, operate, and improve our Services; Communicate regarding inquiries, proposals, and support; Execute contracts and deliver services; Run marketing, analytics, and AI-driven optimization; Comply with legal and regulatory obligations. We do not sell or rent personal data to third parties.
                </p>
            ),
        },
        {
            title: "5. Legal Basis for Processing (DPDP Act)",
            content: (
                <p>
                    We process personal data based on: Your consent; Contractual necessity; Legal obligations; Legitimate business interests.
                </p>
            ),
        },
        {
            title: "6. Data Sharing & Disclosure",
            content: (
                <p>
                    We may share data only with: Authorized employees, contractors, and service providers; Technology partners, hosting providers, analytics platforms; Government or legal authorities when required by law. All such parties are bound by confidentiality and data protection obligations.
                </p>
            ),
        },
        {
            title: "7. Data Security Measures",
            content: (
                <p>
                    AI Growthexa implements reasonable technical and organizational safeguards, including: Secure servers and encrypted communication; Access control and role-based permissions; Regular system monitoring. However, no electronic transmission or storage system is 100% secure.
                </p>
            ),
        },
        {
            title: "8. Data Retention",
            content: (
                <p>
                    We retain personal data only for as long as necessary to: Fulfill business and contractual purposes; Comply with legal obligations; Resolve disputes and enforce agreements. Data is securely deleted or anonymized when no longer required.
                </p>
            ),
        },
        {
            title: "9. Children’s Privacy",
            content: (
                <p>
                    Our Services are intended for individuals aged 18 years and above. We do not knowingly collect data from minors. If you believe a child has provided us personal data, please contact us for immediate removal.
                </p>
            ),
        },
        {
            title: "10. Your Rights (India)",
            content: (
                <p>
                    You have the right to: Access your personal data; Request correction or deletion; Withdraw consent; Raise grievances regarding data handling. Requests may be sent to our contact email below.
                </p>
            ),
        },
        {
            title: "11. Third-Party Links",
            content: (
                <p>
                    Our Services may contain links to external websites or platforms. We are not responsible for their privacy practices or content. Please review their policies independently.
                </p>
            ),
        },
        {
            title: "12. Marketing Communication",
            content: (
                <p>
                    You may opt out of marketing emails or communications at any time by contacting us or using the unsubscribe option.
                </p>
            ),
        },
        {
            title: "13. Changes to This Privacy Policy",
            content: (
                <p>
                    AI Growthexa may update this Privacy Policy periodically. Changes become effective once posted on our website. Continued use of Services constitutes acceptance of the updated policy.
                </p>
            ),
        },
        {
            title: "14. Contact & Grievance Officer",
            content: (
                <p>
                    For questions, data requests, or grievances: Email: <span className="font-medium">support@aigrowthexa.com</span>. We will respond within reasonable timeframes as required under Indian law.
                </p>
            ),
        },
    ];

    return (
        <>
            {/* MAIN CONTENT — only headings, paragraphs, lists. No cards, no containers, no divs. */}
            <main className="bg-white pt-8">
                <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

                    {/* MAIN TITLE — plain heading */}
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-2">
                        Privacy Policy
                    </h1>
                    <p className="text-gray-500 text-base mb-8">
                        Last Updated: January 2026 · Effective under DPDP Act 2023
                    </p>

                    {/* SUMMARY OF CHANGES — plain heading + paragraph */}
                    <section className="mb-12">
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">
                            Summary of changes
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            We work hard to make our use of personal data transparent and to make your rights and choices easy.
                            We added more details on how we train the models that support our products and services including those
                            using generative artificial intelligence, how long we keep your information, and changes to our
                            international data transfer mechanisms. If you are outside of the EEA, Switzerland, or the United Kingdom,
                            we’ve outlined how we may share data with partners to allow advertisers to reach you on other websites and apps.
                        </p>
                    </section>

                    {/* SCOPE — plain section */}
                    <section className="mb-12">
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">
                            Scope of the Privacy Policy
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-3">
                            This is AI Growthexa's global Privacy Policy. We have highlighted below where a particular section
                            applies to you based on where you live. For the purposes of the General Data Protection Regulation (“GDPR”),
                            if you are a resident in the EEA, Switzerland, and the UK, specific joint controllership arrangements apply.
                            AI Growthexa is the data fiduciary under the Digital Personal Data Protection Act, 2023 for Indian residents.
                        </p>
                        <p className="text-gray-700 text-sm bg-gray-50 p-4 -mx-4 sm:mx-0 sm:rounded-none border-l-4 border-gray-400">
                            <span className="font-semibold">Additional Info for EEA, Swiss and UK Data Subjects:</span> Legal bases we
                            rely on where we use your information — Consent, Contract, Legal obligation, Legitimate interests.
                            You have the right to access, correct, and withdraw consent.
                        </p>
                    </section>

                    {/* COLLECTION — three simple headings, no boxes */}
                    <section className="mb-12">
                        <h2 className="text-lg font-semibold text-gray-900 mb-5">
                            We collect information in a few different ways
                        </h2>

                        <h3 className="font-medium text-gray-900 mt-5 mb-2">
                            1. When you give it to us or give us permission to obtain it
                        </h3>
                        <p className="text-gray-700 mb-4">
                            Account Information: When you join our Services, we collect information like your name, email address,
                            birthday, gender, country of residence, your interests, and preferred language. If you have a business account,
                            depending on where you live, you may also have the option to add race and ethnicity information to your profile.
                            Content: We collect information when you save or upload Pins, photos, or other content, interact with Pins or
                            other content, or where you send messages and interact with other users. Precise location information:
                            Depending on where you live, you can choose to share your precise location using your device settings.
                            Your communications with us: If you contact us for customer support or otherwise communicate with us,
                            we collect the content of these communications. Your contacts: If you previously chose to sync your contacts
                            with your account, we will continue to process certain information about your contacts who are Pinterest users
                            to help you find one another on our Services.
                        </p>

                        <h3 className="font-medium text-gray-900 mt-6 mb-2">
                            2. We also get technical information when you use Pinterest
                        </h3>
                        <p className="text-gray-700 mb-4">
                            Device information: We collect information about the device you use to access our Services, including the
                            type of device, operating system, network service provider, settings, and unique device identifiers.
                            Log data: When you use our Services, our servers record information (“log data”), including information that
                            your browser automatically sends whenever you visit a website, or that your mobile app automatically sends
                            when you’re using it. This log data includes, for example, your Internet Protocol (IP) address, activities
                            on social media sites, and other information collected from your device.
                            Usage data and inferences: When you’re on our Services, we use your activity — such as which Pins you click on,
                            terms you search for, boards you create, and any text that you add in a comment or description — along with
                            other information you’ve provided when you first signed up and information from our partners and advertisers
                            to make inferences about you and your preferences. Location Information: We use your IP address to infer your
                            approximate location, even if you don’t choose to share your precise location, and photos you share may include
                            information about the location where they were taken. User Choices: We will keep a record of choices you’ve
                            selected in your settings, including privacy settings and whether you have enabled notifications.
                        </p>

                        <h3 className="font-medium text-gray-900 mt-6 mb-2">
                            3. Our partners and advertisers share information with us
                        </h3>
                        <p className="text-gray-700">
                            We also receive information about you and your activity outside Pinterest from our affiliates, advertisers,
                            partners and other third parties we work with. For example: Third party platforms: If you register for or
                            log into the Service using a third party platform (like Facebook or Google), they will furnish certain
                            information to us to facilitate your account creation or log-in with us. Technical service partners: We
                            sometimes receive information about you from technical service partners, including from marketing firms.
                            Advertisers or other partners: Online advertisers or third parties provide information to us about you to
                            measure, report on or improve the performance of ads on Pinterest, or to help us better understand what
                            kinds of ads to show you on Pinterest. You can control how we use this information to personalize your
                            experience and the ads you see on Pinterest in your Privacy and Data Settings.
                        </p>
                    </section>

                    {/* HOW WE USE INFO */}
                    <section className="mb-12">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            How we use the info we collect
                        </h2>
                        <p className="text-gray-700 mb-3">
                            We’re committed to showing you content that’s relevant, interesting and personal to you. To do that,
                            we use your information to provide and improve your experience, including to:
                        </p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
                            <li>Identify you when you use our Services.</li>
                            <li>Recommend Pins, boards, or content you might like based on your activity on our Services and your profile behavior. For example, if we see you’re into cooking-related ads or content on Pinterest, we may suggest food-related Pins to you.</li>
                            <li>Respond to your questions or comments.</li>
                            <li>Build your community on our Services. We use your info to suggest other people who have similar interests.</li>
                            <li>Measure performance of ads and marketing campaigns.</li>
                            <li>Comply with legal obligations and enforce agreements.</li>
                        </ul>
                        <p className="text-gray-600 text-sm italic">
                            You can control how we use this information to personalize your experience in your Privacy and Data Settings.
                        </p>
                    </section>

                    {/* ALL POLICY SECTIONS — pure headings and paragraphs, no cards */}
                    <section className="mt-16 space-y-10">
                        {policySections.map((section, idx) => (
                            <article key={idx} className="border-t border-gray-100 pt-6 first:border-0 first:pt-0">
                                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                                    {section.title}
                                </h2>
                                <div className="text-gray-700 space-y-3">
                                    {section.content}
                                </div>
                            </article>
                        ))}
                    </section>

                    {/* RIGHTS AND CHOICES */}
                    <section className="mt-16 border-t border-gray-200 pt-8">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Your Rights and Choices
                        </h2>
                        <p className="text-gray-700 mb-3">
                            Depending on where you live, you may have additional rights under applicable privacy laws.
                            If you are in the EEA, Switzerland, or the UK, you have rights under the GDPR. If you are in India,
                            you have rights under the Digital Personal Data Protection Act, 2023. These include the right to access,
                            correct, delete, and withdraw consent.
                        </p>
                        <p className="text-gray-700 mb-4">
                            To exercise your rights, please contact our Grievance Officer at{' '}
                            <span className="font-medium">support@aigrowthexa.com</span>.
                        </p>
                        <p className="text-gray-600 text-sm border-l-4 border-gray-300 pl-4 py-1">
                            <span className="font-medium">Cookie Notice:</span> For detailed information about how we use cookies,
                            please review our Cookie Policy. You may disable cookies through your browser settings.
                        </p>
                    </section>

                </article>
            </main>
        </>
    );
};

export default PrivacyInfo;
