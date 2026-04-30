import React from 'react';
import Animated from './Animated';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 py-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <Animated>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Privacy Policy</h1>
          <p className="text-sm text-slate-500 mb-12 italic">Last Updated: March 24, 2026</p>
          
          <div className="space-y-10">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
              <p className="leading-relaxed">
                Welcome to PAWIN PLC. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. The Data We Collect</h2>
              <p className="leading-relaxed">
                We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
              </p>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>Identity Data (name, username or similar identifier)</li>
                <li>Contact Data (email address and telephone numbers)</li>
                <li>Technical Data (IP address, browser type and version, time zone setting and location)</li>
                <li>Usage Data (information about how you use our website)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Data</h2>
              <p className="leading-relaxed">
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
              </p>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>To register you as a new member or partner.</li>
                <li>To manage our relationship with you.</li>
                <li>To improve our website, services, and marketing.</li>
                <li>To comply with a legal or regulatory obligation.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Data Security</h2>
              <p className="leading-relaxed">
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Contact Us</h2>
              <p className="leading-relaxed">
                If you have any questions about this privacy policy or our privacy practices, please contact us at: <a href="mailto:privacy@pawin.co.tz" className="text-[#ffae1f]">privacy@pawin.co.tz</a>
              </p>
            </section>
          </div>
        </Animated>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
