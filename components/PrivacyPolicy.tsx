import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Shield, Calendar, Lock, Eye, Database, Globe } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import SEO from './SEO';

const M = motion as any;

const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Privacy Policy',
    url: 'https://appendlabs.com/privacy',
    description: 'Privacy Policy for AppendLabs. Learn how we collect, use, protect, and handle your personal information when you use our AI infrastructure services.',
    mainEntity: {
      '@type': 'PrivacyPolicy',
      name: 'AppendLabs Privacy Policy',
      datePublished: '2025-01-09',
      publisher: {
        '@type': 'Organization',
        name: 'AppendLabs',
        url: 'https://appendlabs.com'
      }
    }
  };

  return (
    <>
      <SEO
        title="Privacy Policy | AppendLabs"
        description="Privacy Policy for AppendLabs. Learn how we collect, use, protect, and handle your personal information when you use our AI infrastructure services. GDPR, CCPA, and PDPA compliant."
        keywords="privacy policy, AppendLabs privacy, data protection, GDPR compliance, CCPA compliance, data privacy, personal information protection, AI data privacy"
        canonical="https://appendlabs.com/privacy"
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-black text-white font-sans">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          {/* Header */}
          <M.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-6">
              <Shield className="w-8 h-8 text-white/60" />
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-white">
                Privacy Policy
              </h1>
            </div>
            <div className="flex items-center gap-2 text-sm text-brand-muted">
              <Calendar className="w-4 h-4" />
              <span>Last Updated: January 9, 2025</span>
            </div>
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-brand-muted leading-relaxed">
                At AppendLabs, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
            </div>
          </M.div>

          {/* Navigation */}
          <M.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12 flex flex-wrap gap-4"
          >
            <a
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-sm"
            >
              <Home className="w-4 h-4" />
              Home
            </a>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
          </M.div>

          {/* Content */}
          <M.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="prose prose-invert max-w-none space-y-8"
          >
            {/* Section 1 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-6 h-6 text-white/60" />
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-white border-b border-white/10 pb-3 flex-1">
                  1. Information We Collect
                </h2>
              </div>
              <div className="space-y-4 text-brand-muted leading-relaxed">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">1.1 Personal Information</h3>
                  <p>
                    We may collect personal information that you voluntarily provide to us when you:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                    <li>Register for an account or use our services</li>
                    <li>Fill out contact forms or request information</li>
                    <li>Subscribe to our newsletters or communications</li>
                    <li>Participate in surveys, contests, or promotions</li>
                    <li>Communicate with us via email, phone, or other channels</li>
                  </ul>
                  <p className="mt-3">
                    This information may include:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                    <li>Name and contact information (email address, phone number, mailing address)</li>
                    <li>Company name and job title</li>
                    <li>Payment and billing information (processed through secure third-party payment processors)</li>
                    <li>Account credentials and preferences</li>
                    <li>Any other information you choose to provide</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">1.2 Automatically Collected Information</h3>
                  <p>
                    When you visit our website or use our services, we automatically collect certain information about your device and usage patterns:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                    <li>IP address and location data</li>
                    <li>Browser type and version</li>
                    <li>Device information (operating system, device type)</li>
                    <li>Pages visited and time spent on pages</li>
                    <li>Referring website addresses</li>
                    <li>Clickstream data and navigation patterns</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">1.3 Data Provided Through AI Services</h3>
                  <p>
                    When you use our AI infrastructure services, we may process:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                    <li>Business data and documents you provide for processing</li>
                    <li>Conversation logs and interactions with AI systems</li>
                    <li>Usage metrics and performance data</li>
                    <li>Configuration and integration data</li>
                  </ul>
                  <p className="mt-3">
                    <strong className="text-white">Important:</strong> We do not use your data for training AI models without your explicit consent. Your business data remains secure and is processed according to our security protocols.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <Database className="w-6 h-6 text-white/60" />
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-white border-b border-white/10 pb-3 flex-1">
                  2. How We Use Your Information
                </h2>
              </div>
              <div className="space-y-3 text-brand-muted leading-relaxed">
                <p>
                  We use the information we collect for various purposes, including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong className="text-white">Service Delivery:</strong> To provide, maintain, and improve our AI infrastructure services</li>
                  <li><strong className="text-white">Communication:</strong> To respond to your inquiries, provide customer support, and send important service updates</li>
                  <li><strong className="text-white">Business Operations:</strong> To process transactions, manage accounts, and fulfill contractual obligations</li>
                  <li><strong className="text-white">Personalization:</strong> To customize and enhance your experience with our services</li>
                  <li><strong className="text-white">Analytics:</strong> To analyze usage patterns, diagnose technical issues, and improve our services</li>
                  <li><strong className="text-white">Marketing:</strong> To send promotional materials and newsletters (with your consent, and you can opt-out at any time)</li>
                  <li><strong className="text-white">Legal Compliance:</strong> To comply with legal obligations, enforce our Terms of Service, and protect our rights</li>
                  <li><strong className="text-white">Security:</strong> To detect, prevent, and address security threats and fraudulent activities</li>
                </ul>
              </div>
            </section>

            {/* Section 3 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-6 h-6 text-white/60" />
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-white border-b border-white/10 pb-3 flex-1">
                  3. Data Security and Protection
                </h2>
              </div>
              <div className="space-y-3 text-brand-muted leading-relaxed">
                <p>
                  We implement comprehensive security measures to protect your information:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong className="text-white">Encryption:</strong> Data transmission is encrypted using industry-standard SSL/TLS protocols</li>
                  <li><strong className="text-white">Access Controls:</strong> Strict access controls limit who can access your data within our organization</li>
                  <li><strong className="text-white">Secure Storage:</strong> Data is stored on secure servers with redundant backups and disaster recovery procedures</li>
                  <li><strong className="text-white">Air-Gapped Deployments:</strong> For sensitive data, we offer air-gapped deployments that keep your data within your VPC</li>
                  <li><strong className="text-white">Regular Audits:</strong> We conduct regular security assessments and vulnerability testing</li>
                  <li><strong className="text-white">Employee Training:</strong> Our team is trained on data protection and security best practices</li>
                </ul>
                <p className="mt-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <strong className="text-yellow-400">Note:</strong> While we implement strong security measures, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security but are committed to protecting your information to the best of our ability.
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-6 h-6 text-white/60" />
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-white border-b border-white/10 pb-3 flex-1">
                  4. Information Sharing and Disclosure
                </h2>
              </div>
              <div className="space-y-3 text-brand-muted leading-relaxed">
                <p>
                  We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                </p>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">4.1 Service Providers</h3>
                  <p>
                    We may share information with trusted third-party service providers who assist us in operating our business, such as:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                    <li>Cloud hosting and infrastructure providers (AWS, GCP, Azure)</li>
                    <li>Payment processing services</li>
                    <li>Email and communication services</li>
                    <li>Analytics and monitoring tools</li>
                    <li>Customer support platforms</li>
                  </ul>
                  <p className="mt-3">
                    These service providers are contractually obligated to protect your information and use it only for the purposes we specify.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">4.2 Legal Requirements</h3>
                  <p>
                    We may disclose your information if required by law or in response to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                    <li>Court orders, subpoenas, or legal processes</li>
                    <li>Government requests or regulatory requirements</li>
                    <li>Protection of our rights, property, or safety</li>
                    <li>Enforcement of our Terms of Service</li>
                    <li>Prevention of fraud or other illegal activities</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">4.3 Business Transfers</h3>
                  <p>
                    In the event of a merger, acquisition, reorganization, or sale of assets, your information may be transferred to the acquiring entity, subject to the same privacy protections outlined in this policy.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">4.4 With Your Consent</h3>
                  <p>
                    We may share your information with third parties when you explicitly consent to such sharing.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white border-b border-white/10 pb-3">
                5. Cookies and Tracking Technologies
              </h2>
              <div className="space-y-3 text-brand-muted leading-relaxed">
                <p>
                  We use cookies and similar tracking technologies to enhance your experience on our website:
                </p>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">5.1 Types of Cookies</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong className="text-white">Essential Cookies:</strong> Required for the website to function properly</li>
                    <li><strong className="text-white">Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
                    <li><strong className="text-white">Functional Cookies:</strong> Remember your preferences and settings</li>
                    <li><strong className="text-white">Marketing Cookies:</strong> Used to deliver relevant advertisements (with your consent)</li>
                  </ul>
                </div>
                <p>
                  You can control cookies through your browser settings. However, disabling certain cookies may limit your ability to use some features of our website.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white border-b border-white/10 pb-3">
                6. Data Retention
              </h2>
              <div className="space-y-3 text-brand-muted leading-relaxed">
                <p>
                  We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong className="text-white">Account Data:</strong> Retained while your account is active and for a reasonable period afterward</li>
                  <li><strong className="text-white">Service Data:</strong> Retained according to the terms of your service agreement</li>
                  <li><strong className="text-white">Legal Requirements:</strong> Some information may be retained longer to comply with legal obligations</li>
                  <li><strong className="text-white">Anonymized Data:</strong> We may retain anonymized, aggregated data indefinitely for analytics purposes</li>
                </ul>
                <p>
                  When we no longer need your personal information, we will securely delete or anonymize it in accordance with our data retention policies.
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white border-b border-white/10 pb-3">
                7. Your Rights and Choices
              </h2>
              <div className="space-y-3 text-brand-muted leading-relaxed">
                <p>
                  Depending on your location, you may have certain rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong className="text-white">Access:</strong> Request access to the personal information we hold about you</li>
                  <li><strong className="text-white">Correction:</strong> Request correction of inaccurate or incomplete information</li>
                  <li><strong className="text-white">Deletion:</strong> Request deletion of your personal information (subject to legal and contractual obligations)</li>
                  <li><strong className="text-white">Portability:</strong> Request transfer of your data to another service provider</li>
                  <li><strong className="text-white">Objection:</strong> Object to processing of your personal information for certain purposes</li>
                  <li><strong className="text-white">Restriction:</strong> Request restriction of processing in certain circumstances</li>
                  <li><strong className="text-white">Withdraw Consent:</strong> Withdraw consent for data processing where consent is the legal basis</li>
                  <li><strong className="text-white">Opt-Out:</strong> Opt-out of marketing communications at any time</li>
                </ul>
                <p className="mt-4">
                  To exercise these rights, please contact us at <a href="mailto:hello@appendlabs.com" className="text-white hover:text-white/80 underline underline-offset-4">hello@appendlabs.com</a>. We will respond to your request within a reasonable timeframe and in accordance with applicable law.
                </p>
              </div>
            </section>

            {/* Section 8 */}
            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white border-b border-white/10 pb-3">
                8. International Data Transfers
              </h2>
              <div className="space-y-3 text-brand-muted leading-relaxed">
                <p>
                  Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that differ from those in your country.
                </p>
                <p>
                  When we transfer data internationally, we ensure appropriate safeguards are in place, including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Standard contractual clauses approved by relevant data protection authorities</li>
                  <li>Adherence to internationally recognized data protection frameworks</li>
                  <li>Implementation of appropriate technical and organizational security measures</li>
                </ul>
                <p>
                  By using our services, you consent to the transfer of your information to countries outside your jurisdiction.
                </p>
              </div>
            </section>

            {/* Section 9 */}
            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white border-b border-white/10 pb-3">
                9. Children's Privacy
              </h2>
              <div className="space-y-3 text-brand-muted leading-relaxed">
                <p>
                  Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child without parental consent, we will take steps to delete that information promptly.
                </p>
                <p>
                  If you believe we have collected information from a child, please contact us immediately at <a href="mailto:hello@appendlabs.com" className="text-white hover:text-white/80 underline underline-offset-4">hello@appendlabs.com</a>.
                </p>
              </div>
            </section>

            {/* Section 10 */}
            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white border-b border-white/10 pb-3">
                10. Third-Party Links
              </h2>
              <div className="space-y-3 text-brand-muted leading-relaxed">
                <p>
                  Our website may contain links to third-party websites or services. We are not responsible for the privacy practices or content of these third-party sites. We encourage you to review the privacy policies of any third-party sites you visit.
                </p>
              </div>
            </section>

            {/* Section 11 */}
            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white border-b border-white/10 pb-3">
                11. Changes to This Privacy Policy
              </h2>
              <div className="space-y-3 text-brand-muted leading-relaxed">
                <p>
                  We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Posting the updated policy on our website with a new "Last Updated" date</li>
                  <li>Sending an email notification to registered users (for significant changes)</li>
                  <li>Displaying a prominent notice on our website</li>
                </ul>
                <p>
                  We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information. Your continued use of our services after any changes constitutes acceptance of the updated Privacy Policy.
                </p>
              </div>
            </section>

            {/* Section 12 */}
            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white border-b border-white/10 pb-3">
                12. Contact Us
              </h2>
              <div className="space-y-3 text-brand-muted leading-relaxed">
                <p>
                  If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-2">
                  <p className="text-white font-medium">AppendLabs</p>
                  <p>Email: <a href="mailto:hello@appendlabs.com" className="text-white hover:text-white/80 underline underline-offset-4">hello@appendlabs.com</a></p>
                  <p>Location: Bengaluru, Karnataka, India</p>
                  <p className="mt-4 text-sm">
                    For privacy-related inquiries, please include "Privacy Inquiry" in the subject line of your email.
                  </p>
                </div>
                <p>
                  We are committed to addressing your privacy concerns and will respond to your inquiries promptly and in accordance with applicable data protection laws.
                </p>
              </div>
            </section>

            {/* Section 13 */}
            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white border-b border-white/10 pb-3">
                13. Compliance with Data Protection Laws
              </h2>
              <div className="space-y-3 text-brand-muted leading-relaxed">
                <p>
                  We comply with applicable data protection laws, including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong className="text-white">GDPR (General Data Protection Regulation):</strong> For users in the European Economic Area</li>
                  <li><strong className="text-white">CCPA (California Consumer Privacy Act):</strong> For California residents</li>
                  <li><strong className="text-white">PDPA (Personal Data Protection Act):</strong> For applicable jurisdictions</li>
                  <li><strong className="text-white">IT Act 2000:</strong> For users in India</li>
                </ul>
                <p>
                  If you have a complaint about our data practices, you have the right to file a complaint with your local data protection authority.
                </p>
              </div>
            </section>
          </M.div>

          {/* Footer Navigation */}
          <M.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 pt-12 border-t border-white/10 flex flex-wrap gap-4"
          >
            <a
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-colors"
            >
              <Home className="w-4 h-4" />
              Return to Homepage
            </a>
            <a
              href="/terms"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
            >
              Terms of Service
            </a>
          </M.div>
        </div>
      </div>
      <Analytics />
      <SpeedInsights />
    </>
  );
};

export default PrivacyPolicy;

