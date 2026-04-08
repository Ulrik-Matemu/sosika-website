"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

type Award = {
  id: number;
  title: string;
  date: string;
  organization: string;
  description: string;
  cta?: string;
  bgColor: string;
  textColor?: string;
};

const awards: Award[] = [
  {
    id: 1,
    title: "Campus Innovation Award",
    date: "Jan 12, 2026",
    organization: "Tanzania Student Innovation Forum",
    description:
      "Recognized for building a modern food delivery experience that improves convenience, speed, and accessibility for campus communities.",
    cta: "View Award",
    bgColor: "#29d9d5",
    textColor: "#041414",
  },
  {
    id: 2,
    title: "Best Student Startup",
    date: "Dec 02, 2025",
    organization: "East Africa Startup Showcase",
    description:
      "Awarded for product vision, market relevance, and execution in solving everyday delivery challenges for students and local vendors.",
    cta: "Explore",
    bgColor: "#111111",
    textColor: "#ffffff",
  },
  {
    id: 3,
    title: "Top Delivery Experience",
    date: "Oct 18, 2025",
    organization: "Digital Product Excellence",
    description:
      "Honored for designing a smoother ordering journey with a strong focus on speed, trust, and user experience.",
    cta: "Read More",
    bgColor: "#1a1a1a",
    textColor: "#ffffff",
  },
  {
    id: 4,
    title: "Vendor Impact Recognition",
    date: "Aug 09, 2025",
    organization: "Local Commerce Growth Awards",
    description:
      "Recognized for creating meaningful digital visibility and growth opportunities for food vendors through technology.",
    cta: "See Details",
    bgColor: "#0b0f19",
    textColor: "#ffffff",
  },
];

// Scroll timeline constants.
// Each card gets an ENTER phase + a DWELL phase.
// enterFraction = what portion of the total scroll budget the entrance takes.
// dwellFraction = how long the card sits fully visible before the next enters.
const ENTER_FRACTION = 0.12; // entrance animation takes 12% of total scroll
const DWELL_FRACTION = 0.13; // dwell (fully visible, no movement) takes 13%
const SLOT = ENTER_FRACTION + DWELL_FRACTION; // 25% of scroll per card

// Build per-card start times (back card enters first).
// Card index 0 = front (enters last), card (total-1) = back (enters first).
function getSegments(index: number, total: number) {
  // back card = total-1, enters at scroll 0
  // front card = 0, enters last
  const slotIndex = total - 1 - index;
  const enterStart = slotIndex * SLOT;
  const enterEnd = enterStart + ENTER_FRACTION;
  return { enterStart, enterEnd };
}

// Each card scrolls in one at a time.
// Card index 0 = frontmost (last to animate in, sits on top).
// We reverse so card 0 is rendered last (highest z-index wins).
function AwardCard({
  award,
  index,
  total,
  progress,
}: {
  award: Award;
  index: number;
  total: number;
  progress: any;
}) {
  const { enterStart, enterEnd } = getSegments(index, total);

  // Slide up from below into stacked position — only during enter window
  const y = useTransform(progress, [enterStart, enterEnd], ["65%", "0%"]);
  const opacity = useTransform(progress, [enterStart, enterEnd], [0, 1]);

  // Stack peek: cards behind the front are offset upward and scaled down.
  // index 0 = front (no offset), index 1 = one behind (offset up a bit), etc.
  const peekOffsetY = -index * 22; // each card peeks 22px above the one in front
  const peekScale = 1 - index * 0.035; // subtle scale-down for depth

  return (
    <motion.div
      style={{
        y,
        opacity,
        // Stack order: front card (index 0) on top
        zIndex: total - index,
        position: "absolute",
        width: "100%",
        // Apply the permanent peek offset so cards sit stacked
        transform: `translateY(${peekOffsetY}px) scale(${peekScale})`,
      }}
    >
      <div
        style={{
          backgroundColor: award.bgColor,
          color: award.textColor || "#ffffff",
          borderRadius: "2rem",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: "480px",
            padding: "2.5rem",
          }}
        >
          {/* Logo mark */}
          <div style={{ fontSize: "1.6rem", fontWeight: 900, lineHeight: 1 }}>
            W.
          </div>

          {/* Main content */}
          <div style={{ marginTop: "2.5rem" }}>
            <p
              style={{
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                fontWeight: 600,
                lineHeight: 1.02,
                letterSpacing: "-0.04em",
                margin: 0,
              }}
            >
              {award.title}
            </p>

            <p
              style={{
                marginTop: "0.75rem",
                fontSize: "1.05rem",
                fontWeight: 500,
                opacity: 0.75,
              }}
            >
              {award.date}
            </p>

            <p
              style={{
                marginTop: "1.25rem",
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                fontWeight: 700,
                lineHeight: 1.03,
                letterSpacing: "-0.04em",
                margin: "1.25rem 0 0",
              }}
            >
              {award.organization}
            </p>
          </div>

          {/* Footer */}
          <div style={{ marginTop: "2.5rem" }}>
            <p
              style={{
                fontSize: "0.95rem",
                lineHeight: 1.75,
                opacity: 0.8,
                maxWidth: "32rem",
              }}
            >
              {award.description}
            </p>

            <button
              type="button"
              style={{
                marginTop: "2rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                backgroundColor: "#ffffff",
                color: "#000000",
                borderRadius: "9999px",
                padding: "0.75rem 1.5rem",
                fontSize: "0.9rem",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.transform = "scale(1.04)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.transform = "scale(1)")
              }
            >
              {award.cta || "View"}
              <ArrowUpRight style={{ width: "1rem", height: "1rem" }} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function AwardsStackSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        // Give enough scroll room for all cards to animate in
        // Each card gets ENTER + DWELL, plus one final dwell so the front card
        // sits fully visible. We map 1.0 scroll progress = N * 100vh sections.
        height: `${awards.length * 150 + 100}vh`,
        overflow: "clip",
        backgroundColor: "#000000",
        color: "#ffffff",
      }}
    >
      <div style={{ position: "sticky", top: 0, height: "100vh" }}>
        <div
          style={{
            margin: "0 auto",
            maxWidth: "80rem",
            height: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: "4rem",
            padding: "2.5rem 4rem",
            alignItems: "center",
          }}
        >
          {/* Left: Heading */}
          <div>
            <div style={{ marginBottom: "1.25rem" }}>
              <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.85)", margin: 0 }}>
                World's Most Prestigious
              </p>
              <div
                style={{
                  marginTop: "0.5rem",
                  height: "4px",
                  width: "5rem",
                  borderRadius: "9999px",
                  backgroundColor: "#ff3b30",
                }}
              />
            </div>

            <h2
              style={{
                fontSize: "clamp(3rem, 6vw, 5.5rem)",
                fontWeight: 600,
                lineHeight: 0.95,
                letterSpacing: "-0.05em",
                margin: 0,
              }}
            >
              Awards
              <br />
              &amp; Honors
            </h2>

            <p
              style={{
                marginTop: "2rem",
                maxWidth: "22rem",
                fontSize: "0.95rem",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.55)",
              }}
            >
              A stacked showcase of recognition, milestones, and achievements
              that highlights Sosika's growth and impact.
            </p>
          </div>

          {/* Right: Card stack */}
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              // Extra top padding to give the peeking cards space above
              paddingTop: `${(awards.length - 1) * 22}px`,
            }}
          >
            {/* Render back-to-front so front card (index 0) is painted last */}
            {[...awards].reverse().map((award, reversedIndex) => {
              const index = awards.length - 1 - reversedIndex;
              return (
                <AwardCard
                  key={award.id}
                  award={award}
                  index={index}
                  total={awards.length}
                  progress={scrollYProgress}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}