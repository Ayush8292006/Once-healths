import React from 'react';
import { SEO } from '../components/SEO';
import { Link } from 'react-router-dom';

interface LegalPageProps {
  type: 'privacy' | 'terms' | 'disclaimer';
}

const legalContent = {
  privacy: {
    title: 'Privacy Policy',
    description: 'How ONCE HEALTH collects, uses, and protects your personal information.',
    lastUpdated: 'November 1, 2026',
    sections: [
      {
        heading: 'Information We Collect',
        content: 'This website is an informational and brand showcase only. We do not process any orders or payments directly. We may collect minimal analytics data (page views, session duration) through standard web analytics services to improve user experience. We do not collect personally identifiable information unless you voluntarily submit our contact form.',
      },
      {
        heading: 'Contact Form Data',
        content: 'When you submit our contact form, we collect your name, email address, and message content solely for the purpose of responding to your inquiry. This data is not sold or shared with third parties beyond what is required to facilitate our response.',
      },
      {
        heading: 'Amazon Purchases',
        content: 'All purchases are processed entirely through Amazon\'s platform. ONCE HEALTH does not receive, store, or process any payment card information or order details. Amazon\'s Privacy Notice governs all transactions made through their platform.',
      },
      {
        heading: 'Cookies',
        content: 'We may use essential session cookies to maintain basic site functionality. No cross-site tracking or advertising cookies are deployed on this site.',
      },
      {
        heading: 'Your Rights',
        content: 'You may request deletion of any personally identifiable information you submitted via our contact form by contacting us directly. We will honor such requests promptly.',
      },
      {
        heading: 'Changes to This Policy',
        content: 'We reserve the right to update this policy at any time. Material changes will be reflected in the "Last Updated" date above.',
      },
    ],
  },
  terms: {
    title: 'Terms of Service',
    description: 'Terms and conditions for using the ONCE HEALTH website.',
    lastUpdated: 'November 1, 2026',
    sections: [
      {
        heading: 'Acceptance of Terms',
        content: 'By accessing this website, you agree to these Terms of Service. This website is operated by ONCE HEALTH for informational and brand presentation purposes only.',
      },
      {
        heading: 'No Direct Sales',
        content: 'ONCE HEALTH does not process orders, handle payments, or manage customer service for product fulfillment through this website. All purchases are made through Amazon and governed by Amazon\'s Conditions of Use.',
      },
      {
        heading: 'Intellectual Property',
        content: 'All content on this website—including text, graphics, brand assets, and product imagery—is the exclusive property of ONCE HEALTH and may not be reproduced, distributed, or used without express written permission.',
      },
      {
        heading: 'Disclaimer of Warranties',
        content: 'This website is provided "as is" without warranties of any kind. While we strive for accuracy, product information and claims are subject to change. Always refer to the current product label for the most accurate information.',
      },
      {
        heading: 'Health Disclaimer',
        content: 'Content on this website is for informational purposes only and does not constitute medical advice. These statements have not been evaluated by the FDA. Always consult a qualified healthcare provider before starting any supplement regimen.',
      },
      {
        heading: 'Limitation of Liability',
        content: 'ONCE HEALTH shall not be liable for any indirect, incidental, or consequential damages arising from the use of this website or reliance on its content.',
      },
    ],
  },
  disclaimer: {
    title: 'Health Disclaimer',
    description: 'Important health and safety information about ONCE HEALTH dietary supplements.',
    lastUpdated: 'November 1, 2026',
    sections: [
      {
        heading: 'FDA Statement',
        content: '* These statements have not been evaluated by the Food and Drug Administration. ONCE HEALTH products are not intended to diagnose, treat, cure, or prevent any disease or health condition.',
      },
      {
        heading: 'Not a Substitute for Medical Care',
        content: 'Dietary supplements are not a substitute for a balanced diet or professional medical care. ONCE HEALTH products are intended to complement, not replace, a nutritious diet and healthy lifestyle.',
      },
      {
        heading: 'Consult Your Healthcare Provider',
        content: 'Consult your physician, pharmacist, or qualified healthcare professional before beginning any dietary supplement program, especially if you are pregnant, nursing, taking prescription medications, or have a known medical condition.',
      },
      {
        heading: 'Individual Results Vary',
        content: 'Supplement effects are highly individual and depend on factors including age, diet, lifestyle, genetics, and baseline micronutrient status. No specific health outcome is guaranteed.',
      },
      {
        heading: 'Keep Out of Reach of Children',
        content: 'These products are intended for adult use only. Keep all dietary supplements out of reach of children. In case of accidental overdose, contact a physician or Poison Control Center immediately.',
      },
      {
        heading: 'Allergen Notice',
        content: 'The label states 0 gluten and 0 dairy. Other ingredients are hypromellose, stearic acid, L-leucine, rice flour and silica. Review the current product label for complete ingredient information.',
      },
    ],
  },
};

const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  const content = legalContent[type];

  return (
    <>
      <SEO title={content.title} description={content.description} />

      <section className="pt-32 pb-24 bg-bg">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <div className="mb-10">
            <Link to="/" className="text-xs text-ink-muted hover:text-ink transition-colors mb-6 inline-block">
              ← Back to Home
            </Link>
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-ink tracking-tight mb-2">
              {content.title}
            </h1>
            <p className="text-xs text-ink-muted">Last Updated: {content.lastUpdated}</p>
          </div>

          <div className="prose prose-sm max-w-none space-y-8">
            {content.sections.map((section) => (
              <div key={section.heading} className="pb-6 border-b border-line/60">
                <h2 className="text-lg font-heading font-bold text-ink mb-3">{section.heading}</h2>
                <p className="text-sm text-ink-muted leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-surface border border-line rounded-2xl text-sm text-ink-muted">
            <strong className="text-ink block mb-1">Questions about this policy?</strong>
            <Link to="/contact" className="underline hover:text-ink transition-colors">
              Contact our team →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default LegalPage;

