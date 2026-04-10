'use client';

import Link from 'next/link';

const LAST_UPDATED = 'April 2, 2026';
const EFFECTIVE_DATE = 'November 2, 2026';

const sections = [
  {
    id: 'introduction',
    title: '1. Introduction & Acceptance',
    content: `These Terms of Service ("Terms") govern your access to and use of the Sosika website, mobile application, and related services (collectively, the "Platform"), operated by Sosika ("we", "our", or "us"), a delivery services company based in Dar es Salaam, Tanzania.

By accessing or using the Platform — whether as a customer placing orders, a vendor listing products, a rider delivering orders, or a visitor browsing the site — you agree to be bound by these Terms. If you do not agree, you must not use the Platform.

We may update these Terms from time to time. Continued use of the Platform after any changes constitutes your acceptance of the revised Terms. The date of the most recent revision is shown at the top of this page.`,
  },
  {
    id: 'definitions',
    title: '2. Definitions',
    content: `**"Platform"** refers to the Sosika website (sosika.app), mobile application, and any related tools or services we operate.

**"User"** refers to any individual who accesses or uses the Platform in any capacity.

**"Customer"** refers to a User who places orders for delivery through the Platform.

**"Vendor"** refers to a business or individual (restaurant, pharmacy, grocery store, or retailer) that lists products or services on the Platform for sale and delivery.

**"Rider"** refers to a delivery partner who accepts and fulfils delivery orders through the Platform.

**"Order"** refers to a request placed by a Customer for the purchase and delivery of goods from a Vendor, facilitated by the Platform.

**"Content"** refers to any text, images, data, listings, or other material submitted to or displayed on the Platform.`,
  },
  {
    id: 'eligibility',
    title: '3. Eligibility',
    content: `To use the Platform, you must:

— Be at least 18 years of age
— Have the legal capacity to enter into a binding agreement
— Not be prohibited from using the Platform under any applicable law
— Provide accurate, current, and complete information when registering or submitting any application

By using the Platform, you represent and warrant that you meet all of the above eligibility requirements. We reserve the right to suspend or terminate accounts that do not meet these requirements or that provide false information.

Riders must additionally hold a valid government-issued identification document and, where applicable, a valid licence for the vehicle they use to make deliveries.`,
  },
  {
    id: 'accounts',
    title: '4. Accounts & Registration',
    content: `To access certain features of the Platform, you may be required to create an account. You agree to:

— Provide truthful and accurate information during registration
— Keep your login credentials confidential and not share them with any third party
— Notify us immediately at hello@sosika.app if you suspect unauthorised access to your account
— Take responsibility for all activity that occurs under your account

We reserve the right to refuse registration, suspend, or permanently terminate any account at our sole discretion, including where we reasonably believe a user has violated these Terms, engaged in fraudulent activity, or poses a risk to other users or the integrity of the Platform.

You may not create more than one account per person without our written consent.`,
  },
  {
    id: 'ordering',
    title: '5. Placing Orders',
    content: `**Order placement**
When you place an order through the Platform, you are making an offer to purchase goods from the relevant Vendor. The order is not confirmed until you receive an order confirmation from us.

**Vendor responsibility**
Sosika acts as a facilitator between Customers and Vendors. The legal contract for the sale of goods is between you and the Vendor. Sosika is not the seller of goods and is not responsible for the quality, accuracy of descriptions, safety, or legality of goods listed by Vendors.

**Pricing**
Prices displayed on the Platform are set by Vendors and may change without notice. The delivery fee is set by Sosika and is displayed before you confirm your order. Any applicable taxes are included in the displayed prices.

**Order acceptance and cancellation**
Once an order is confirmed, cancellation may not be possible or may be subject to a cancellation fee, depending on the stage of preparation. If a Vendor is unable to fulfil your order, we will notify you and issue a full refund.

**Delivery windows**
Estimated delivery times are approximations only and may vary due to traffic, weather, demand, or other factors outside our control. Sosika does not guarantee delivery within any specific timeframe.`,
  },
  {
    id: 'payment',
    title: '6. Payments & Refunds',
    content: `**Payment methods**
We accept payment via mobile money (M-Pesa, Tigo Pesa, Airtel Money), debit/credit card, and other methods made available on the Platform. All transactions are processed by third-party payment providers. We do not store your full payment card details.

**Failed transactions**
If a payment fails, your order will not be processed. Please ensure your payment method is valid and has sufficient funds before placing an order.

**Refunds**
You may be eligible for a full or partial refund in the following circumstances:
— Your order was not delivered
— Items were missing from your order
— You received the wrong items
— The delivered items were significantly different from those described

Refund requests must be submitted within 24 hours of the scheduled delivery time via the Platform or by contacting hello@sosika.app. We will review your request and, if approved, issue a refund within 3–7 business days via the original payment method.

We reserve the right to decline refund requests that do not meet the above criteria or that we reasonably believe are fraudulent.`,
  },
  {
    id: 'vendors',
    title: '7. Vendor Terms',
    content: `By joining the Platform as a Vendor, you additionally agree to the following:

**Accuracy of listings**
You are responsible for ensuring that all product descriptions, prices, images, allergen information, and availability on your storefront are accurate and up to date. Misleading listings may result in account suspension.

**Fulfilment obligation**
Once you accept an order on the Platform, you are obligated to fulfil it promptly and to the standard described in your listing. Repeated failures to fulfil orders may result in removal from the Platform.

**Commission**
You agree to pay Sosika a commission on each completed order, at the rate agreed upon during onboarding. Commission rates may be updated with 30 days' written notice.

**Compliance**
You are responsible for ensuring that your business, products, and operations comply with all applicable laws and regulations in Tanzania, including food safety, pharmacy licensing, and consumer protection laws.

**Prohibited listings**
Vendors may not list illegal goods, counterfeit products, alcohol without appropriate licensing, prescription medication without pharmacy certification, or any item that violates applicable law or Sosika's content standards.`,
  },
  {
    id: 'riders',
    title: '8. Rider Terms',
    content: `By joining the Platform as a Rider, you additionally agree to the following:

**Independent contractor status**
Riders are independent contractors, not employees of Sosika. You are responsible for your own tax obligations, insurance, vehicle maintenance, and compliance with traffic laws and regulations.

**Application and verification**
Submitting a rider application is not a guarantee of acceptance. Sosika reserves the right to accept or decline applications at its discretion, including based on background checks, ID verification, and vehicle inspection.

**Conduct on deliveries**
You agree to conduct all deliveries in a professional, safe, and courteous manner. You must comply with all traffic laws and not operate a vehicle while impaired. Riders who receive repeated customer complaints may be suspended or removed from the Platform.

**Earnings**
Rider earnings are calculated per completed delivery based on the rate schedule communicated at onboarding. Earnings are paid out weekly via mobile money. Sosika reserves the right to adjust delivery rates with 14 days' notice.

**Equipment**
The Sosika-branded kit provided to riders upon joining remains the property of Sosika. We may request its return if your account is terminated.

**Safety**
Riders assume all risk associated with making deliveries. Sosika does not provide accident insurance and is not liable for injuries, vehicle damage, or losses sustained during the course of a delivery.`,
  },
  {
    id: 'prohibited',
    title: '9. Prohibited Conduct',
    content: `You agree not to use the Platform to:

— Violate any applicable local, national, or international law or regulation
— Impersonate another person or entity, or provide false information
— Place fraudulent orders or make false refund or dispute claims
— Interfere with, disrupt, or damage the Platform or its infrastructure
— Attempt to gain unauthorised access to any part of the Platform or its systems
— Harvest, scrape, or collect data from the Platform without written permission
— Use the Platform to distribute spam, malware, or unsolicited commercial communications
— Engage in any conduct that is abusive, threatening, or discriminatory toward other users, vendors, or riders
— Manipulate ratings, reviews, or any other feedback mechanism on the Platform
— Use automated tools, bots, or scripts to interact with the Platform without authorisation

We reserve the right to investigate suspected violations and take appropriate action, including account suspension, termination, and referral to law enforcement.`,
  },
  {
    id: 'intellectual-property',
    title: '10. Intellectual Property',
    content: `All content, design, trademarks, logos, software, and other intellectual property on the Platform are owned by or licensed to Sosika. You may not copy, reproduce, distribute, modify, or create derivative works from any part of the Platform without our prior written consent.

You retain ownership of any content you submit to the Platform (such as product listings or application information), but by submitting it, you grant Sosika a non-exclusive, royalty-free, worldwide licence to use, display, and process that content for the purposes of operating the Platform.

If you believe that any content on the Platform infringes your intellectual property rights, please contact us at hello@sosika.app with details of the alleged infringement.`,
  },
  {
    id: 'liability',
    title: '11. Limitation of Liability',
    content: `To the fullest extent permitted by applicable law, Sosika shall not be liable for:

— Any indirect, incidental, special, consequential, or punitive damages arising from your use of the Platform
— Loss of profits, data, goodwill, or other intangible losses
— Any loss or damage resulting from the conduct of Vendors, Riders, or other third parties
— Delays, errors, or failures in delivery caused by factors outside our reasonable control
— Any unauthorised access to or alteration of your account or data, despite our reasonable security measures

Our total liability to you for any claim arising from your use of the Platform shall not exceed the amount paid by you for the specific order or service giving rise to the claim, or TZS 50,000, whichever is lower.

Nothing in these Terms limits our liability for death or personal injury caused by our negligence, fraud, or any other liability that cannot be excluded under applicable law.`,
  },
  {
    id: 'disclaimers',
    title: '12. Disclaimers',
    content: `The Platform is provided on an "as is" and "as available" basis without warranties of any kind, express or implied. We do not warrant that:

— The Platform will be available at all times or free from errors or interruptions
— Delivery estimates will be accurate
— Vendor product descriptions, prices, or availability are error-free
— The Platform is free from viruses or other harmful components

Sosika does not endorse any specific Vendor or Rider and makes no representations about the quality, safety, or legality of goods or services offered through the Platform.`,
  },
  {
    id: 'termination',
    title: '13. Termination',
    content: `You may stop using the Platform at any time. You may request deletion of your account by contacting hello@sosika.app.

We may suspend or terminate your access to the Platform at any time, with or without notice, if we reasonably believe you have:
— Violated these Terms or any applicable law
— Engaged in fraudulent, abusive, or harmful conduct
— Posed a risk to the safety or integrity of the Platform or its users

Upon termination, any outstanding obligations (such as unpaid balances or disputed orders) remain enforceable. Sections of these Terms that by their nature should survive termination — including intellectual property, limitation of liability, and disputes — shall continue to apply.`,
  },
  {
    id: 'governing-law',
    title: '14. Governing Law & Disputes',
    content: `These Terms are governed by and construed in accordance with the laws of the United Republic of Tanzania. Any dispute arising out of or in connection with these Terms or your use of the Platform shall first be attempted to be resolved through good-faith negotiation.

If a dispute cannot be resolved informally within 30 days, it shall be submitted to the courts of competent jurisdiction in Dar es Salaam, Tanzania, and both parties consent to the exclusive jurisdiction of those courts.

Nothing in this section prevents either party from seeking urgent injunctive or other equitable relief from a court of competent jurisdiction.`,
  },
  {
    id: 'general',
    title: '15. General Provisions',
    content: `**Entire agreement**
These Terms, together with our Privacy Policy and any additional terms applicable to specific features, constitute the entire agreement between you and Sosika regarding your use of the Platform.

**Severability**
If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will continue in full force and effect.

**Waiver**
Our failure to enforce any right or provision of these Terms does not constitute a waiver of that right or provision.

**Assignment**
You may not assign or transfer your rights or obligations under these Terms without our prior written consent. We may assign our rights and obligations without restriction.

**Language**
These Terms are written in English. In the event of any conflict between an English version and a translated version, the English version shall prevail.`,
  },
  {
    id: 'contact',
    title: '16. Contact Us',
    content: `If you have any questions about these Terms of Service, please contact us:

**Email:** sosika.app@gmail.com
**Legal enquiries:** sosika.app@gmail.com
**Address:** Arusha, Tanzania

We aim to respond to all enquiries within 3 business days.`,
  },
];

export default function TermsOfServicePage() {
  return (
    <main className="w-full bg-[#f8fafa] text-[#1a1a1a]">

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <section className="bg-[#1a1a1a] md:mt-14 py-20 relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute -top-20 -left-20 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(41,217,213,0.10) 0%, transparent 70%)' }}
        />
        <div
          aria-hidden="true"
          className="absolute bottom-0 right-0 w-60 h-60 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(41,217,213,0.07) 0%, transparent 70%)' }}
        />
        <div className="max-w-4xl mx-auto px-6 md:px-16 relative z-10">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-[#29d9d5] mb-4">Legal</p>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
            Terms of Service
          </h1>
          <div className="flex flex-wrap gap-6 text-sm text-gray-400">
            <span>Effective: <span className="text-gray-300 font-semibold">{EFFECTIVE_DATE}</span></span>
            <span>Last updated: <span className="text-gray-300 font-semibold">{LAST_UPDATED}</span></span>
          </div>
        </div>
      </section>

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-6 md:px-16 py-16 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-14 items-start">

        {/* Sidebar TOC */}
        <nav className="hidden lg:block sticky top-28 self-start" aria-label="Terms of service sections">
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
            <a href="mailto:sosika.app@gmail.com" className="text-xs text-[#29d9d5] hover:underline block mb-1">
              sosika.app@gmail.com
            </a>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Also read</p>
            <Link href="/privacy-policy" className="text-xs text-gray-400 hover:text-[#29d9d5] transition-colors block">
              Privacy Policy →
            </Link>
          </div>
        </nav>

        {/* Main content */}
        <article className="min-w-0">

          {/* Summary callout */}
          <div className="bg-[#29d9d5]/8 border border-[#29d9d5]/20 rounded-2xl px-6 py-5 mb-12">
            <p className="text-sm font-black text-[#1a1a1a] mb-2">Before you read the full terms</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              By using Sosika you agree to these Terms. Key points: you must be 18 or older;
              Sosika facilitates orders between customers and vendors but is not the seller of goods;
              riders are independent contractors; we may suspend accounts that violate these Terms;
              disputes are governed by Tanzanian law. Please read the full document for complete details.
            </p>
          </div>

          {/* Role-based applicability note */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-12">
            {[
              { role: 'Customers', note: 'Sections 1–6, 9–15 apply to you.', icon: '🛍️' },
              { role: 'Vendors', note: 'Sections 1–6, 7, 9–15 apply to you.', icon: '🏪' },
              { role: 'Riders', note: 'Sections 1–5, 8, 9–15 apply to you.', icon: '🛵' },
            ].map((r) => (
              <div key={r.role} className="bg-white border border-gray-100 rounded-xl px-4 py-4 shadow-sm">
                <p className="text-base mb-1">{r.icon}</p>
                <p className="text-xs font-black text-[#1a1a1a] mb-1">{r.role}</p>
                <p className="text-xs text-gray-400 leading-snug">{r.note}</p>
              </div>
            ))}
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
                    // Bold-only heading (standalone **Heading**)
                    if (/^\*\*[^*]+\*\*$/.test(para.trim())) {
                      return (
                        <p key={i} className="text-sm font-black text-[#1a1a1a] mt-5 first:mt-0">
                          {para.replace(/\*\*/g, '')}
                        </p>
                      );
                    }

                    // Bold heading + body on next line
                    if (para.startsWith('**') && para.includes('\n')) {
                      const [heading, ...rest] = para.split('\n');
                      const headingText = heading.replace(/\*\*/g, '');
                      return (
                        <div key={i} className="mt-5 first:mt-0">
                          <p className="text-sm font-black text-[#1a1a1a] mb-1">{headingText}</p>
                          {rest.length > 0 && (
                            <p
                              className="text-sm text-gray-600 leading-relaxed"
                              dangerouslySetInnerHTML={{
                                __html: rest.join(' ').replace(
                                  /\*\*(.+?)\*\*/g,
                                  '<strong class="font-bold text-[#1a1a1a]">$1</strong>'
                                ),
                              }}
                            />
                          )}
                        </div>
                      );
                    }

                    // Dash list
                    if (para.includes('\n—') || para.startsWith('—')) {
                      const lines = para.split('\n');
                      const introLine = !lines[0].startsWith('—') ? lines[0] : null;
                      const listLines = introLine ? lines.slice(1) : lines;
                      return (
                        <div key={i}>
                          {introLine && (
                            <p className="text-sm text-gray-600 leading-relaxed mb-2">{introLine}</p>
                          )}
                          <ul className="space-y-1.5">
                            {listLines.map((item, j) => (
                              <li key={j} className="flex gap-2.5 text-sm text-gray-600 leading-relaxed">
                                <span className="text-[#29d9d5] flex-shrink-0 mt-[1px]">—</span>
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: item
                                      .replace(/^— /, '')
                                      .replace(
                                        /\*\*(.+?)\*\*/g,
                                        '<strong class="font-bold text-[#1a1a1a]">$1</strong>'
                                      ),
                                  }}
                                />
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    }

                    // Default paragraph
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

          
        </article>

      </div>
    </main>
  );
}