'use client'
import { useEffect, useState, useCallback } from 'react';

const WHATSAPP_NUMBER = '255760903468'; // ← replace with Sosika's WhatsApp number
const WHATSAPP_MESSAGE = "Hi! I'd like to know more about Sosika.";
const SCROLL_THRESHOLD = 400; // px before buttons appear

const FloatingActions = () => {
    const [visible, setVisible] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    const handleScroll = useCallback(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);
        setVisible(scrollTop > SCROLL_THRESHOLD);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const openWhatsApp = () => {
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const circumference = 2 * Math.PI * 20; // radius 20
    const strokeDashoffset = circumference * (1 - scrollProgress);

    return (
        <>
            <style>{`
                .float-btn {
                    position: relative;
                    width: 48px;
                    height: 48px;
                    border-radius: 14px;
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
                                box-shadow 0.2s ease,
                                opacity 0.35s ease;
                    outline: none;
                    -webkit-tap-highlight-color: transparent;
                }

                .float-btn:hover {
                    transform: translateY(-3px) scale(1.06);
                }

                .float-btn:active {
                    transform: scale(0.94);
                }

                .float-btn-whatsapp {
                    background: #1a1c20;
                    box-shadow: 0 4px 20px rgba(37, 211, 102, 0.25),
                                0 0 0 1px rgba(37, 211, 102, 0.15);
                }

                .float-btn-whatsapp:hover {
                    box-shadow: 0 8px 28px rgba(37, 211, 102, 0.4),
                                0 0 0 1px rgba(37, 211, 102, 0.3);
                }

                .float-btn-top {
                    background: #1a1c20;
                    box-shadow: 0 4px 20px rgba(41, 217, 213, 0.2),
                                0 0 0 1px rgba(41, 217, 213, 0.12);
                }

                .float-btn-top:hover {
                    box-shadow: 0 8px 28px rgba(41, 217, 213, 0.38),
                                0 0 0 1px rgba(41, 217, 213, 0.25);
                }

                .float-tooltip {
                    position: absolute;
                    right: 58px;
                    top: 50%;
                    transform: translateY(-50%) translateX(4px);
                    background: #1a1c20;
                    color: #FFFFF0;
                    font-size: 11px;
                    font-weight: 600;
                    letter-spacing: 0.04em;
                    text-transform: uppercase;
                    padding: 5px 10px;
                    border-radius: 7px;
                    white-space: nowrap;
                    pointer-events: none;
                    opacity: 0;
                    transition: opacity 0.18s ease, transform 0.18s ease;
                    border: 1px solid rgba(255,255,240,0.07);
                    box-shadow: 0 4px 16px rgba(0,0,0,0.3);
                }

                .float-tooltip::after {
                    content: '';
                    position: absolute;
                    right: -5px;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 0;
                    height: 0;
                    border-top: 5px solid transparent;
                    border-bottom: 5px solid transparent;
                    border-left: 5px solid #1a1c20;
                }

                .float-btn:hover .float-tooltip {
                    opacity: 1;
                    transform: translateY(-50%) translateX(0px);
                }

                .float-container {
                    position: fixed;
                    bottom: 28px;
                    right: 24px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 10px;
                    z-index: 9999;
                    transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
                }

                .float-container.hidden {
                    opacity: 0;
                    transform: translateY(16px);
                    pointer-events: none;
                }

                .float-container.shown {
                    opacity: 1;
                    transform: translateY(0);
                }

                /* Stagger children entrance */
                .float-container.shown .float-btn:nth-child(1) {
                    transition-delay: 0.05s;
                }
                .float-container.shown .float-btn:nth-child(2) {
                    transition-delay: 0s;
                }

                .progress-ring {
                    position: absolute;
                    top: -4px;
                    left: -4px;
                    width: 56px;
                    height: 56px;
                    transform: rotate(-90deg);
                    pointer-events: none;
                }

                .progress-ring-track {
                    fill: none;
                    stroke: rgba(41, 217, 213, 0.1);
                    stroke-width: 2;
                }

                .progress-ring-fill {
                    fill: none;
                    stroke: #29d9d5;
                    stroke-width: 2;
                    stroke-linecap: round;
                    transition: stroke-dashoffset 0.15s ease;
                }
            `}</style>

            <div className={`float-container ${visible ? 'shown' : 'hidden'}`}>

                {/* WhatsApp Button */}
                <button
                    className="float-btn float-btn-whatsapp"
                    onClick={openWhatsApp}
                    aria-label="Chat on WhatsApp"
                >
                    <span className="float-tooltip">WhatsApp Us</span>
                    {/* WhatsApp icon */}
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
                            fill="#25D366"
                        />
                        <path
                            d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.413A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.182a8.17 8.17 0 01-4.168-1.143l-.299-.178-3.094.878.843-3.261-.194-.317A8.182 8.182 0 1112 20.182z"
                            fill="#25D366"
                        />
                    </svg>
                </button>

                {/* Back to Top Button */}
                <button
                    className="float-btn float-btn-top"
                    onClick={scrollToTop}
                    aria-label="Back to top"
                >
                    <span className="float-tooltip">Back to top</span>

                    {/* Scroll progress ring */}
                    <svg className="progress-ring" viewBox="0 0 56 56">
                        <circle className="progress-ring-track" cx="28" cy="28" r="20" />
                        <circle
                            className="progress-ring-fill"
                            cx="28"
                            cy="28"
                            r="20"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                        />
                    </svg>

                    {/* Arrow up icon */}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M12 19V5M5 12l7-7 7 7"
                            stroke="#29d9d5"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>

            </div>
        </>
    );
};

export default FloatingActions;