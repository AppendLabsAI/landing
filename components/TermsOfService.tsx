import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, FileText, Calendar } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import SEO from './SEO';

const M = motion as any;

const TermsOfService: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Terms of Service',
    url: 'https://appendlabs.com/terms',
    description: 'Terms of Service for AppendLabs AI infrastructure and intelligent automation services. Read our terms and conditions for using our AI services.',
    mainEntity: {
      '@type': 'LegalDocument',
      name: 'Terms of Service',
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
        title="Terms of Service | AppendLabs"
        description="Terms of Service for AppendLabs AI infrastructure and intelligent automation services. Read our terms and conditions for using our AI services, including service agreements, data handling, and user obligations."
        keywords="terms of service, AppendLabs terms, AI services terms, service agreement, terms and conditions, legal terms, AI infrastructure terms"
        canonical="https://appendlabs.com/terms"
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
              <FileText className="w-8 h-8 text-white/60" />
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-white">
                Terms of Service
              </h1>
            </div>
            <div className="flex items-center gap-2 text-sm text-brand-muted">
              <Calendar className="w-4 h-4" />
              <span>Last Updated: January 9, 2025</span>
            </div>
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-brand-muted leading-relaxed">
                Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the AppendLabs website and services (the "Service") operated by AppendLabs ("us", "we", or "our").
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
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white border-b border-white/10 pb-3">
                1. Acceptance of Terms
              </h2>
              <div className="space-y-3 text-brand-muted leading-relaxed">
                <p>
                  By accessing and using AppendLabs' website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these Terms of Service, you must not access or use our services.
                </p>
                <p>
                  These Terms apply to all visitors, users, and others who access or use the Service. By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white border-b border-white/10 pb-3">
                2. Description of Services
              </h2>
              <div className="space-y-3 text-brand-muted leading-relaxed">
                <p>
                  AppendLabs provides AI infrastructure services, including but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Operational Intelligence Systems</li>
                  <li>AI Agents as a Service</li>
                  <li>RAG (Retrieval-Augmented Generation) Based Chatbots</li>
                  <li>Model Context Protocol (MCP) Services</li>
                  <li>Internal AI and Automation Tools</li>
                  <li>Cloud Development Services</li>
                  <li>Omnichannel Integration Services</li>
                  <li>Custom AI Solutions and Consulting</li>
                </ul>
                <p>
                  We reserve the right to modify, suspend, or discontinue any aspect of our services at any time, with or without notice. We do not guarantee that our services will be available at all times or that they will be error-free.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white border-b border-white/10 pb-3">
                3. User Obligations
              </h2>
              <div className="space-y-3 text-brand-muted leading-relaxed">
                <p>
                  You agree to use our services only for lawful purposes and in accordance with these Terms. You agree not to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Use the Service in any way that violates any applicable national or international law or regulation</li>
                  <li>Transmit, or procure the sending of, any advertising or promotional material without our prior written consent</li>
                  <li>Impersonate or attempt to impersonate AppendLabs, an AppendLabs employee, another user, or any other person or entity</li>
                  <li>Engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Service, or which may harm AppendLabs or users of the Service</li>
                  <li>Use the Service in any manner that could disable, overburden, damage, or impair the Service</li>
                  <li>Use any robot, spider, or other automatic device, process, or means to access the Service</li>
                  <li>Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the Service</li>
                </ul>
              </div>
            </section>

            {/* Section 4 */}
            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white border-b border-white/10 pb-3">
                4. Intellectual Property Rights
              </h2>
              <div className="space-y-3 text-brand-muted leading-relaxed">
                <p>
                  The Service and its original content, features, and functionality are and will remain the exclusive property of AppendLabs and its licensors. The Service is protected by copyright, trademark, and other laws. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.
                </p>
                <p>
                  All content, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, data compilations, and software, is the property of AppendLabs or its content suppliers and is protected by international copyright laws.
                </p>
                <p>
                  You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Service without our prior written consent.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white border-b border-white/10 pb-3">
                5. Data and Privacy
              </h2>
              <div className="space-y-3 text-brand-muted leading-relaxed">
                <p>
                  Your use of our Service is also governed by our Privacy Policy. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices regarding the collection and use of your personal information.
                </p>
                <p>
                  When you provide data to us in connection with our services, you grant AppendLabs a license to use, process, and store such data as necessary to provide our services. We implement industry-standard security measures to protect your data, including encryption and secure data transmission protocols.
                </p>
                <p>
                  We do not use your data for training AI models without explicit consent. Data used in AI systems is processed according to our security protocols and data handling procedures outlined in our Privacy Policy.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white border-b border-white/10 pb-3">
                6. Service Level Agreements and Warranties
              </h2>
              <div className="space-y-3 text-brand-muted leading-relaxed">
                <p>
                  AppendLabs strives to provide reliable, secure, and cost-optimized AI infrastructure services. However, we make no warranties, expressed or implied, regarding:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>The availability, reliability, or performance of our services</li>
                  <li>The accuracy or completeness of any information provided through our services</li>
                  <li>That our services will meet your specific requirements or expectations</li>
                  <li>That any errors or defects will be corrected</li>
                </ul>
                <p>
                  Our services are provided "as is" and "as available" without any warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
                </p>
                <p>
                  Service Level Agreements (SLAs) may be provided for specific services under separate written agreements. Standard services do not include specific uptime guarantees unless explicitly stated in a signed service agreement.
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white border-b border-white/10 pb-3">
                7. Limitation of Liability
              </h2>
              <div className="space-y-3 text-brand-muted leading-relaxed">
                <p>
                  To the fullest extent permitted by applicable law, AppendLabs shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Your use or inability to use the Service</li>
                  <li>Any conduct or content of third parties on the Service</li>
                  <li>Any unauthorized access to or use of our servers and/or any personal information stored therein</li>
                  <li>Any interruption or cessation of transmission to or from the Service</li>
                  <li>Any bugs, viruses, trojan horses, or the like that may be transmitted to or through the Service by any third party</li>
                  <li>Any errors or omissions in any content or for any loss or damage incurred as a result of the use of any content posted, emailed, transmitted, or otherwise made available through the Service</li>
                </ul>
                <p>
                  In no event shall AppendLabs' total liability to you for all damages exceed the amount you paid to AppendLabs in the twelve (12) months preceding the claim, or one hundred dollars ($100), whichever is greater.
                </p>
              </div>
            </section>

            {/* Section 8 */}
            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white border-b border-white/10 pb-3">
                8. Indemnification
              </h2>
              <div className="space-y-3 text-brand-muted leading-relaxed">
                <p>
                  You agree to defend, indemnify, and hold harmless AppendLabs and its licensee and licensors, and their employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees), resulting from or arising out of:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Your use and access of the Service, by you or any person using your account and password</li>
                  <li>A breach of these Terms</li>
                  <li>Your violation of any third party right, including without limitation any copyright, property, or privacy right</li>
                  <li>Any claim that your use of the Service caused damage to a third party</li>
                </ul>
              </div>
            </section>

            {/* Section 9 */}
            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white border-b border-white/10 pb-3">
                9. Termination
              </h2>
              <div className="space-y-3 text-brand-muted leading-relaxed">
                <p>
                  We may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                </p>
                <p>
                  Upon termination, your right to use the Service will cease immediately. If you wish to terminate your account, you may simply discontinue using the Service or contact us to request account deletion.
                </p>
                <p>
                  All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
                </p>
              </div>
            </section>

            {/* Section 10 */}
            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white border-b border-white/10 pb-3">
                10. Governing Law
              </h2>
              <div className="space-y-3 text-brand-muted leading-relaxed">
                <p>
                  These Terms shall be interpreted and governed by the laws of India, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                </p>
                <p>
                  If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have between us regarding the Service.
                </p>
                <p>
                  Any disputes arising out of or relating to these Terms or the Service shall be resolved through arbitration in accordance with the Arbitration and Conciliation Act, 2015, in Bengaluru, Karnataka, India.
                </p>
              </div>
            </section>

            {/* Section 11 */}
            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white border-b border-white/10 pb-3">
                11. Changes to Terms
              </h2>
              <div className="space-y-3 text-brand-muted leading-relaxed">
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                </p>
                <p>
                  By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.
                </p>
                <p>
                  We encourage you to review these Terms periodically. The date of the last update is indicated at the top of this document.
                </p>
              </div>
            </section>

            {/* Section 12 */}
            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white border-b border-white/10 pb-3">
                12. Contact Information
              </h2>
              <div className="space-y-3 text-brand-muted leading-relaxed">
                <p>
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-2">
                  <p className="text-white font-medium">AppendLabs</p>
                  <p>Email: <a href="mailto:hello@appendlabs.com" className="text-white hover:text-white/80 underline underline-offset-4">hello@appendlabs.com</a></p>
                  <p>Location: Bengaluru, Karnataka, India</p>
                </div>
                <p>
                  For legal notices, please send correspondence to the email address above with "Legal Notice" in the subject line.
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
              href="/privacy"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
            >
              Privacy Policy
            </a>
          </M.div>
        </div>
      </div>
      <Analytics />
      <SpeedInsights />
    </>
  );
};

export default TermsOfService;

