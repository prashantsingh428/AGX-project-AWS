import React, { useEffect } from 'react';

const CopyrightInfo = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            {/* MAIN CONTENT — pure headings and paragraphs, no boxes, no cards */}
            <main className="bg-white">
                <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

                    {/* MAIN TITLE */}
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-2">
                        Copyright Notice & Intellectual Property Policy
                    </h1>
                    <p className="text-gray-500 text-base mb-8 border-b border-gray-100 pb-6">
                        Last Updated: January 2026
                    </p>

                    {/* OVERVIEW */}
                    <section className="mb-10">
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">
                            Overview
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-3">
                            AI Growthexa respects the intellectual property rights of others and expects all users, clients,
                            partners, and visitors to do the same. We do not permit copyright infringement or misuse of
                            intellectual property on our website, platforms, applications, or any services operated by
                            AI Growthexa.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            All original content, including but not limited to text, graphics, logos, designs, software code,
                            AI models, dashboards, reports, strategies, videos, and documentation available on the AI Growthexa
                            website or shared during service delivery, is protected under applicable copyright, trademark, and
                            intellectual property laws of India.
                        </p>
                    </section>

                    {/* COPYRIGHT INFRINGEMENT POLICY */}
                    <section className="mb-10">
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">
                            Copyright Infringement Policy
                        </h2>
                        <p className="text-gray-700 mb-2">
                            AI Growthexa will respond promptly to valid notices of alleged copyright infringement and may remove
                            or disable access to content that is found to infringe intellectual property rights. In appropriate
                            circumstances, AI Growthexa reserves the right to suspend or terminate accounts of repeat infringers.
                        </p>
                        <p className="text-gray-700">
                            If you believe that any material available on our website or through our services infringes your
                            copyright, you may submit a Copyright Infringement Notice as outlined below.
                        </p>
                    </section>

                    {/* HOW TO SUBMIT A COPYRIGHT INFRINGEMENT NOTICE */}
                    <section className="mb-10">
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">
                            How to Submit a Copyright Infringement Notice
                        </h2>
                        <p className="text-gray-700 mb-2">
                            To file a copyright infringement claim, please provide a written notice containing the following information:
                        </p>
                        <ul className="list-disc pl-6 mb-3 text-gray-700 space-y-1">
                            <li>A physical or electronic signature of the copyright owner or a person authorized to act on behalf of the copyright owner.</li>
                            <li>A clear description of the copyrighted work you claim has been infringed.</li>
                            <li>A precise description of where the allegedly infringing material is located on the AI Growthexa website, including the specific URL or identifiable reference.</li>
                            <li>Your full name, mailing address, telephone number, and valid email address.</li>
                            <li>A statement that you have a good-faith belief that the disputed use of the material is not authorized by the copyright owner, its agent, or the law.</li>
                            <li>A statement, made under penalty of perjury under applicable Indian law, that the information provided in your notice is accurate and that you are the copyright owner or authorized to act on the copyright owner's behalf.</li>
                        </ul>
                        <p className="text-gray-700 mt-4">
                            All copyright notices should be sent to:
                        </p>
                        <p className="text-gray-700 mt-1">
                            <span className="font-medium">Copyright Officer – AI Growthexa</span>
                            <br />
                            Email: <span className="font-medium">support@aigrowthexa.com</span>
                        </p>
                    </section>

                    {/* COPYRIGHT COUNTER-NOTIFICATION */}
                    <section className="mb-10">
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">
                            Copyright Counter-Notification
                        </h2>
                        <p className="text-gray-700 mb-2">
                            If you believe that content you submitted was removed or disabled in error, or that it does not infringe
                            any copyright, you may submit a Counter-Notification.
                        </p>
                        <p className="text-gray-700 mb-2">
                            Your counter-notification must include:
                        </p>
                        <ul className="list-disc pl-6 mb-3 text-gray-700 space-y-1">
                            <li>Your physical or electronic signature.</li>
                            <li>Identification of the content that has been removed or disabled and the location where the content appeared before removal.</li>
                            <li>A statement under penalty of perjury that you have a good-faith belief that the content was removed or disabled as a result of a mistake or misidentification.</li>
                            <li>Your name, address, telephone number, and email address.</li>
                            <li>A statement consenting to the jurisdiction of the competent courts in India.</li>
                        </ul>
                        <p className="text-gray-700">
                            Upon receipt of a valid counter-notification, AI Growthexa may forward the information to the original complainant.
                            Restoration of the content, if any, will be at the sole discretion of AI Growthexa and subject to applicable law.
                        </p>
                    </section>

                    {/* REPEAT INFRINGERS */}
                    <section className="mb-10">
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">
                            Repeat Infringers
                        </h2>
                        <p className="text-gray-700">
                            AI Growthexa reserves the right to permanently restrict access, terminate services, or take legal action against
                            users or entities that repeatedly infringe upon intellectual property rights.
                        </p>
                    </section>

                    {/* OWNERSHIP OF AI GROWTHEXA CONTENT */}
                    <section className="mb-10">
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">
                            Ownership of AI Growthexa Content
                        </h2>
                        <p className="text-gray-700 mb-2">
                            Unless explicitly stated otherwise:
                        </p>
                        <ul className="list-disc pl-6 mb-2 text-gray-700">
                            <li>All website content is owned by AI Growthexa.</li>
                            <li>No content may be copied, reproduced, republished, uploaded, posted, transmitted, or distributed without prior written consent.</li>
                            <li>Use of our content for commercial purposes without authorization is strictly prohibited.</li>
                        </ul>
                    </section>

                    {/* LEGAL COMPLIANCE */}
                    <section className="mb-10">
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">
                            Legal Compliance
                        </h2>
                        <p className="text-gray-700 mb-2">
                            This Copyright Policy is governed by and interpreted in accordance with:
                        </p>
                        <ul className="list-disc pl-6 mb-2 text-gray-700">
                            <li>The Copyright Act, 1957 (India)</li>
                            <li>The Information Technology Act, 2000</li>
                            <li>Applicable rules, amendments, and judicial interpretations in force within India</li>
                        </ul>
                        <p className="text-gray-700">
                            Any disputes arising under this policy shall be subject to the exclusive jurisdiction of courts located in India.
                        </p>
                    </section>

                    {/* POLICY UPDATES */}
                    <section className="mb-10">
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">
                            Policy Updates
                        </h2>
                        <p className="text-gray-700">
                            AI Growthexa may update this Copyright Notice from time to time without prior notice. Continued use of our
                            website or services after such changes constitutes acceptance of the revised policy.
                        </p>
                        <p className="text-gray-500 text-sm mt-2">
                            Last Updated: January 2026
                        </p>
                    </section>

                    {/* CONTACT INFORMATION — consolidated */}
                    <section className="mb-12 border-t border-gray-100 pt-8">
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">
                            Contact Information
                        </h2>
                        <p className="text-gray-700">
                            For copyright-related inquiries or to submit a notice, please contact:
                        </p>
                        <p className="text-gray-700 mt-2">
                            <span className="font-medium">Copyright Officer – AI Growthexa</span>
                            <br />
                            Email: <span className="font-medium">support@aigrowthexa.com</span>
                        </p>
                        <p className="text-gray-600 text-sm mt-4 border-l-4 border-gray-300 pl-4 py-2 bg-gray-50 -mx-4 sm:mx-0 sm:bg-transparent sm:border-l-4 sm:pl-4">
                            ⚖️ This Copyright Notice is effective as of January 2026 and supersedes all prior versions.
                        </p>
                    </section>


                </article>
            </main>
        </>
    );
};

export default CopyrightInfo;
