import { WellbourneMicrosite } from "@/components/wellbourne-microsite";

export default function Home() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is it safe to stop taking drugs suddenly?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It depends on the substance. Stopping heroin, benzodiazepines or alcohol suddenly can cause serious and potentially dangerous withdrawal symptoms. Always seek professional medical advice before stopping and call 999 if someone has a seizure, loses consciousness or becomes difficult to wake.",
        },
      },
      {
        "@type": "Question",
        name: "What is a medically assisted drug detox?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A medically assisted drug detox is a planned withdrawal from substances following clinical assessment. Depending on the drug involved, prescribed medication may be used to reduce withdrawal symptoms and risks, alongside monitoring and support.",
        },
      },
      {
        "@type": "Question",
        name: "How long does drug detox take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It varies by substance. Heroin withdrawal typically peaks over 2–3 days and settles within 5–10 days. Benzodiazepine detox can take weeks or months with a gradual reduction. Cannabis withdrawal usually resolves over 2–3 weeks. Individual history and health also affect the timescale.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between drug detox and drug rehab?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Drug detox manages the physical process of withdrawal from substances. Drug rehab addresses the psychological, behavioural and social factors connected with addiction through therapy, structure, recovery planning and aftercare. Detox is often the first step; rehab supports longer-term change.",
        },
      },
      {
        "@type": "Question",
        name: "Which drugs does The Wellbourne Clinic treat?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Wellbourne Clinic provides treatment for a range of drug addictions including cocaine, cannabis, prescription drugs such as benzodiazepines, codeine and tramadol, heroin and other opioids.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <WellbourneMicrosite />
    </>
  );
}
