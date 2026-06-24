"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { LiveChatWidget } from "@livechat/widget-react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BedDouble,
  Brain,
  CalendarDays,
  Check,
  Clock3,
  ExternalLink,
  Facebook,
  HeartHandshake,
  Home,
  Instagram,
  Leaf,
  LockKeyhole,
  Mail,
  MessageCircle,
  Phone,
  Pill,
  ShieldCheck,
  Star,
  Stethoscope,
  TriangleAlert,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const mainSiteUrl = "https://thewellbourneclinic.co.uk/";
const drugRehabUrl = "https://thewellbourneclinic.co.uk/drug-rehab/";
const drugDetoxUrl = "https://thewellbourneclinic.co.uk/drug-detox/";
const phoneNumber = "0330 043 1715";
const phoneHref = "tel:+443300431715";
const emailAddress = "info@thewellbourneclinic.com";
const whatsappUrl = "https://wa.me/447491358745";
const facebookUrl =
  "https://www.facebook.com/people/The-Wellbourne-Clinic/61570002121911/";
const instagramUrl = "https://www.instagram.com/thewellbourneclinic/";
const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeIn = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-90px" },
  transition: { duration: 0.75, ease: smoothEase },
};

const heroImages = [
  {
    src: "/images/editorial/hero-conversation.webp",
    alt: "Two women having a calm, private recovery conversation at home",
    label: "Personal support",
    caption: "Private conversations shaped around your needs and recovery goals.",
  },
  {
    src: "/images/editorial/hero-coastal-walk.webp",
    alt: "A person walking along a quiet coastal path in warm evening light",
    label: "Space to breathe",
    caption: "A calmer environment with room to pause, reflect and reset.",
  },
  {
    src: "/images/editorial/hero-woodland-support.webp",
    alt: "Two people talking while walking together through sunlit woodland",
    label: "Support alongside you",
    caption: "Recovery approached through steady, human support — never judgement.",
  },
  {
    src: "/images/editorial/hero-reflection.webp",
    alt: "A person resting with a warm drink beside a sunlit window",
    label: "Time to reset",
    caption: "A restorative pause from the pressures and patterns of everyday life.",
  },
];

const heroTrustSignals = [
  {
    title: "Private residential care",
    icon: BedDouble,
  },
  {
    title: "Medically supported detox",
    icon: Stethoscope,
  },
  {
    title: "Confidential admissions",
    icon: LockKeyhole,
  },
];

const heroPathSteps = ["Call", "Assessment", "Admission"];

const substanceClusters = [
  {
    number: "01",
    label: "Cocaine",
    icon: Zap,
    eyebrow: "Stimulant",
    description:
      "Cocaine produces intense but short-lived highs followed by difficult crashes. Dependency can develop quickly — structured support helps break the cycle.",
    topics: [
      {
        text: "What is cocaine addiction?",
        href: "https://thewellbourneclinic.co.uk/what-is-cocaine-addiction-understanding-the-risks-and-recovery/",
      },
      {
        text: "Cocaine rehab and recovery",
        href: "https://thewellbourneclinic.co.uk/drug-rehab/",
      },
      {
        text: "Drug detox for stimulants",
        href: "https://thewellbourneclinic.co.uk/drug-detox/",
      },
    ],
    href: "https://thewellbourneclinic.co.uk/what-is-cocaine-addiction-understanding-the-risks-and-recovery/",
    image: "/images/editorial/guide-cocaine.webp",
    imageAlt: "A lived-in room showing the everyday context around cocaine use",
    tone: "bg-white",
    className: "lg:translate-y-0",
  },
  {
    number: "02",
    label: "Cannabis",
    icon: Leaf,
    eyebrow: "Cannabinoid",
    description:
      "Regular cannabis use can lead to psychological dependency and significant mental health impacts. Professional support can help people reduce use and rebuild wellbeing.",
    topics: [
      {
        text: "Cannabis and mental health",
        href: "https://thewellbourneclinic.co.uk/drug-rehab/",
      },
      {
        text: "Cannabis withdrawal symptoms",
        href: "https://thewellbourneclinic.co.uk/understanding-withdrawal-symptoms-what-to-expect-during-drug-detox/",
      },
      {
        text: "Drug rehab for cannabis",
        href: "https://thewellbourneclinic.co.uk/drug-rehab/",
      },
    ],
    href: "https://thewellbourneclinic.co.uk/drug-rehab/",
    image: "/images/editorial/guide-cannabis.webp",
    imageAlt: "Cannabis beside everyday objects in a domestic bedroom setting",
    tone: "bg-[#f0f4e8]",
    className: "lg:translate-y-14",
  },
  {
    number: "03",
    label: "Prescription Drugs",
    icon: Pill,
    eyebrow: "Depressants",
    description:
      "Benzodiazepines, opioid painkillers and similar medications can cause physical dependence even when used as prescribed. Safe, structured detox is particularly important.",
    topics: [
      {
        text: "Prescription drug detox",
        href: "https://thewellbourneclinic.co.uk/prescription-drug-detox-overcoming-hidden-addictions/",
      },
      {
        text: "Diazepam and benzodiazepine addiction",
        href: "https://thewellbourneclinic.co.uk/prescription-drug-detox-overcoming-hidden-addictions/",
      },
      {
        text: "Codeine and tramadol dependency",
        href: "https://thewellbourneclinic.co.uk/prescription-drug-detox-overcoming-hidden-addictions/",
      },
    ],
    href: "https://thewellbourneclinic.co.uk/prescription-drug-detox-overcoming-hidden-addictions/",
    image: "/images/editorial/guide-prescription.webp",
    imageAlt: "A man sitting at a kitchen table beside prescribed medication",
    tone: "bg-[#f0f1f8]",
    className: "lg:translate-y-0",
  },
  {
    number: "04",
    label: "Heroin & Opioids",
    icon: TriangleAlert,
    eyebrow: "Opioids",
    description:
      "Heroin and opioid addiction involves severe physical and psychological dependence. Medically supervised detox significantly reduces the risks associated with withdrawal.",
    topics: [
      {
        text: "The dangers of heroin use",
        href: "https://thewellbourneclinic.co.uk/the-dangers-of-heroin-use-what-you-need-to-know/",
      },
      {
        text: "Opioid withdrawal and detox",
        href: "https://thewellbourneclinic.co.uk/drug-detox/",
      },
      {
        text: "Heroin rehab",
        href: "https://thewellbourneclinic.co.uk/drug-rehab/",
      },
    ],
    href: "https://thewellbourneclinic.co.uk/the-dangers-of-heroin-use-what-you-need-to-know/",
    image: "/images/editorial/guide-opioid-support.webp",
    imageAlt: "A clinician listening carefully during a private assessment",
    tone: "bg-[#fdf6f4]",
    className: "lg:translate-y-14",
  },
];

const substancePills = [
  {
    text: "Cocaine addiction",
    href: "https://thewellbourneclinic.co.uk/what-is-cocaine-addiction-understanding-the-risks-and-recovery/",
  },
  {
    text: "Crack cocaine",
    href: "https://thewellbourneclinic.co.uk/drug-rehab/",
  },
  {
    text: "Cannabis and mental health",
    href: "https://thewellbourneclinic.co.uk/drug-rehab/",
  },
  {
    text: "Cannabis withdrawal",
    href: "https://thewellbourneclinic.co.uk/understanding-withdrawal-symptoms-what-to-expect-during-drug-detox/",
  },
  {
    text: "Benzodiazepine addiction",
    href: "https://thewellbourneclinic.co.uk/prescription-drug-detox-overcoming-hidden-addictions/",
  },
  {
    text: "Codeine dependency",
    href: "https://thewellbourneclinic.co.uk/prescription-drug-detox-overcoming-hidden-addictions/",
  },
  {
    text: "Tramadol dependency",
    href: "https://thewellbourneclinic.co.uk/prescription-drug-detox-overcoming-hidden-addictions/",
  },
  {
    text: "Heroin addiction",
    href: "https://thewellbourneclinic.co.uk/the-dangers-of-heroin-use-what-you-need-to-know/",
  },
  {
    text: "Opioid withdrawal",
    href: "https://thewellbourneclinic.co.uk/understanding-withdrawal-symptoms-what-to-expect-during-drug-detox/",
  },
  {
    text: "Dual diagnosis",
    href: "https://thewellbourneclinic.co.uk/understanding-dual-diagnosis-treating-addiction-and-mental-health/",
  },
];

const detoxSteps = [
  {
    step: "01",
    title: "A private first conversation",
    text: "We listen carefully, understand the substances involved and your health history, and explain your options honestly. There is no pressure.",
  },
  {
    step: "02",
    title: "Clinical assessment",
    text: "A thorough assessment identifies the physical and psychological dimensions of your addiction, so detox can be planned safely and appropriately.",
  },
  {
    step: "03",
    title: "Medically supported withdrawal",
    text: "Detox is managed with clinical oversight. Where appropriate, prescribed medication reduces withdrawal symptoms and minimises risk.",
  },
  {
    step: "04",
    title: "Therapy and recovery work",
    text: "Once the physical phase has settled, therapeutic care explores the reasons behind substance use and builds practical strategies for lasting change.",
  },
  {
    step: "05",
    title: "Aftercare and ongoing support",
    text: "Support doesn't stop when treatment ends. Aftercare planning helps you transition home with a realistic, personal recovery plan.",
  },
];

const withdrawalBySubstance = [
  {
    id: "cocaine",
    label: "Cocaine",
    icon: Zap,
    eyebrow: "Stimulant withdrawal",
    title: "Primarily psychological — but significant.",
    text: "Cocaine withdrawal does not typically cause dangerous physical symptoms, but the psychological effects — cravings, depression, fatigue and anxiety — can be severe and difficult to manage alone.",
    symptoms: [
      "Intense cravings",
      "Fatigue and low energy",
      "Low mood and depression",
      "Anxiety and irritability",
      "Disturbed sleep",
      "Increased appetite",
    ],
    timeline: "Acute phase: days 1–10. Psychological symptoms can persist for weeks.",
    note: "The psychological impact of cocaine withdrawal is a significant relapse risk without structured support.",
  },
  {
    id: "cannabis",
    label: "Cannabis",
    icon: Leaf,
    eyebrow: "Cannabinoid withdrawal",
    title: "Often underestimated.",
    text: "Cannabis withdrawal is real and can be distressing, particularly for long-term or heavy users. Mood disruption, sleep problems and cravings are common.",
    symptoms: [
      "Irritability and mood swings",
      "Sleep disturbance and vivid dreams",
      "Appetite changes",
      "Anxiety and restlessness",
      "Headaches",
      "Low-level cravings",
    ],
    timeline: "Onset: 1–3 days. Peak: days 2–6. Resolution: 2–3 weeks.",
    note: "Mental health impacts of cannabis use — including anxiety and psychosis risk — should be assessed alongside withdrawal.",
  },
  {
    id: "prescription",
    label: "Prescription Drugs",
    icon: Pill,
    eyebrow: "Benzodiazepine & opioid withdrawal",
    title: "Can be medically serious. Professional support matters.",
    text: "Withdrawal from benzodiazepines and prescription opioids can cause physical symptoms that require careful clinical management. Stopping suddenly without guidance is not recommended.",
    symptoms: [
      "Anxiety and panic attacks",
      "Nausea, sweating and muscle pain",
      "Seizure risk (benzodiazepines)",
      "Insomnia",
      "Tremors",
      "Rebound pain",
    ],
    timeline: "Varies significantly by drug type and duration of use. Can take weeks.",
    note: "Benzodiazepine withdrawal can be life-threatening if stopped abruptly. Medical supervision is essential.",
  },
  {
    id: "heroin",
    label: "Heroin & Opioids",
    icon: TriangleAlert,
    eyebrow: "Opioid withdrawal",
    title: "Intense, but manageable with support.",
    text: "Opioid withdrawal is acutely uncomfortable and distressing, with powerful cravings. While rarely life-threatening in otherwise healthy adults, the risk of relapse and overdose after detox is significant.",
    symptoms: [
      "Severe muscle aches",
      "Sweating and chills",
      "Nausea and vomiting",
      "Diarrhoea and cramping",
      "Insomnia and agitation",
      "Intense cravings",
    ],
    timeline: "Onset: 6–24 hours after last use. Peak: days 2–3. Acute phase: 5–10 days.",
    note: "Tolerance drops rapidly after detox. Relapse at pre-detox doses significantly raises overdose risk.",
  },
];

const rehabVsDetox = [
  {
    aspect: "Focus",
    detox: "Managing physical withdrawal safely",
    rehab: "Addressing the psychological and behavioural roots of addiction",
  },
  {
    aspect: "Duration",
    detox: "Typically 7–14 days",
    rehab: "28 days or more, depending on individual need",
  },
  {
    aspect: "What happens",
    detox: "Clinical monitoring, medication where appropriate, stabilisation",
    rehab: "One-to-one therapy, group work, routine and relapse-prevention planning",
  },
  {
    aspect: "Who it helps most",
    detox: "People who are physically dependent and need to withdraw safely",
    rehab: "People ready to work on the causes of addiction and plan lasting change",
  },
  {
    aspect: "Is it enough alone?",
    detox: "Detox alone addresses the physical dimension — addiction often has deeper roots",
    rehab: "Most effective when it follows detox and addresses the whole person",
  },
];

const trustCards = [
  {
    title: "Private from the first call",
    text: "Your enquiry stays confidential. We'll listen without judgement and help you understand your options.",
    icon: LockKeyhole,
  },
  {
    title: "Expert care, clearly explained",
    text: "Our experienced team plans drug detox and treatment around your health, substances and recovery goals.",
    icon: Stethoscope,
  },
  {
    title: "A calm place to recover",
    text: "Our comfortable residential setting gives you space away from everyday pressures, with support close by.",
    icon: Home,
  },
  {
    title: "Built around the person",
    text: "We see you as a person, not an addiction. Your treatment and aftercare are shaped around who you are.",
    icon: HeartHandshake,
  },
];

const googleReviews = [
  {
    name: "Thom Sundblad",
    meta: "Local Guide • 36 reviews • 55 photos",
    date: "9 weeks ago",
    quote: "Excellent staff and excellent therapy. I highly recommend Wellbourne.",
  },
  {
    name: "Paul B",
    meta: "1 review • 0 photos",
    date: "12 weeks ago",
    quote:
      "The Wellbourne Clinic has truly given me the opportunity to turn my life around and I cannot recommend them enough.",
  },
  {
    name: "Rob Jenkins",
    meta: "3 reviews • 1 photo",
    date: "16 weeks ago",
    quote:
      "Where do I start regarding my stay at The Wellbourne Clinic? It was a truly excellent experience.",
  },
  {
    name: "Darren Gilbert",
    meta: "1 review • 0 photos",
    date: "17 weeks ago",
    quote:
      "The Wellbourne Clinic is the place to be if you want to sort your life out. I spent 5 weeks there.",
  },
  {
    name: "Aj",
    meta: "5 reviews • 0 photos",
    date: "19 weeks ago",
    quote:
      "Thank you all at The Wellbourne Clinic for everything you have done for me mentally. The care and compassion...",
  },
  {
    name: "tyler higginson",
    meta: "1 review • 0 photos",
    date: "22 weeks ago",
    quote: "I can't put it into words how much I feel this place has helped me.",
  },
  {
    name: "Stephen Hodgkiss",
    meta: "2 reviews • 0 photos",
    date: "26 weeks ago",
    quote:
      "Can't recommend the Wellbourne Clinic any higher. The staff are extremely knowledgeable and helpful.",
  },
  {
    name: "Tracey Palmer",
    meta: "5 reviews • 6 photos",
    date: "34 weeks ago",
    quote:
      "Brilliant place. My partner went to many rehabs and constantly relapsed. He's now 2 years sober and loving life again.",
  },
  {
    name: "Steph Kinson",
    meta: "1 review • 0 photos",
    date: "35 weeks ago",
    quote:
      "Absolutely amazing staff, felt completely at home. Great atmosphere, food is outstanding, cannot recommend them enough.",
  },
];

const faqs = [
  {
    question: "Is it safe to stop taking drugs suddenly?",
    answer:
      "It depends on the substance. Stopping heroin, benzodiazepines or alcohol suddenly can cause serious withdrawal symptoms including seizures and should not be attempted without medical advice. Cannabis and cocaine withdrawal are less physically dangerous, but psychological symptoms can be severe. Always speak to a GP, NHS 111 or a treatment service before stopping. Call 999 if someone has a seizure, severe confusion, collapses or becomes difficult to wake.",
  },
  {
    question: "What is a medically assisted drug detox?",
    answer:
      "It is a planned withdrawal from substances following clinical assessment. Depending on the substance and the person's history, prescribed medication may be used to reduce withdrawal symptoms and reduce risks, alongside monitoring, hydration and appropriate support. A clinician should decide what is needed — not all detox requires medication, and not all detox is safe without it.",
  },
  {
    question: "How long does drug detox take?",
    answer:
      "It varies by substance. Heroin withdrawal typically peaks over days 2–3 and settles within 5–10 days. Cannabis withdrawal usually resolves over 2–3 weeks. Benzodiazepine detox often requires a gradual dose reduction over weeks or even months. Individual health, duration of use and previous withdrawal history all affect the timescale.",
  },
  {
    question: "What is the difference between drug detox and drug rehab?",
    answer:
      "Drug detox manages the physical process of withdrawing safely from substances. Drug rehab addresses the psychological, behavioural and social factors connected with addiction through therapy, structure, recovery planning and aftercare. Detox can be an important beginning, but it is not the same as longer-term treatment.",
  },
  {
    question: "Which drugs does The Wellbourne Clinic treat?",
    answer:
      "The Wellbourne Clinic provides treatment for a range of drug addictions including cocaine, cannabis, prescription drugs such as benzodiazepines (diazepam, lorazepam), codeine and tramadol, heroin and other opioids. The team will discuss your specific situation at assessment.",
  },
  {
    question: "Do I need drug rehab or just detox?",
    answer:
      "Detox alone addresses physical withdrawal. Most people with a significant drug addiction benefit from both detox and rehab, which explores the reasons behind substance use and builds skills and strategies for lasting change. A clinical assessment will help clarify what level of care is most appropriate for your situation.",
  },
  {
    question: "Is treatment at The Wellbourne Clinic confidential?",
    answer:
      "Yes. Enquiries and treatment are handled privately. The team can explain confidentiality, the assessment process, admission and the involvement of family or employers clearly before you decide whether the clinic is right for you.",
  },
  {
    question: "What happens after drug treatment ends?",
    answer:
      "Good treatment looks beyond withdrawal and residential care. Aftercare planning, relapse-prevention work and continuing support can help you translate treatment into sustainable daily life. The team will work with you on a realistic aftercare plan before you leave.",
  },
];

const faqCardMessages = ["Talk to us now", "We are here to help"];

const articles = [
  {
    title: "What is cocaine addiction?",
    category: "Cocaine",
    readTime: "Popular",
    image: "/images/editorial/article-cocaine.webp",
    text: "Understanding the risks, signs and pathways to recovery from cocaine addiction.",
    href: "https://thewellbourneclinic.co.uk/what-is-cocaine-addiction-understanding-the-risks-and-recovery/",
    tone: "from-[#1a0a05]/10 via-[#1a0a05]/18 to-[#0a0402]/90",
  },
  {
    title: "The dangers of heroin use",
    category: "Heroin",
    readTime: "Featured",
    image: "/images/editorial/guide-mental-health.webp",
    text: "A clear guide to the health risks, dependency and treatment options for heroin use.",
    href: "https://thewellbourneclinic.co.uk/the-dangers-of-heroin-use-what-you-need-to-know/",
    tone: "from-[#0d1a0a]/10 via-[#0d1a0a]/20 to-[#040a02]/90",
  },
  {
    title: "Prescription drug detox",
    category: "Prescription drugs",
    readTime: "Popular",
    image: "/images/editorial/article-prescription.webp",
    text: "Overcoming hidden addictions to benzodiazepines, codeine and other prescription medications.",
    href: "https://thewellbourneclinic.co.uk/prescription-drug-detox-overcoming-hidden-addictions/",
    tone: "from-[#472f21]/10 via-[#472f21]/24 to-[#120905]/90",
  },
  {
    title: "Drug detox vs drug rehab",
    category: "Understanding treatment",
    readTime: "Popular",
    image: "/images/editorial/article-treatment.webp",
    text: "The key differences between detox and rehab, and how they work together in recovery.",
    href: "https://thewellbourneclinic.co.uk/drug-detox-vs-drug-rehab-key-differences/",
    tone: "from-[#1f3848]/10 via-[#1f3848]/22 to-[#071018]/90",
  },
  {
    title: "Understanding withdrawal symptoms",
    category: "Drug detox guide",
    readTime: "Core page",
    image: "/images/editorial/guide-aftercare.webp",
    text: "What to expect during drug detox — a realistic, clinical guide to withdrawal.",
    href: "https://thewellbourneclinic.co.uk/understanding-withdrawal-symptoms-what-to-expect-during-drug-detox/",
    tone: "from-[#3d3325]/10 via-[#3d3325]/18 to-[#14100b]/90",
  },
];

const guideLinks = [
  { title: "Drug Rehab", href: "https://thewellbourneclinic.co.uk/drug-rehab/" },
  { title: "Drug Detox", href: "https://thewellbourneclinic.co.uk/drug-detox/" },
  {
    title: "Prescription Drug Detox",
    href: "https://thewellbourneclinic.co.uk/prescription-drug-detox-overcoming-hidden-addictions/",
  },
  {
    title: "What is Cocaine Addiction?",
    href: "https://thewellbourneclinic.co.uk/what-is-cocaine-addiction-understanding-the-risks-and-recovery/",
  },
  {
    title: "The Dangers of Heroin Use",
    href: "https://thewellbourneclinic.co.uk/the-dangers-of-heroin-use-what-you-need-to-know/",
  },
  {
    title: "Understanding Withdrawal Symptoms",
    href: "https://thewellbourneclinic.co.uk/understanding-withdrawal-symptoms-what-to-expect-during-drug-detox/",
  },
  {
    title: "Drug Detox vs Drug Rehab",
    href: "https://thewellbourneclinic.co.uk/drug-detox-vs-drug-rehab-key-differences/",
  },
  {
    title: "Holistic Drug Rehab",
    href: "https://thewellbourneclinic.co.uk/holistic-approaches-to-drug-rehab-at-the-wellbourne-clinic/",
  },
  {
    title: "Alcohol vs Drug Addiction",
    href: "https://thewellbourneclinic.co.uk/alcohol-vs-drug-addiction-understanding-the-differences-in-treatment/",
  },
  {
    title: "Understanding Dual Diagnosis",
    href: "https://thewellbourneclinic.co.uk/understanding-dual-diagnosis-treating-addiction-and-mental-health/",
  },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-5 inline-flex rounded-full border border-graphite/10 bg-white/70 px-4 py-2 text-sm font-semibold text-brand-ink shadow-sm backdrop-blur">
      {children}
    </p>
  );
}

function SectionHeading({
  eyebrow,
  title,
  text,
  align = "center",
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  text: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
}) {
  return (
    <motion.div
      {...fadeIn}
      className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-5xl"}
    >
      <SectionLabel>{eyebrow}</SectionLabel>
      <h2
        className={`text-balance break-words font-heading text-[2.15rem] font-semibold leading-[1.04] tracking-[-0.04em] md:text-[4rem] md:tracking-[-0.045em] ${
          tone === "dark" ? "text-white" : "text-graphite"
        }`}
      >
        {title}
      </h2>
      <p
        className={`mt-5 max-w-4xl text-pretty text-lg leading-8 md:text-xl ${
          tone === "dark" ? "text-white/68" : "text-muted"
        }`}
      >
        {text}
      </p>
    </motion.div>
  );
}

function GoogleLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false" className={className}>
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.52h11.84a10.12 10.12 0 0 1-4.4 6.64v5.52h7.12c4.16-3.84 6.56-9.5 6.56-16.18Z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.96 14.56-5.32l-7.12-5.52c-1.98 1.32-4.5 2.1-7.44 2.1-5.74 0-10.6-3.88-12.34-9.08H4.3v5.7A22 22 0 0 0 24 46Z"
      />
      <path
        fill="#FBBC05"
        d="M11.66 28.18A13.22 13.22 0 0 1 10.96 24c0-1.44.25-2.84.7-4.18v-5.7H4.3A22 22 0 0 0 2 24c0 3.54.84 6.9 2.3 9.88l7.36-5.7Z"
      />
      <path
        fill="#EA4335"
        d="M24 10.74c3.24 0 6.14 1.12 8.42 3.3l6.3-6.3C34.9 4.18 29.92 2 24 2A22 22 0 0 0 4.3 14.12l7.36 5.7C13.4 14.62 18.26 10.74 24 10.74Z"
      />
    </svg>
  );
}

export function WellbourneMicrosite() {
  const [activeHeroImage, setActiveHeroImage] = useState(0);
  const [activeWithdrawal, setActiveWithdrawal] = useState(0);
  const [activeFaqMessage, setActiveFaqMessage] = useState(0);
  const [activeReview, setActiveReview] = useState(0);
  const [chatVisibility, setChatVisibility] = useState<"maximized" | "minimized">("minimized");
  const [isReviewPaused, setIsReviewPaused] = useState(false);
  const [isArticleRailPaused, setIsArticleRailPaused] = useState(false);
  const articleRailRef = useRef<HTMLDivElement>(null);

  const currentWithdrawal = withdrawalBySubstance[activeWithdrawal];
  const WithdrawalIcon = currentWithdrawal.icon;
  const openLiveChat = () => setChatVisibility("maximized");
  const shouldReduceMotion = useReducedMotion();

  const { scrollY, scrollYProgress } = useScroll();
  const progressScaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });
  const headerBackground = useTransform(
    scrollY,
    [0, 180],
    ["rgba(247, 244, 238, 0.72)", "rgba(247, 244, 238, 0.9)"],
  );
  const headerShadow = useTransform(
    scrollY,
    [0, 180],
    ["0 0 0 rgba(17,24,39,0)", "0 18px 50px rgba(17,24,39,0.08)"],
  );
  const heroPointerX = useMotionValue(0);
  const heroPointerY = useMotionValue(0);
  const heroImageX = useSpring(
    useTransform(heroPointerX, [-1, 1], shouldReduceMotion ? [0, 0] : [-16, 16]),
    { stiffness: 120, damping: 24 },
  );
  const heroImageY = useSpring(
    useTransform(heroPointerY, [-1, 1], shouldReduceMotion ? [0, 0] : [-12, 12]),
    { stiffness: 120, damping: 24 },
  );

  const handleHeroPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    heroPointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
    heroPointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  const resetHeroPointer = () => {
    heroPointerX.set(0);
    heroPointerY.set(0);
  };

  const handleSpotlightMove = (event: React.PointerEvent<HTMLElement>) => {
    if (shouldReduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--spotlight-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--spotlight-y", `${event.clientY - rect.top}px`);
  };

  const showPreviousReview = () =>
    setActiveReview((c) => (c === 0 ? googleReviews.length - 1 : c - 1));
  const showNextReview = () =>
    setActiveReview((c) => (c + 1) % googleReviews.length);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const timer = window.setInterval(
      () => setActiveHeroImage((c) => (c + 1) % heroImages.length),
      4500,
    );
    return () => window.clearInterval(timer);
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion || isReviewPaused) return;
    const timer = window.setInterval(
      () => setActiveReview((c) => (c + 1) % googleReviews.length),
      4800,
    );
    return () => window.clearInterval(timer);
  }, [isReviewPaused, shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion || isArticleRailPaused) return;
    const rail = articleRailRef.current;
    if (!rail) return;
    const timer = window.setInterval(() => {
      const firstCard = rail.querySelector<HTMLElement>(".article-card");
      const scrollDistance = firstCard
        ? firstCard.offsetWidth + 28
        : Math.round(rail.clientWidth * 0.82);
      const halfway = rail.scrollWidth / 2;
      if (rail.scrollLeft >= halfway - scrollDistance) {
        rail.scrollTo({ left: 0, behavior: "auto" });
      } else {
        rail.scrollBy({ left: scrollDistance, behavior: "smooth" });
      }
    }, 2000);
    return () => window.clearInterval(timer);
  }, [isArticleRailPaused, shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const timer = window.setInterval(
      () => setActiveFaqMessage((c) => (c + 1) % faqCardMessages.length),
      3600,
    );
    return () => window.clearInterval(timer);
  }, [shouldReduceMotion]);

  return (
    <main className="min-h-screen overflow-hidden bg-cream text-graphite">

      {/* ── Header ──────────────────────────────────────────── */}
      <motion.header
        className="fixed left-0 right-0 top-0 z-50 border-b border-white/55 backdrop-blur-2xl"
        style={{ backgroundColor: headerBackground, boxShadow: headerShadow }}
      >
        <motion.div
          aria-hidden="true"
          className="absolute bottom-[-1px] left-0 h-px w-full origin-left bg-gradient-to-r from-transparent via-brand to-transparent"
          style={{ scaleX: progressScaleX }}
        />
        <nav
          aria-label="Primary navigation"
          className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8"
        >
          <a
            href="#top"
            className="group rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            <Image
              src="/mainlogo.png"
              alt="The Wellbourne Clinic"
              width={280}
              height={42}
              className="h-auto w-[210px] transition duration-300 group-hover:opacity-80 sm:w-[280px]"
              priority
            />
          </a>
          <div className="hidden items-center gap-7 text-sm font-medium text-muted lg:flex">
            <a href="#substances" className="transition hover:text-graphite">Substances</a>
            <a href="#detox" className="transition hover:text-graphite">Detox</a>
            <a href="#withdrawal" className="transition hover:text-graphite">Withdrawal</a>
            <a href="#detox-vs-rehab" className="transition hover:text-graphite">Rehab vs detox</a>
            <a href="#faqs" className="transition hover:text-graphite">FAQs</a>
          </div>
          <Button type="button" size="sm" onClick={openLiveChat} className="px-5">
            <span className="hidden sm:inline">Speak privately</span>
            <span className="sm:hidden">Chat</span>
            <MessageCircle className="h-4 w-4" />
          </Button>
        </nav>
      </motion.header>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section
        id="top"
        className="relative isolate overflow-hidden px-5 pb-16 pt-28 text-white md:px-8 md:pb-20 md:pt-32"
        onPointerMove={handleHeroPointerMove}
        onPointerLeave={resetHeroPointer}
      >
        <div className="absolute inset-0 z-0 bg-midnight">
          {heroImages.map((image, index) => (
            <motion.div
              key={image.src}
              initial={false}
              animate={{
                opacity: activeHeroImage === index ? 1 : 0,
                scale: activeHeroImage === index ? 1.04 : 1.1,
              }}
              transition={{ duration: 1.2, ease: smoothEase }}
              className="absolute inset-0"
              style={{ x: heroImageX, y: heroImageY }}
            >
              <Image
                src={image.src}
                alt=""
                fill
                className="object-cover opacity-72"
                sizes="100vw"
                priority={index === 0}
              />
            </motion.div>
          ))}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,22,33,0.76)_0%,rgba(13,22,33,0.58)_46%,rgba(13,22,33,0.9)_100%)]" />
          <motion.div
            aria-hidden="true"
            animate={shouldReduceMotion ? undefined : { x: ["-8%", "8%", "-8%"] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[-12%] top-24 h-64 w-2/3 rounded-full bg-brand/20 blur-3xl"
          />
          <motion.div
            aria-hidden="true"
            animate={shouldReduceMotion ? undefined : { x: ["8%", "-8%", "8%"] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-8rem] right-[-8%] h-72 w-3/5 rounded-full bg-sage/20 blur-3xl"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.82, ease: smoothEase }}
            className="max-w-5xl pt-8 md:pt-12"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-white/22 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white/82 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              Private UK care linked to The Wellbourne Clinic
            </div>
            <h1 className="mt-7 max-w-5xl text-balance break-words font-heading text-[3.05rem] font-semibold leading-[0.96] tracking-[-0.045em] text-white sm:text-[4.15rem] md:text-[6.4rem] lg:text-[7.1rem]">
              A calmer first step into drug rehab and detox.
            </h1>
            <motion.div
              aria-hidden="true"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, delay: 0.35, ease: smoothEase }}
              className="mt-6 h-px w-full max-w-2xl origin-left bg-gradient-to-r from-brand via-white/50 to-transparent"
            />
            <p className="mt-7 max-w-3xl text-pretty text-lg leading-8 text-white/78 md:text-xl md:leading-9">
              When substance use has become hard to contain, clear guidance matters. We help you
              understand safe detox, residential treatment and the private admissions route into a
              setting where you can pause, be heard and begin again.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.82, delay: 0.12, ease: smoothEase }}
            className="mt-9 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button type="button" onClick={openLiveChat} className="bg-white text-graphite hover:bg-brand hover:text-white">
                  Start a private conversation <MessageCircle className="h-5 w-5" />
                </Button>
                <Button asChild variant="secondary" className="border-white/20 bg-white/10 text-white hover:border-white/45 hover:bg-white/18">
                  <a href={phoneHref}>
                    Call {phoneNumber} <Phone className="h-5 w-5" />
                  </a>
                </Button>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {heroTrustSignals.map((item) => (
                  <span
                    key={item.title}
                    className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-3.5 py-2 text-sm font-semibold text-white/86 backdrop-blur transition hover:border-white/36 hover:bg-white/16"
                  >
                    <item.icon className="h-4 w-4 text-brand" />
                    {item.title}
                  </span>
                ))}
              </div>
            </div>

            <motion.div
              animate={shouldReduceMotion ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
              className="max-w-sm rounded-3xl border border-white/18 bg-white/12 p-5 shadow-[0_28px_90px_rgba(0,0,0,0.22)] backdrop-blur-xl"
            >
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">A quiet reassurance</p>
              <p className="mt-3 text-lg font-semibold leading-7 text-white">
                &ldquo;You do not need the perfect words before you ask for help.&rdquo;
              </p>
              <p className="mt-3 text-sm leading-6 text-white/68">
                A private conversation can simply clarify what is safe, suitable and possible.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.24, ease: smoothEase }}
            className="mt-12 grid gap-4 lg:grid-cols-[1fr_0.72fr]"
          >
            <div className="grid gap-4 sm:grid-cols-3">
              {heroImages.slice(0, 3).map((image, index) => (
                <motion.button
                  key={image.src}
                  type="button"
                  onClick={() => setActiveHeroImage(index)}
                  whileHover={shouldReduceMotion ? undefined : { y: -6 }}
                  className={`group relative min-h-[220px] overflow-hidden border text-left shadow-editorial transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-midnight sm:min-h-[280px] ${
                    index === 1
                      ? "rounded-t-[5rem] rounded-b-[1.5rem] lg:translate-y-8"
                      : "rounded-[1.5rem]"
                  } ${activeHeroImage === index ? "border-brand/80" : "border-white/18"}`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(min-width: 1024px) 26vw, (min-width: 640px) 33vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,22,33,0.02)_20%,rgba(13,22,33,0.76)_100%)]" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/65">
                      {image.label}
                    </p>
                    <p className="mt-2 text-lg font-semibold leading-6 text-white">
                      {image.caption}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>

            <div className="rounded-[1.75rem] border border-white/18 bg-white/90 p-5 text-graphite shadow-editorial backdrop-blur md:p-6 lg:mt-14">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
                    First step pathway
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">
                    A discreet route into care
                  </h2>
                </div>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-ink">
                  <ShieldCheck className="h-5 w-5" />
                </span>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {heroPathSteps.map((step, index) => (
                  <div key={step} className="group flex items-center gap-4 rounded-2xl bg-cream p-4 transition hover:bg-white hover:shadow-card">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-brand shadow-sm">
                      0{index + 1}
                    </span>
                    <div>
                      <p className="font-semibold">{step}</p>
                      <p className="mt-1 text-sm leading-6 text-muted">
                        {index === 0 && "Speak privately with someone who will listen."}
                        {index === 1 && "Clarify risks, needs and the right level of support."}
                        {index === 2 && "Plan a calm, confidential arrival when treatment is right."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Phone CTA strip ─────────────────────────────────── */}
      <section className="px-5 pb-16 pt-14 md:px-8 md:pb-24 md:pt-20">
        <motion.p
          {...fadeIn}
          className="mx-auto max-w-5xl text-center text-2xl font-semibold leading-tight tracking-[-0.035em] text-graphite md:text-4xl"
        >
          Call us today on{" "}
          <a
            href={phoneHref}
            className="text-brand underline decoration-brand/35 underline-offset-8 transition hover:text-[#e88975]"
          >
            {phoneNumber}
          </a>{" "}
          for a free, confidential conversation. We&rsquo;ll listen and help you understand your
          options whenever you&rsquo;re ready.
        </motion.p>
      </section>

      {/* ── What Is Drug Rehab? ──────────────────────────────── */}
      <section
        id="what-is-drug-rehab"
        className="scroll-mt-24 bg-porcelain px-5 py-24 md:px-8 md:py-32"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <motion.div {...fadeIn} className="group relative min-h-[560px] overflow-hidden rounded-[2rem] shadow-soft">
            <Image
              src="/images/editorial/rehab-conversation.webp"
              alt="Two women talking privately over tea in a calm home-like setting"
              fill
              className="object-cover transition duration-700 group-hover:scale-[1.025]"
              sizes="(min-width: 1024px) 44vw, 100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,24,39,0.02)_35%,rgba(17,24,39,0.76)_100%)]" />
            <div className="absolute bottom-0 left-0 right-0 p-7 text-white md:p-9">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/65">
                Residential • Therapeutic • Personal
              </p>
              <p className="mt-3 max-w-lg text-3xl font-semibold leading-tight tracking-[-0.04em]">
                Addiction is a health condition, not a moral failing.
              </p>
            </div>
          </motion.div>

          <motion.div {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.08 }}>
            <SectionLabel>What is drug rehab?</SectionLabel>
            <h2 className="text-balance font-heading text-[2.4rem] font-semibold leading-[1.02] tracking-[-0.045em] md:text-[4.35rem]">
              A supported path from dependency to recovery.
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted">
              Drug rehab is residential, structured treatment for drug addiction. It goes beyond
              detox — addressing the psychological, behavioural and social factors that sustain
              substance use, through therapy, routine and personalised recovery planning.
            </p>
            <p className="mt-5 text-lg leading-8 text-muted">
              At The Wellbourne Clinic, treatment begins with a thorough clinical assessment.
              Care is then planned around the individual — the substances involved, their health
              history, personal circumstances and recovery goals.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Clinical assessment before treatment",
                "Medically supervised detox where needed",
                "One-to-one and group therapy",
                "Relapse prevention and aftercare planning",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-graphite/10 bg-white p-4"
                >
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                  <span className="text-sm font-semibold leading-6">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Common Substances We Treat ───────────────────────── */}
      <section id="substances" className="scroll-mt-24 px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Common substances we treat"
            title="Drug addiction takes many forms. We treat them all."
            text="The Wellbourne Clinic provides residential assessment, detox and rehab for a range of substance dependencies. Each cluster below links to focused information and relevant treatment pages."
            align="left"
          />

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:gap-7">
            {substanceClusters.map((cluster, index) => {
              const Icon = cluster.icon;
              return (
                <motion.div
                  key={cluster.number}
                  {...fadeIn}
                  transition={{ ...fadeIn.transition, delay: index * 0.1 }}
                  className={cluster.className}
                >
                  <article
                    className={`group relative overflow-hidden rounded-[2.25rem] border border-graphite/10 shadow-card transition duration-500 hover:-translate-y-1.5 hover:shadow-soft ${cluster.tone}`}
                  >
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={cluster.image}
                        alt={cluster.imageAlt}
                        fill
                        className="object-cover transition duration-700 group-hover:scale-[1.035]"
                        sizes="(min-width: 768px) 50vw, 100vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-graphite/45 via-transparent to-transparent" />
                      <div className="absolute bottom-5 left-6 grid h-14 w-14 place-items-center rounded-full border-2 border-white/80 bg-cream shadow-[inset_0_0_0_4px_#fff]">
                        <span className="text-sm font-extrabold tracking-[0.12em] text-brand">
                          {cluster.number}
                        </span>
                      </div>
                      <span className="absolute right-6 top-5 grid h-12 w-12 place-items-center rounded-2xl bg-white/90 text-brand shadow-sm backdrop-blur">
                        <Icon className="h-6 w-6" />
                      </span>
                    </div>
                    <div className="p-7 md:p-9">
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand">
                        {cluster.eyebrow}
                      </p>
                      <h3 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-graphite">
                        {cluster.label}
                      </h3>
                      <p className="mt-4 max-w-lg leading-7 text-muted">{cluster.description}</p>
                      <ul className="mb-5 space-y-2 border-t border-graphite/10 pt-5">
                        {cluster.topics.map((topic) => (
                          <li key={topic.text} className="flex items-center gap-2 text-sm text-muted">
                            <Check className="h-3.5 w-3.5 shrink-0 text-brand" />
                            <a
                              href={topic.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="transition hover:text-graphite"
                            >
                              {topic.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                      <a
                        href={cluster.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition hover:underline"
                      >
                        Learn about {cluster.label} <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </article>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            {...fadeIn}
            transition={{ ...fadeIn.transition, delay: 0.2 }}
            className="mt-10 flex flex-wrap gap-2.5"
          >
            {substancePills.map((pill) => (
              <a
                key={pill.text}
                href={pill.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-graphite/10 bg-white px-4 py-2 text-sm font-medium text-muted shadow-sm transition hover:-translate-y-0.5 hover:border-brand/30 hover:text-graphite"
              >
                {pill.text}
                <ExternalLink className="h-3 w-3 opacity-40" />
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Restorative visual break ─────────────────────────── */}
      <section className="px-5 pb-24 md:px-8 md:pb-32">
        <motion.div
          {...fadeIn}
          className="group relative mx-auto min-h-[520px] max-w-7xl overflow-hidden rounded-[2.5rem] shadow-editorial md:min-h-[620px]"
        >
          <Image
            src="/images/editorial/recovery-meadow.webp"
            alt="A person walking quietly through a meadow at sunset"
            fill
            className="object-cover object-center transition duration-[1200ms] group-hover:scale-[1.025]"
            sizes="(min-width: 1280px) 1280px, 100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,18,24,0.78)_0%,rgba(11,18,24,0.32)_48%,rgba(11,18,24,0.08)_100%)]" />
          <div className="relative flex min-h-[520px] items-end p-7 text-white md:min-h-[620px] md:items-center md:p-14 lg:p-20">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand">
                Recovery is personal
              </p>
              <blockquote className="mt-5 text-balance font-heading text-[2.35rem] font-semibold leading-[1.05] tracking-[-0.045em] md:text-[4.5rem]">
                “You do not have to know the whole way forward to take the next step.”
              </blockquote>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/72">
                A first conversation can simply be a chance to understand what support could look
                like, privately and without pressure.
              </p>
              <Button type="button" onClick={openLiveChat} className="mt-8">
                Start a private conversation <MessageCircle className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Drug Detox Process ───────────────────────────────── */}
      <section id="detox" className="scroll-mt-24 bg-porcelain px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.82fr] lg:items-end">
            <SectionHeading
              eyebrow="The drug detox process"
              title="What happens when you come to us."
              text="From the first conversation to aftercare planning, our approach is individual, medically informed and built around the whole person — not just the substance."
              align="left"
            />
            <motion.div
              {...fadeIn}
              className="group relative min-h-[320px] overflow-hidden rounded-[2rem] shadow-soft lg:min-h-[410px]"
            >
              <Image
                src="/images/editorial/clinical-assessment.webp"
                alt="A clinician explaining treatment during a private assessment"
                fill
                className="object-cover transition duration-700 group-hover:scale-[1.025]"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-graphite/65 via-transparent to-transparent" />
              <p className="absolute bottom-6 left-6 right-6 text-lg font-semibold text-white">
                Clear clinical guidance, explained person to person.
              </p>
            </motion.div>
          </div>
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {detoxSteps.map((step, index) => (
              <motion.div
                key={step.step}
                {...fadeIn}
                transition={{ ...fadeIn.transition, delay: index * 0.07 }}
              >
                <article
                  onPointerMove={handleSpotlightMove}
                  className="premium-spotlight flex h-full flex-col rounded-[2rem] border border-graphite/10 bg-white p-7 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-soft md:p-8"
                >
                  <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-brand bg-brand-soft text-sm font-extrabold tracking-[0.12em] text-brand">
                    {step.step}
                  </span>
                  <h3 className="text-xl font-semibold tracking-[-0.03em]">{step.title}</h3>
                  <p className="mt-4 flex-1 leading-7 text-muted">{step.text}</p>
                </article>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeIn} className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button type="button" onClick={openLiveChat}>
              Ask about drug detox <MessageCircle className="h-5 w-5" />
            </Button>
            <Button asChild variant="secondary">
              <a href={drugDetoxUrl} target="_blank" rel="noopener noreferrer">
                Drug detox at Wellbourne <ExternalLink className="h-5 w-5" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── Withdrawal by Substance ──────────────────────────── */}
      <section
        id="withdrawal"
        className="scroll-mt-24 relative isolate overflow-hidden bg-midnight px-5 py-24 text-white md:px-8 md:py-32"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_12%,rgba(241,152,133,0.28),transparent_30%),radial-gradient(circle_at_90%_72%,rgba(80,130,255,0.18),transparent_34%)]" />
        <div className="relative mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Withdrawal symptoms by substance"
            title="What withdrawal looks like depends on the drug."
            text="Symptoms, severity and timescales vary significantly across substance types. This is a general guide — individual experience depends on many factors including duration of use and overall health."
            tone="dark"
            align="left"
          />

          <motion.div
            {...fadeIn}
            className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 md:p-8"
            role="img"
            aria-label="Gantt chart comparing withdrawal timelines across cocaine, cannabis, heroin and prescription drugs"
          >
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.16em] text-brand">
              Withdrawal timeline by substance
            </p>
            <div className="space-y-4">
              {[
                {
                  label: "Cocaine",
                  phases: [
                    { left: "0%", width: "25%", opacity: "bg-brand", ariaLabel: "Acute phase: days 1–10" },
                    { left: "25%", width: "30%", opacity: "bg-brand/30", ariaLabel: "Psychological phase: weeks" },
                  ],
                },
                {
                  label: "Cannabis",
                  phases: [
                    { left: "0%", width: "18%", opacity: "bg-brand", ariaLabel: "Onset and peak: days 1–6" },
                    { left: "18%", width: "32%", opacity: "bg-brand/30", ariaLabel: "Resolution: 2–3 weeks" },
                  ],
                },
                {
                  label: "Heroin & Opioids",
                  phases: [
                    { left: "0%", width: "5%", opacity: "bg-brand/70", ariaLabel: "Onset: hours 6–24" },
                    { left: "5%", width: "20%", opacity: "bg-brand", ariaLabel: "Acute phase: days 1–10" },
                  ],
                },
                {
                  label: "Prescription / Benzo",
                  phases: [
                    { left: "0%", width: "72%", opacity: "bg-brand/35", ariaLabel: "Gradual reduction: weeks to months" },
                  ],
                },
              ].map((row, rowIndex) => (
                <div key={row.label} className="flex items-center gap-4">
                  <span className="w-36 shrink-0 text-xs font-semibold text-white/55">{row.label}</span>
                  <div className="relative h-7 flex-1 overflow-hidden rounded-full bg-white/10" aria-label={`${row.label} withdrawal timeline`}>
                    {row.phases.map((phase, i) => (
                      <motion.div
                        key={i}
                        className={`absolute inset-y-0 ${phase.opacity}`}
                        style={{ left: phase.left }}
                        aria-label={phase.ariaLabel}
                        initial={{ width: 0 }}
                        whileInView={{ width: phase.width }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: rowIndex * 0.08 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-1.5">
              <span className="flex items-center gap-1.5 text-[10px] text-white/38">
                <span className="inline-block h-2.5 w-2.5 rounded-sm bg-brand" />
                Acute / primary phase
              </span>
              <span className="flex items-center gap-1.5 text-[10px] text-white/38">
                <span className="inline-block h-2.5 w-2.5 rounded-sm bg-brand/35" />
                Psychological / tapering phase
              </span>
              <span className="ml-auto text-[10px] text-white/25">← shorter&nbsp;&nbsp;&nbsp;longer →</span>
            </div>
            <p className="mt-3 text-[10px] leading-5 text-white/25">
              Source: NICE CG52 (opioid detoxification); clinical pharmacology guidance for cocaine and cannabis withdrawal; NICE CG76 and BNF benzodiazepine tapering guidance. Timescales are typical ranges — individual experience varies significantly.
            </p>
          </motion.div>

          <div className="mt-14 overflow-hidden rounded-[2.75rem] border border-white/10 bg-white/[0.045] p-3 shadow-[0_34px_90px_rgba(0,0,0,0.28)] backdrop-blur md:p-5">
            <div className="relative grid min-h-[530px] gap-3 lg:grid-cols-[0.76fr_1.24fr]">
              <div className="flex flex-col justify-between rounded-[2.1rem] border border-white/8 bg-black/15 p-6 md:p-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/38">
                    Select a substance
                  </p>
                  <div className="mt-6 grid gap-2">
                    {withdrawalBySubstance.map((item, index) => {
                      const Icon = item.icon;
                      const isActive = index === activeWithdrawal;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setActiveWithdrawal(index)}
                          className={`group flex items-center gap-4 rounded-2xl border px-4 py-4 text-left transition duration-300 ${
                            isActive
                              ? "border-brand/45 bg-brand text-white shadow-[0_14px_35px_rgba(241,152,133,0.22)]"
                              : "border-white/8 bg-white/[0.035] text-white/62 hover:border-white/18 hover:bg-white/[0.07] hover:text-white"
                          }`}
                        >
                          <span
                            className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
                              isActive ? "bg-white/20 text-white" : "bg-white/8"
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                          </span>
                          <span className="font-semibold">{item.label}</span>
                          <ArrowRight
                            className={`ml-auto h-4 w-4 transition ${
                              isActive
                                ? "translate-x-0 opacity-100"
                                : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
                <p className="mt-8 text-sm leading-6 text-white/38">
                  Always seek professional advice before stopping any substance.
                </p>
              </div>

              <div className="relative flex overflow-hidden rounded-[2.1rem] bg-[#fff9f5] p-7 text-graphite md:p-10">
                <div
                  key={currentWithdrawal.id}
                  className="relative flex w-full flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-5">
                      <span className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white">
                        <WithdrawalIcon className="h-3.5 w-3.5" />
                        {currentWithdrawal.eyebrow}
                      </span>
                      <span className="text-sm font-semibold text-graphite/30">
                        0{activeWithdrawal + 1} / 04
                      </span>
                    </div>
                    <h3 className="mt-8 text-[clamp(1.75rem,3.5vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.045em]">
                      {currentWithdrawal.title}
                    </h3>
                    <p className="mt-4 max-w-xl text-lg leading-8 text-muted">
                      {currentWithdrawal.text}
                    </p>
                    <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                      {currentWithdrawal.symptoms.map((symptom) => (
                        <li key={symptom} className="flex items-center gap-2 text-sm text-graphite/75">
                          <Check className="h-3.5 w-3.5 shrink-0 text-brand" />
                          {symptom}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-8 border-t border-graphite/10 pt-6">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
                      Timeline
                    </p>
                    <p className="mt-2 font-semibold text-graphite">{currentWithdrawal.timeline}</p>
                    <p className="mt-4 rounded-2xl border border-brand/20 bg-brand/8 p-4 text-sm leading-6 text-graphite/75">
                      {currentWithdrawal.note}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <motion.div {...fadeIn} className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button type="button" onClick={openLiveChat}>
              Speak about withdrawal safely <MessageCircle className="h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── Drug Rehab vs Drug Detox ─────────────────────────── */}
      <section id="detox-vs-rehab" className="scroll-mt-24 px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Drug rehab vs drug detox"
            title="Two different things. Both matter."
            text="Detox and rehab are often confused — and both are important. Understanding the difference helps you or someone you care about find the right level of support."
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <motion.div {...fadeIn} className="overflow-hidden rounded-[2rem] border border-graphite/10 bg-porcelain">
              <div className="flex items-center gap-4 border-b border-graphite/10 px-8 py-6">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-brand shadow-sm">
                  <Stethoscope className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">Phase one</p>
                  <h3 className="text-2xl font-semibold tracking-[-0.035em]">Drug Detox</h3>
                </div>
              </div>
              <div className="divide-y divide-graphite/8 px-8">
                {rehabVsDetox.map((row) => (
                  <div key={row.aspect} className="py-5">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand/70">
                      {row.aspect}
                    </p>
                    <p className="mt-1.5 leading-7 text-muted">{row.detox}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.08 }} className="overflow-hidden rounded-[2rem] border border-brand/20 bg-brand/5">
              <div className="flex items-center gap-4 border-b border-brand/15 px-8 py-6">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-brand shadow-sm">
                  <HeartHandshake className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">Phase two</p>
                  <h3 className="text-2xl font-semibold tracking-[-0.035em]">Drug Rehab</h3>
                </div>
              </div>
              <div className="divide-y divide-brand/12 px-8">
                {rehabVsDetox.map((row) => (
                  <div key={row.aspect} className="py-5">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand/70">
                      {row.aspect}
                    </p>
                    <p className="mt-1.5 leading-7 text-muted">{row.rehab}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div {...fadeIn} className="mt-8 rounded-[1.5rem] border border-brand/25 bg-brand-soft/65 p-6 md:flex md:items-center md:justify-between md:gap-8">
            <div className="flex gap-4">
              <BadgeCheck className="mt-1 h-6 w-6 shrink-0 text-brand-ink" />
              <p className="max-w-4xl leading-7 text-graphite/75">
                <strong className="text-graphite">Most people benefit from both.</strong>{" "}
                Detox addresses physical dependency; rehab addresses the deeper causes of addiction
                and equips you for lasting recovery. The Wellbourne Clinic provides both.
              </p>
            </div>
            <a
              href={drugRehabUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex shrink-0 items-center gap-2 font-semibold text-brand-ink underline decoration-brand/40 underline-offset-4 md:mt-0"
            >
              Explore drug rehab <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Why Professional Treatment ───────────────────────── */}
      <section className="bg-porcelain px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Why professional treatment matters"
            title="Addiction is complex. Treatment doesn't have to be."
            text="The right environment, clinical expertise and therapeutic support make a significant difference to outcomes. Here is what residential treatment with The Wellbourne Clinic provides."
          />
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {trustCards.map((item, index) => (
              <motion.div
                key={item.title}
                {...fadeIn}
                transition={{ ...fadeIn.transition, delay: index * 0.06 }}
              >
                <Card
                  onPointerMove={handleSpotlightMove}
                  className="premium-spotlight h-full border-white/80 bg-white/62 shadow-none backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-card"
                >
                  <CardContent className="p-6">
                    <item.icon className="mb-8 h-5 w-5 text-brand" />
                    <h3 className="text-xl font-semibold tracking-[-0.03em]">{item.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-muted md:text-base">{item.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <motion.div {...fadeIn} className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: Clock3, title: "24-hour support", text: "Help is close by throughout the day and night." },
                { icon: Brain, title: "Therapeutic care", text: "Individual and group work to explore triggers and build new patterns." },
                { icon: BedDouble, title: "Protective structure", text: "A substance-free setting with a steady, restorative daily rhythm." },
                { icon: CalendarDays, title: "Aftercare planning", text: "A realistic transition plan shaped around your life and needs." },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  {...fadeIn}
                  transition={{ ...fadeIn.transition, delay: 0.1 + index * 0.06 }}
                  className="flex gap-4 rounded-2xl border border-graphite/10 bg-white p-5 shadow-sm"
                >
                  <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-muted">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.1 }} className="group relative min-h-[430px] overflow-hidden rounded-[2rem] shadow-soft">
              <Image
                src="/images/editorial/family-support.webp"
                alt="A father offering quiet support to his adult son on a park bench"
                fill
                className="object-cover transition duration-700 group-hover:scale-[1.025]"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(17,24,39,0.7)_100%)]" />
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/30 bg-graphite/30 px-5 py-4 text-white backdrop-blur-md">
                <p className="text-sm font-semibold">Recovery rarely affects one person alone.</p>
                <p className="mt-1 text-xs leading-5 text-white/70">
                  Treatment can help rebuild trust, communication and a steadier way forward.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Google Reviews ───────────────────────────────────── */}
      <section className="overflow-hidden px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeIn} className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <Image
                src="/images/google-rating.png"
                alt="Google 5-star rating"
                width={200}
                height={74}
                className="h-auto w-[140px] sm:w-[200px]"
              />
              <div className="hidden sm:block">
                <div className="flex items-center gap-1 text-[#F19885]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="mt-1 text-sm font-semibold text-muted">Rated 5 stars on Google</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={showPreviousReview}
                aria-label="Previous review"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-graphite/12 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-card"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
              </button>
              <button
                type="button"
                onClick={showNextReview}
                aria-label="Next review"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-graphite/12 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-card"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>

          <motion.div
            {...fadeIn}
            className="relative mt-8 overflow-hidden rounded-[2rem] border border-graphite/10 bg-white p-8 shadow-card md:p-10"
            onMouseEnter={() => setIsReviewPaused(true)}
            onMouseLeave={() => setIsReviewPaused(false)}
          >
            <div className="mb-6 flex items-center gap-1 text-[#F19885]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>
            {googleReviews.map((review, index) => (
              <motion.div
                key={review.name}
                initial={false}
                animate={{ opacity: activeReview === index ? 1 : 0, y: activeReview === index ? 0 : 12 }}
                transition={{ duration: 0.6, ease: smoothEase }}
                className={`${activeReview === index ? "relative" : "absolute inset-0 p-8 md:p-10"}`}
              >
                <blockquote className="max-w-3xl text-2xl font-semibold leading-tight tracking-[-0.035em] text-graphite md:text-3xl">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>
                <div className="mt-6 flex items-center gap-4">
                  <GoogleLogo className="h-6 w-6" />
                  <div>
                    <p className="font-semibold">{review.name}</p>
                    <p className="text-sm text-muted">{review.meta} · {review.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
            <div className="mt-6 flex gap-1.5">
              {googleReviews.map((review, index) => (
                <button
                  key={review.name}
                  type="button"
                  aria-label={`Review by ${review.name}`}
                  onClick={() => setActiveReview(index)}
                  className={`h-1.5 rounded-full transition-all ${
                    activeReview === index ? "w-6 bg-brand" : "w-1.5 bg-graphite/20"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQs ─────────────────────────────────────────────── */}
      <section id="faqs" className="scroll-mt-24 bg-porcelain px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
            <div>
              <motion.div {...fadeIn}>
                <SectionLabel>Common questions</SectionLabel>
                <h2 className="text-balance font-heading text-[2.4rem] font-semibold leading-[1.02] tracking-[-0.045em] md:text-[4.35rem]">
                  Questions about drug rehab and detox.
                </h2>
              </motion.div>
              <motion.div {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.08 }} className="mt-10">
                <Accordion type="single" collapsible>
                  {faqs.map((faq) => (
                    <AccordionItem key={faq.question} value={faq.question}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            </div>

            <motion.div {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.1 }} className="lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-[2rem] bg-midnight text-white shadow-editorial">
                <BackgroundGradientAnimation
                  gradientBackgroundStart="rgb(13, 22, 33)"
                  gradientBackgroundEnd="rgb(5, 10, 18)"
                  firstColor="241, 152, 133"
                  secondColor="80, 130, 255"
                  thirdColor="100, 220, 200"
                  fourthColor="180, 80, 200"
                  fifthColor="241, 152, 133"
                  pointerColor="241, 152, 133"
                  size="70%"
                  containerClassName="h-full"
                >
                  <div className="relative p-8 md:p-10">
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/55">
                      {faqCardMessages[activeFaqMessage]}
                    </p>
                    <h3 className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-4xl">
                      A private conversation costs nothing.
                    </h3>
                    <p className="mt-5 leading-7 text-white/65">
                      Our team will listen without judgement, answer your questions and help you
                      understand what the right next step might be.
                    </p>
                    <div className="mt-8 grid gap-3">
                      <Button type="button" onClick={openLiveChat} className="w-full">
                        Chat with us now <MessageCircle className="h-5 w-5" />
                      </Button>
                      <a
                        href={phoneHref}
                        className="flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-4 text-sm font-bold text-white transition hover:bg-white/10"
                      >
                        <Phone className="h-4 w-4" />
                        {phoneNumber}
                      </a>
                    </div>
                  </div>
                </BackgroundGradientAnimation>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Article Rail ─────────────────────────────────────── */}
      <section className="overflow-hidden bg-midnight py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <motion.div {...fadeIn} className="flex items-end justify-between gap-6">
            <div>
              <SectionLabel>Substance-specific guides</SectionLabel>
              <h2 className="mt-2 text-balance font-heading text-[2.15rem] font-semibold leading-[1.04] tracking-[-0.04em] text-white md:text-[3.5rem]">
                Read more on The Wellbourne Clinic.
              </h2>
            </div>
            <a
              href={mainSiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden shrink-0 items-center gap-2 text-sm font-semibold text-white/55 transition hover:text-white lg:flex"
            >
              Visit site <ExternalLink className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
        <motion.div
          {...fadeIn}
          ref={articleRailRef}
          className="article-rail no-scrollbar mt-12 flex gap-7 overflow-x-auto pl-[max(1.25rem,calc((100vw-80rem)/2))] pr-5"
          onMouseEnter={() => setIsArticleRailPaused(true)}
          onMouseLeave={() => setIsArticleRailPaused(false)}
        >
          {[...articles, ...articles].map((article, index) => (
            <a
              key={`${article.title}-${index}`}
              href={article.href}
              target="_blank"
              rel="noopener noreferrer"
              className="article-card group relative flex w-[min(80vw,380px)] shrink-0 flex-col overflow-hidden rounded-[2rem] bg-graphite shadow-editorial transition duration-300 hover:-translate-y-2"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="380px"
                />
                <div className={`absolute inset-0 bg-gradient-to-b ${article.tone}`} />
                <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-white backdrop-blur">
                  {article.readTime}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">
                  {article.category}
                </p>
                <h3 className="mt-3 text-xl font-semibold leading-tight tracking-[-0.03em] text-white">
                  {article.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-white/55">{article.text}</p>
                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-brand">
                  Read more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </div>
            </a>
          ))}
        </motion.div>
      </section>

      {/* ── Guide Links ──────────────────────────────────────── */}
      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeIn} className="mb-10">
            <SectionLabel>Treatment information</SectionLabel>
            <h2 className="mt-2 text-balance font-heading text-[2rem] font-semibold tracking-[-0.04em] text-graphite md:text-[3rem]">
              Further reading and resources.
            </h2>
          </motion.div>
          <motion.div {...fadeIn} className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {guideLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-3 rounded-2xl border border-graphite/10 bg-white px-5 py-4 text-sm font-semibold text-muted shadow-sm transition hover:-translate-y-0.5 hover:border-brand/30 hover:text-graphite hover:shadow-card"
              >
                {link.title}
                <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-0 transition group-hover:opacity-100" />
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Footer / CTA ─────────────────────────────────────── */}
      <footer className="relative overflow-hidden bg-[#060914] px-5 py-16 text-white md:px-8 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(241,152,133,0.28),transparent_34%),radial-gradient(circle_at_88%_28%,rgba(80,130,255,0.22),transparent_34%),linear-gradient(180deg,#0c1224_0%,#050711_100%)]" />
        <div className="absolute inset-0 soft-grid opacity-[0.08]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div>
              <Image
                src="/mainlogo.png"
                alt="The Wellbourne Clinic"
                width={340}
                height={50}
                className="h-auto w-[280px] brightness-0 invert sm:w-[340px]"
              />
              <h2 className="mt-10 max-w-4xl text-[3.2rem] font-semibold leading-[0.96] tracking-[-0.065em] md:text-[5.8rem]">
                We&rsquo;re here whenever you&rsquo;re ready.
              </h2>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/68 md:text-xl">
                Speak with us privately about drug rehab, drug detox or any questions about
                addiction treatment. We&rsquo;ll listen without judgement and help you understand
                what the next step could look like.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button type="button" onClick={openLiveChat}>
                  Contact the clinic <MessageCircle className="h-5 w-5" />
                </Button>
                <Button asChild variant="secondary">
                  <a href={mainSiteUrl} target="_blank" rel="noopener noreferrer">
                    Visit main website <ExternalLink className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              <a
                href={phoneHref}
                className="group flex items-center gap-5 rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-5 backdrop-blur transition hover:-translate-y-1 hover:bg-white/[0.12]"
              >
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand text-white shadow-card transition group-hover:scale-105">
                  <Phone className="h-8 w-8" />
                </span>
                <span>
                  <span className="block text-sm font-semibold uppercase tracking-[0.16em] text-white/45">Call now</span>
                  <span className="mt-1 block text-2xl font-bold tracking-[-0.04em]">{phoneNumber}</span>
                </span>
              </a>
              <a
                href={`mailto:${emailAddress}`}
                className="group flex items-center gap-5 rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-5 backdrop-blur transition hover:-translate-y-1 hover:bg-white/[0.12]"
              >
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white text-graphite shadow-card transition group-hover:scale-105">
                  <Mail className="h-8 w-8" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold uppercase tracking-[0.16em] text-white/45">Email</span>
                  <span className="mt-1 block truncate text-xl font-bold tracking-[-0.04em] md:text-2xl">{emailAddress}</span>
                </span>
              </a>
              <a
                href={whatsappUrl}
                className="group flex items-center gap-5 rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-5 backdrop-blur transition hover:-translate-y-1 hover:bg-white/[0.12]"
              >
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#25D366] text-white shadow-card transition group-hover:scale-105">
                  <MessageCircle className="h-8 w-8" />
                </span>
                <span>
                  <span className="block text-sm font-semibold uppercase tracking-[0.16em] text-white/45">WhatsApp</span>
                  <span className="mt-1 block text-2xl font-bold tracking-[-0.04em]">Message us</span>
                </span>
              </a>
              <button
                type="button"
                onClick={openLiveChat}
                className="group flex w-full items-center gap-5 rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-5 text-left backdrop-blur transition hover:-translate-y-1 hover:bg-white/[0.12]"
              >
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand text-white shadow-card transition group-hover:scale-105">
                  <MessageCircle className="h-8 w-8" />
                </span>
                <span>
                  <span className="block text-sm font-semibold uppercase tracking-[0.16em] text-white/45">Live chat</span>
                  <span className="mt-1 block text-2xl font-bold tracking-[-0.04em]">Speak to us now</span>
                </span>
              </button>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-white/45">
              Copyright 2026 The Wellbourne Clinic. For urgent medical help, call 999.
            </p>
            <div className="flex gap-3">
              <a
                href={instagramUrl}
                aria-label="Instagram"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.07] text-white transition hover:-translate-y-1 hover:bg-white hover:text-graphite"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={facebookUrl}
                aria-label="Facebook"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.07] text-white transition hover:-translate-y-1 hover:bg-white hover:text-graphite"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="mt-8 flex justify-center border-t border-white/10 pt-8 md:justify-start">
            <Image
              src="/new images/CQC-Registered-scaled-1.png"
              alt="Regulated by the Care Quality Commission"
              width={480}
              height={252}
              className="h-auto w-[220px] rounded-[0.8rem]"
            />
          </div>
        </div>
      </footer>

      <LiveChatWidget
        license="19292596"
        visibility={chatVisibility}
        onVisibilityChanged={({ visibility }) =>
          setChatVisibility(visibility === "maximized" ? "maximized" : "minimized")
        }
      />
    </main>
  );
}
