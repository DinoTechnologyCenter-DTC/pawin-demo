import React from 'react';
import Animated from './Animated';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 py-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <Animated>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Terms of Service</h1>
          <p className="text-sm text-slate-500 mb-12 italic">Last Updated: March 24, 2026</p>
          
          <div className="space-y-10">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
              <p className="leading-relaxed">
                By accessing and using PAWIN PLC's platforms, services, and websites, you agree to comply with and be bound by the following terms and conditions. If you do not agree, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Use of Our Services</h2>
              <p className="leading-relaxed">
                You agree not to misuse our services. For example, do not interfere with our services or try to access them using a method other than the interface and instructions that we provide.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Intellectual Property</h2>
              <p className="leading-relaxed">
                All content on our website and platforms, including graphics, text, logos, and software, is the property of PAWIN PLC or its content suppliers and is protected by international copyright laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Limitation of Liability</h2>
              <p className="leading-relaxed">
                PAWIN PLC shall not be liable for any direct, indirect, incidental, special or consequential damages resulting from the use or inability to use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Modifications</h2>
              <p className="leading-relaxed">
                We reserve the right to change these terms from time to time as we see fit and your continued use of the site will signify your acceptance of any adjustment to these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Governing Law</h2>
              <p className="leading-relaxed">
                These terms are governed by the laws of the United Republic of Tanzania and any disputes will be subject to the exclusive jurisdiction of the Tanzanian courts.
              </p>
            </section>
          </div>
        </Animated>
      </div>
    </div>
  );
};

export default TermsOfService;
