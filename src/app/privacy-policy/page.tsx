'use client';

import Link from 'next/link';

const LAST_UPDATED = 'April 2, 2026';

const sections = [
  {
    id: 'introduction',
    title: '1. Introduction',
    content: `Sosika ("we", "our", or "us") operates the Sosika website and mobile application (collectively, the "Platform"). We are committed to protecting your personal information and being transparent about how we collect and use it.

This Privacy Policy explains what data we collect, why we collect it, how it is used, and your rights regarding that data. By using the Platform, you agree to the practices described in this policy.

If you have questions or concerns about this policy, please contact us at sosika.app@gmail.com.`,
  },
  {
    id: 'data-collected',
    title: '2. Information We Collect',
    content: `We collect information in the following ways:

**Information you provide directly**
When you create an account, place an order, submit a partner or rider application, or contact us, you may provide us with:
— Full name, phone number, and email address
— Delivery address and location preferences
— Payment method details (processed securely via third-party providers)
— Vehicle type and availability (for rider applicants)
— Messages sent to our support or partnerships team

**Information collected automatically**
When you visit or interact with our Platform, we automatically collect certain technical and behavioural data, including:
— Pages viewed and time spent on each page
— Button clicks and navigation actions
— Form submissions and completion rates
— Device type, operating system, and browser
— IP address and approximate geographic location
— Referral source (how you arrived at our site)

**Information from third parties**
We may receive information about you from third-party services we use, such as analytics providers, payment processors, or mapping services, in accordance with their respective privacy policies.`,
  },
  {
    id: 'tracking',
    title: '3. Tracking & Analytics',
    content: `We use tracking technologies to understand how visitors use our Platform and to improve the experience for everyone. Specifically, we track:

**Page views** — We record which pages are visited, in what order, and how long users spend on each page. This helps us understand which content is most valuable and where users drop off.

**Button clicks** — We track interactions with buttons, links, and calls-to-action (such as "Order Now", "Apply as Rider", or "Submit") to understand which features are being used and to optimise the layout and design of our pages.

**Form submissions** — We monitor when forms are started, completed, or abandoned. This includes the rider application form, partnership enquiry form, and order-related flows. We do not log the content of form fields for analytics purposes — only whether a submission occurred.

**Session data** — We collect anonymous session-level data including device type, browser, screen size, and operating system to ensure the Platform functions correctly across different environments.

We use this data exclusively for internal product improvement and do not sell behavioural analytics to third parties.`,
  },
  {
    id: 'cookies',
    title: '4. Cookies & Similar Technologies',
    content: `We use cookies and similar tracking technologies (such as local storage and session tokens) to operate and improve our Platform.

**Essential cookies** — Required for the Platform to function. These include session management, authentication tokens, and security features. You cannot opt out of these without ceasing to use the Platform.

**Analytics cookies** — Used to collect aggregated, anonymised data about how users interact with our pages. These help us measure performance and identify areas for improvement.

**Preference cookies** — Used to remember your settings and preferences across visits.

You can manage cookie preferences through your browser settings. Disabling analytics cookies will not affect your ability to use core features of the Platform, but may limit our ability to improve your experience over time.`,
  },
  {
    id: 'how-we-use',
    title: '5. How We Use Your Information',
    content: `We use the information we collect to:

— Process and fulfil your delivery orders
— Communicate with you about your orders, account, or applications
— Review and process rider and vendor partnership applications
— Improve and personalise the Platform experience
— Analyse usage trends and optimise page performance
— Detect and prevent fraud, abuse, or security incidents
— Comply with legal obligations and respond to lawful requests
— Send service-related notifications (we do not send unsolicited marketing without your explicit consent)

We do not use your personal data for automated decision-making or profiling in ways that produce legal or similarly significant effects without your knowledge.`,
  },
  {
    id: 'sharing',
    title: '6. Sharing Your Information',
    content: `We do not sell your personal information. We may share your data with third parties only in the following circumstances:

**Service providers** — We work with trusted third-party companies who help us operate the Platform, including cloud hosting providers, payment processors, mapping and routing services, and customer communication tools. These providers are contractually required to protect your data and may only use it for the purposes we specify.

**Delivery partners and vendors** — To fulfil your orders, we share necessary information (such as your name, delivery address, and order details) with the relevant merchant and rider handling your delivery.

**Legal compliance** — We may disclose your information when required to do so by law, court order, or government authority, or where we believe disclosure is necessary to protect the rights, safety, or property of Sosika or others.

**Business transfers** — In the event of a merger, acquisition, or sale of assets, your data may be transferred as part of that transaction. We will notify you before your data becomes subject to a different privacy policy.

We do not share your personal data with advertisers or data brokers.`,
  },
  {
    id: 'data-retention',
    title: '7. Data Retention',
    content: `We retain your personal information for as long as necessary to fulfil the purposes described in this policy, or as required by applicable law.

— **Account data** is retained for the duration of your account and for up to 2 years after account deletion, to comply with legal and tax obligations.
— **Order data** is retained for up to 5 years for regulatory and dispute resolution purposes.
— **Application data** (rider or vendor applications) is retained for 12 months after a decision is made, whether approved or declined.
— **Analytics data** is stored in aggregated, anonymised form and may be retained indefinitely, as it cannot be used to identify you.

You may request deletion of your personal data at any time (see Section 9).`,
  },
  {
    id: 'security',
    title: '8. Data Security',
    content: `We take reasonable technical and organisational measures to protect your personal information against unauthorised access, loss, or misuse. These include:

— Encryption of data in transit using TLS (HTTPS)
— Restricted access to personal data on a need-to-know basis
— Regular review of our data handling practices
— Use of reputable third-party providers with strong security certifications

No method of transmission over the internet or electronic storage is completely secure. While we strive to protect your data, we cannot guarantee absolute security. In the event of a data breach that affects your rights, we will notify you as required by applicable law.`,
  },
  {
    id: 'your-rights',
    title: '9. Your Rights',
    content: `You have the following rights regarding your personal data:

**Access** — You may request a copy of the personal data we hold about you.

**Correction** — You may request that we correct inaccurate or incomplete information.

**Deletion** — You may request that we delete your personal data, subject to legal retention requirements.

**Restriction** — You may request that we limit how we process your data in certain circumstances.

**Portability** — You may request your data in a structured, machine-readable format.

**Objection** — You may object to certain types of processing, including analytics tracking.

To exercise any of these rights, please contact us at sosika.app@gmail.com. We will respond within 30 days. We may need to verify your identity before processing your request.`,
  },
  {
    id: 'children',
    title: '10. Children\'s Privacy',
    content: `The Sosika Platform is not directed at individuals under the age of 18. We do not knowingly collect personal data from children. If you believe a minor has provided us with personal information without parental consent, please contact us at sosika.app@gmail.com and we will take prompt steps to delete that information.`,
  },
  {
    id: 'third-party',
    title: '11. Third-Party Links',
    content: `Our Platform may contain links to third-party websites or services. This Privacy Policy does not apply to those external sites. We encourage you to review the privacy policies of any third-party services you visit. We are not responsible for the content or privacy practices of external sites.`,
  },
  {
    id: 'changes',
    title: '12. Changes to This Policy',
    content: `We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. When we do, we will update the "Last updated" date at the top of this page and, where appropriate, notify you via email or an in-app notice.

We encourage you to review this policy periodically. Continued use of the Platform after changes take effect constitutes your acceptance of the updated policy.`,
  },
  {
    id: 'contact',
    title: '13. Contact Us',
    content: `If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your data, please reach out to us:

**Email:** sosika.app@gmail.com
**General enquiries:** sosika.app@gmail.com
**Address:** Arusha, Tanzania

We are committed to resolving any concerns promptly and transparently.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="w-full bg-[#f8fafa] text-[#1a1a1a]">

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <section className="bg-[#1a1a1a] md:mt-18 py-20 relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(41,217,213,0.12) 0%, transparent 70%)' }}
        />
        <div className="max-w-4xl mx-auto px-6 md:px-16">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-[#29d9d5] mb-4">
            Legal
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-400 text-sm">
            Last updated: <span className="text-gray-300 font-semibold">{LAST_UPDATED}</span>
          </p>
        </div>
      </section>

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-6 md:px-16 py-16 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-14 items-start">

        {/* Sidebar nav — sticky on desktop */}
        <nav className="hidden lg:block sticky top-28 self-start" aria-label="Privacy policy sections">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Contents</p>
          <ol className="space-y-1">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="block text-xs text-gray-500 hover:text-[#29d9d5] py-1 transition-colors duration-200 leading-snug"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ol>

          <div className="mt-10 pt-6 border-t border-gray-200">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Questions?</p>
            <a
              href="mailto:sosika.app@gmail.com"
              className="text-xs text-[#29d9d5] hover:underline"
            >
              sosika.app@gmail.com
            </a>
          </div>
        </nav>

        {/* Main content */}
        <article className="min-w-0">

          {/* Intro callout */}
          <div className="bg-[#29d9d5]/8 border border-[#29d9d5]/20 rounded-2xl px-6 py-5 mb-12">
            <p className="text-sm text-[#1a1a1a] leading-relaxed">
              <strong>Summary:</strong> Sosika collects personal information to operate its delivery
              platform and tracks interactions such as page views, button clicks, and form submissions
              to improve the user experience. We do not sell your data. You can contact us at any time
              to access, correct, or delete your information.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-12">
            {sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-28">
                <h2 className="text-lg font-black text-[#1a1a1a] mb-4 pb-3 border-b border-gray-200">
                  {s.title}
                </h2>
                <div className="space-y-3">
                  {s.content.split('\n\n').map((para, i) => {
                    // Bold heading lines (lines starting with **)
                    if (para.startsWith('**') && para.split('\n').length <= 2) {
                      const [heading, ...rest] = para.split('\n');
                      const headingText = heading.replace(/\*\*/g, '');
                      return (
                        <div key={i}>
                          <p className="text-sm font-black text-[#1a1a1a] mb-1">{headingText}</p>
                          {rest.length > 0 && (
                            <p className="text-sm text-gray-600 leading-relaxed">{rest.join(' ')}</p>
                          )}
                        </div>
                      );
                    }

                    // Dash-prefixed list items
                    if (para.includes('\n—')) {
                      const [intro, ...items] = para.split('\n');
                      return (
                        <div key={i}>
                          {intro && !intro.startsWith('—') && (
                            <p className="text-sm text-gray-600 leading-relaxed mb-2">{intro}</p>
                          )}
                          <ul className="space-y-1.5">
                            {(intro.startsWith('—') ? [intro, ...items] : items).map((item, j) => (
                              <li key={j} className="flex gap-2.5 text-sm text-gray-600 leading-relaxed">
                                <span className="text-[#29d9d5] flex-shrink-0 mt-0.5">—</span>
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: item
                                      .replace(/^— /, '')
                                      .replace(/\*\*(.+?)\*\*/g, '<strong class="text-[#1a1a1a]">$1</strong>'),
                                  }}
                                />
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    }

                    // Render inline **bold** in regular paragraphs
                    return (
                      <p
                        key={i}
                        className="text-sm text-gray-600 leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: para.replace(
                            /\*\*(.+?)\*\*/g,
                            '<strong class="font-bold text-[#1a1a1a]">$1</strong>'
                          ),
                        }}
                      />
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          {/* Footer nav */}
         
        </article>

      </div>
    </main>
  );
}