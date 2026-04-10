'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { trackEvent } from '@/lib/posthog';
import { platform } from 'os';

const Partnership = () => {
  const cards = [
    {
      title: 'Join As Courier',
      image: '/asset-images/sosika-rider-partner.png', // Replace with your image
      link: '/join-rider',
    },
    {
      title: 'Join As  Merchant',
      image: '/asset-images/sosika-merchant-partner.png', // Replace with your image
      link: '/join-vendor',
    },
  ];

  return (
    <section className="bg-[#1a1c20] py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-16 tracking-tight">
          Want to Join <span className="text-[#29d9d5]">Partnership?</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {cards.map((card, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-3xl border-4 border-[#29d9d5] transition-transform duration-300 hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative h-full md:h-[350px] w-full">
                <Image
                  src={card.image}
                  alt={card.title}
                  width={800}
                  height={800}
                  className="object-cover brightness-75 group-hover:brightness-50 transition-all duration-500"
                />
                
                {/* Overlay Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-10 md:space-y-4">
                  <h3 className="text-4xl font-black text-white leading-tight">
                    {card.title}
                  </h3>
                  
                  <div>
                    <Link
                      href={card.link}
                      className="inline-block bg-[#29d9d5] hover:bg-white hover:text-[#1a1c20] text-white px-8 py-3 rounded-xl font-bold uppercase tracking-wider text-sm transition-colors duration-300"
                      onClick={() => {
                        trackEvent("partner_learn_more_clicked", {
                          location: 'partner-section',
                          destination: `${card.link}`,
                          platform: 'website',
                        })
                      }}
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partnership;