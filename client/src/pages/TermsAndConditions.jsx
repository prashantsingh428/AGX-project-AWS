import React, { useEffect } from 'react';

const TermsAndConditions = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            {/* MAIN CONTENT — pure headings and paragraphs, no boxes, no cards */}
            <main className="bg-white pt-8">
                <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

                    {/* MAIN TITLE */}
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-2">
                        Terms & Conditions Agreement
                    </h1>
                    <p className="text-gray-500 text-base mb-6">
                        Last Updated: January 2026
                    </p>

                    {/* PREAMBLE / INTRODUCTION */}
                    <p className="text-gray-700 leading-relaxed mb-8 border-b border-gray-100 pb-6">
                        This Terms & Conditions Agreement ("Agreement") governs the access to and use of the website,
                        platforms, digital properties, products, software, mobile applications, marketing services,
                        IT services, consulting services, and AI-driven growth solutions (collectively, the "Services")
                        provided by AI Growthexa. These Services may be delivered through our owned or operated websites,
                        applications, third‑party platforms, tools, integrations, communication channels, or client-managed
                        systems. By accessing our website, engaging our services, making a payment, or signing a proposal,
                        you agree to be legally bound by this Agreement under applicable laws of India.
                    </p>

                    {/* 1. ACCEPTANCE OF TERMS */}
                    <section className="mb-8">
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">
                            1. Acceptance of Terms
                        </h2>
                        <p className="text-gray-700 mb-2">
                            By accessing, browsing, registering, engaging, purchasing, subscribing to, or otherwise using any
                            part of AI Growthexa’s Services, you expressly acknowledge that you have read, understood, and
                            agreed to be legally bound by this Agreement and all applicable laws and regulations of India.
                        </p>
                        <p className="text-gray-700 mb-2">
                            This Agreement constitutes a legally binding electronic contract under the Information Technology
                            Act, 2000 and related rules. Continued use of our Services after updates or modifications constitutes
                            acceptance of the revised Agreement.
                        </p>
                        <p className="text-gray-700">
                            If you do not agree with any part of these Terms, you must immediately discontinue the use of our Services.
                        </p>
                    </section>

                    {/* 2. SCOPE OF SERVICES */}
                    <section className="mb-8">
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">
                            2. Scope of Services
                        </h2>
                        <p className="text-gray-700 mb-2">
                            AI Growthexa is a full‑stack Marketing, IT, and AI Growth Company providing strategic, technical,
                            and execution‑based services including but not limited to:
                        </p>
                        <ul className="list-disc pl-6 mb-3 text-gray-700 space-y-1">
                            <li>AI Marketing & LLM‑based Growth Systems</li>
                            <li>Performance Marketing (Google Ads, Meta Ads, LinkedIn Ads, YouTube Ads)</li>
                            <li>Search Engine Optimization (SEO) & Organic Growth Strategy</li>
                            <li>Funnel Architecture, Conversion Optimization & Automation</li>
                            <li>Branding Strategy, Visual Identity, Creative Design & Logo Development</li>
                            <li>Website Design, Development & Maintenance</li>
                            <li>Mobile Application Development (Android & iOS)</li>
                            <li>UX/UI Design & Product Experience Optimization</li>
                            <li>Content Strategy, Copywriting & Media Creation</li>
                            <li>Email Marketing, CRM Integration & WhatsApp Automation</li>
                            <li>Google Business Profile (GMB) Optimization with AI Models</li>
                            <li>E‑commerce Marketing & Marketplace Growth</li>
                            <li>Podcast Marketing & Media Distribution</li>
                            <li>Influencer Marketing & Brand Collaborations</li>
                            <li>Application Marketing & App Store Optimization (ASO)</li>
                            <li>Go‑To‑Market (GTM) & Market Entry Strategies</li>
                            <li>Marketing & Sales Alignment Systems</li>
                        </ul>
                        <p className="text-gray-700">
                            All services are provided based on mutually agreed proposals, quotations, agreements, or Statements
                            of Work (SOW). AI Growthexa reserves the right to modify, expand, suspend, or discontinue any service
                            at its discretion.
                        </p>
                    </section>

                    {/* 3. SERVICE NATURE & NO GUARANTEED RESULTS */}
                    <section className="mb-8">
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">
                            3. Service Nature & No Guaranteed Results
                        </h2>
                        <p className="text-gray-700">
                            AI Growthexa provides professional services based on industry experience, analytical insights, AI tools,
                            and strategic frameworks. However, the Client acknowledges that marketing, technology, and AI outcomes
                            are influenced by external factors including but not limited to market conditions, platform algorithms,
                            competition, budget constraints, and user behavior.
                        </p>
                        <p className="text-gray-700 mt-2">
                            Accordingly, AI Growthexa does not guarantee rankings, leads, conversions, revenue, profits, traffic volumes,
                            ad approvals, or business results. All projections or estimates shared are indicative only and shall not be
                            treated as assurances.
                        </p>
                    </section>

                    {/* 4. CLIENT RESPONSIBILITIES */}
                    <section className="mb-8">
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">
                            4. Client Responsibilities
                        </h2>
                        <p className="text-gray-700 mb-2">
                            The Client agrees to:
                        </p>
                        <ul className="list-disc pl-6 mb-2 text-gray-700">
                            <li>Provide accurate, lawful, and complete information, content, credentials, and approvals</li>
                            <li>Ensure ownership or legal rights over all materials shared with AI Growthexa</li>
                            <li>Review and approve deliverables within reasonable timelines</li>
                            <li>Maintain required access to ad accounts, domains, hosting, analytics, and tools</li>
                            <li>Comply with applicable laws, platform policies, and industry regulations</li>
                        </ul>
                        <p className="text-gray-700">
                            AI Growthexa shall not be responsible for delays, performance issues, or losses caused due to incomplete inputs,
                            delayed approvals, or misrepresentation by the Client.
                        </p>
                    </section>

                    {/* 5. PAYMENT TERMS & MILESTONES */}
                    <section className="mb-8">
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">
                            5. Payment Terms & Milestones
                        </h2>
                        <p className="text-gray-700 mb-2">
                            All fees are payable in advance and shall be made in Indian Rupees (INR) unless otherwise agreed in writing.
                        </p>
                        <p className="text-gray-700 mb-2 font-medium">
                            Standard Payment Structure:
                        </p>
                        <ul className="list-disc pl-6 mb-2 text-gray-700">
                            <li>50% Advance – Payable before project initiation</li>
                            <li>25% Mid‑Project – Upon completion of agreed milestone or phase</li>
                            <li>25% Final – Upon final delivery or closure of scope</li>
                        </ul>
                        <p className="text-gray-700">
                            Payments once made are non‑refundable. Failure to make payments on time may result in suspension,
                            withholding of deliverables, or termination of services without liability. AI Growthexa reserves the
                            right to charge late fees where applicable.
                        </p>
                    </section>

                    {/* 6. TAXES & COMPLIANCE */}
                    <section className="mb-8">
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">
                            6. Taxes & Compliance
                        </h2>
                        <p className="text-gray-700">
                            All fees are exclusive of applicable taxes. The Client agrees to bear GST or any other statutory taxes
                            as per Indian law.
                        </p>
                    </section>

                    {/* 7. INTELLECTUAL PROPERTY RIGHTS */}
                    <section className="mb-8">
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">
                            7. Intellectual Property Rights
                        </h2>
                        <p className="text-gray-700 mb-2">
                            All intellectual property, including but not limited to designs, code, creatives, strategies, AI models,
                            workflows, documentation, and marketing assets, shall remain the exclusive property of AI Growthexa until
                            full payment is received.
                        </p>
                        <p className="text-gray-700 mb-2">
                            Upon full and final payment, the Client is granted a limited, non‑exclusive, non‑transferable license to
                            use the deliverables for agreed business purposes only. AI Growthexa retains the right to reuse
                            non‑confidential methodologies, frameworks, and know‑how.
                        </p>
                        <p className="text-gray-700">
                            AI Growthexa may showcase completed work in portfolios, marketing materials, case studies, and presentations
                            unless restricted by a written NDA.
                        </p>
                    </section>

                    {/* 8. CONFIDENTIALITY */}
                    <section className="mb-8">
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">
                            8. Confidentiality
                        </h2>
                        <p className="text-gray-700">
                            Both parties agree to maintain strict confidentiality of proprietary, technical, commercial, and business
                            information exchanged during the engagement.
                        </p>
                    </section>

                    {/* 9. USE OF THIRD-PARTY TOOLS & PLATFORMS */}
                    <section className="mb-8">
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">
                            9. Use of Third-Party Tools & Platforms
                        </h2>
                        <p className="text-gray-700">
                            AI Growthexa may utilize third-party tools, APIs, platforms, or AI systems. We are not liable for service
                            disruptions, policy changes, or failures caused by third-party providers.
                        </p>
                    </section>

                    {/* 10. DATA PROTECTION & PRIVACY */}
                    <section className="mb-8">
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">
                            10. Data Protection & Privacy
                        </h2>
                        <p className="text-gray-700">
                            AI Growthexa follows reasonable security practices to protect client data. However, the Client acknowledges
                            that no digital system is 100% secure. Data handling shall be governed by our{' '}
                            <a href="/privacy-policy" className="text-primary underline underline-offset-2 hover:text-primary/80">Privacy Policy</a> and
                            applicable Indian IT laws.
                        </p>
                    </section>

                    {/* 11. TERM & TERMINATION */}
                    <section className="mb-8">
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">
                            11. Term & Termination
                        </h2>
                        <p className="text-gray-700 mb-2">
                            This Agreement shall commence on the date of first use or engagement and shall continue until terminated.
                        </p>
                        <p className="text-gray-700 mb-2">
                            AI Growthexa may terminate or suspend Services immediately if:
                        </p>
                        <ul className="list-disc pl-6 mb-2 text-gray-700">
                            <li>Payment obligations are not fulfilled</li>
                            <li>The Client breaches any provision of this Agreement</li>
                            <li>Unlawful, unethical, or misleading activities are identified</li>
                        </ul>
                        <p className="text-gray-700">
                            Upon termination, all outstanding dues become immediately payable. No refunds shall be issued for partially
                            completed or ongoing services.
                        </p>
                    </section>

                    {/* 12. LIMITATION OF LIABILITY */}
                    <section className="mb-8">
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">
                            12. Limitation of Liability
                        </h2>
                        <p className="text-gray-700 mb-2">
                            To the maximum extent permitted under Indian law, AI Growthexa shall not be liable for any indirect,
                            incidental, special, consequential, or punitive damages including loss of business, revenue, data,
                            goodwill, or reputation.
                        </p>
                        <p className="text-gray-700 mb-2">
                            AI Growthexa shall not be responsible for ad account suspensions, platform bans, algorithm updates,
                            policy changes, third‑party failures, or force majeure events.
                        </p>
                        <p className="text-gray-700">
                            In any event, AI Growthexa’s total cumulative liability shall not exceed the total fees paid by the
                            Client in the three (3) months preceding the claim.
                        </p>
                    </section>

                    {/* 13. INDEMNIFICATION */}
                    <section className="mb-8">
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">
                            13. Indemnification
                        </h2>
                        <p className="text-gray-700">
                            The Client agrees to indemnify and hold harmless AI Growthexa from any claims, losses, penalties, or
                            damages arising from:
                        </p>
                        <ul className="list-disc pl-6 mt-2 text-gray-700">
                            <li>Client-provided content</li>
                            <li>Violation of laws or third-party rights</li>
                            <li>Misuse of services</li>
                        </ul>
                    </section>

                    {/* 14. DISPUTE RESOLUTION, ARBITRATION & GOVERNING LAW */}
                    <section className="mb-8">
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">
                            14. Dispute Resolution, Arbitration & Governing Law
                        </h2>
                        <p className="text-gray-700 mb-2">
                            This Agreement shall be governed by and construed in accordance with the laws of India.
                        </p>
                        <p className="text-gray-700 mb-2">
                            Any dispute, controversy, or claim arising out of or relating to this Agreement shall be resolved by
                            arbitration under the Arbitration and Conciliation Act, 1996. The seat and venue of arbitration shall
                            be Delhi, India, and proceedings shall be conducted in English.
                        </p>
                        <p className="text-gray-700">
                            Subject to arbitration, courts at Delhi shall have exclusive jurisdiction.
                        </p>
                    </section>

                    {/* 15. FORCE MAJEURE */}
                    <section className="mb-8">
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">
                            15. Force Majeure
                        </h2>
                        <p className="text-gray-700">
                            AI Growthexa shall not be liable for delays or failures caused by events beyond reasonable control,
                            including natural disasters, government actions, internet failures, or platform outages.
                        </p>
                    </section>

                    {/* 16. AMENDMENTS */}
                    <section className="mb-8">
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">
                            16. Amendments
                        </h2>
                        <p className="text-gray-700">
                            AI Growthexa reserves the right to update these Terms at any time. Continued use of Services constitutes
                            acceptance of the revised terms.
                        </p>
                    </section>

                    {/* 17. ENTIRE AGREEMENT */}
                    <section className="mb-8">
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">
                            17. Entire Agreement
                        </h2>
                        <p className="text-gray-700">
                            This Agreement constitutes the entire understanding between the parties and supersedes all prior
                            communications, proposals, or agreements.
                        </p>
                    </section>

                    {/* 18. CONTACT INFORMATION */}
                    <section className="mb-12">
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">
                            18. Contact Information
                        </h2>
                        <p className="text-gray-700">
                            For legal or service-related queries, contact:
                        </p>
                        <p className="text-gray-700 mt-2">
                            Email: <span className="font-medium">support@aigrowthexa.com</span>
                        </p>
                        <p className="text-gray-600 text-sm mt-4 border-l-4 border-gray-300 pl-4 py-2 bg-gray-50 -mx-4 sm:mx-0 sm:bg-transparent sm:border-l-4 sm:pl-4">
                            By using AI Growthexa’s Services, you acknowledge that you have read, understood, and agreed to these Terms & Conditions.
                        </p>
                    </section>



                </article>
            </main>
        </>
    );
};

export default TermsAndConditions;
