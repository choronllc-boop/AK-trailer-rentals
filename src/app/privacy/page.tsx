import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | AK Trailer Rentals",
  description: "How AK Trailer Rentals collects, uses, and protects your information.",
};

const sections: { title: string; body: string; list?: string[] }[] = [
  {
    title: "1. Information We Collect",
    body: "At AK Trailer Rentals, we collect information you provide directly to us, such as when you create an account, use our services, or contact us for support. This may include:",
    list: [
      "Name and contact information",
      "Account credentials",
      "Payment information",
      "Communications with us",
      "Usage data and preferences",
    ],
  },
  {
    title: "2. How We Use Your Information",
    body: "We use the information we collect to provide, maintain, and improve our services. Specifically, we may use your information to:",
    list: [
      "Provide and deliver the services you request",
      "Process transactions and send related information",
      "Send technical notices and support messages",
      "Communicate with you about products, services, and events",
      "Monitor and analyze trends and usage",
      "Detect, investigate, and prevent fraudulent transactions",
    ],
  },
  {
    title: "3. Information Sharing",
    body: "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:",
    list: [
      "With service providers who assist us in operating our website and services",
      "When required by law or to respond to legal process",
      "To protect our rights, property, or safety, or that of our users",
      "In connection with a merger, acquisition, or sale of assets",
    ],
  },
  {
    title: "4. Data Security",
    body: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.",
  },
  {
    title: "5. Cookies and Tracking",
    body: "We use cookies and similar tracking technologies to collect and use personal information about you. Cookies are small data files stored on your device that help us improve our services and your experience. You can control cookies through your browser settings.",
  },
  {
    title: "7. Data Retention",
    body: "We retain your personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. When we no longer need your information, we will securely delete or anonymize it.",
  },
  {
    title: "8. Your Rights",
    body: "Depending on your location, you may have certain rights regarding your personal information, including:",
    list: [
      "The right to access and receive a copy of your personal information",
      "The right to rectify or update your personal information",
      "The right to erase your personal information",
      "The right to restrict processing of your personal information",
      "The right to data portability",
      "The right to object to processing",
    ],
  },
  {
    title: "9. Children's Privacy",
    body: "Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.",
  },
  {
    title: "10. International Data Transfers",
    body: "Your information may be transferred to and processed in countries other than your own. We will ensure that any such transfers comply with applicable data protection laws and that your information receives adequate protection.",
  },
  {
    title: "11. Changes to This Policy",
    body: "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the \"Last updated\" date. Your continued use of our services after any changes constitutes acceptance of the new policy.",
  },
  {
    title: "12. Contact Us",
    body: "If you have any questions about this Privacy Policy or our privacy practices, please contact us through our website contact form or email us directly. We will respond to your inquiry within a reasonable timeframe.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-sm font-semibold tracking-wide text-chestnut">LEGAL</p>
      <h1 className="mt-3 font-display text-4xl text-coffee">Privacy Policy</h1>
      <p className="mt-2 text-sm text-coffee/60">Last updated: July 17, 2026</p>

      <div className="mt-10 space-y-8">
        {sections.slice(0, 5).map((section) => (
          <section key={section.title}>
            <h2 className="font-display text-xl text-coffee">{section.title}</h2>
            <p className="mt-3 text-coffee/70">{section.body}</p>
            {section.list && (
              <ul className="mt-3 list-disc space-y-1 pl-5 text-coffee/70">
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <section>
          <h2 className="font-display text-xl text-coffee">6. Bot Protection (Cloudflare Turnstile)</h2>
          <p className="mt-3 text-coffee/70">
            This website uses Cloudflare Turnstile to protect our forms from spam and abuse.
            Turnstile may run invisibly in the background to verify that visitors are human, and
            processes limited device and network information as part of that check. For details,
            see Cloudflare&apos;s{" "}
            <a
              href="https://www.cloudflare.com/en-gb/turnstile-privacy-policy/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-pumpkin hover:text-chestnut"
            >
              Turnstile Privacy Addendum
            </a>
            .
          </p>
        </section>

        {sections.slice(5).map((section) => (
          <section key={section.title}>
            <h2 className="font-display text-xl text-coffee">{section.title}</h2>
            <p className="mt-3 text-coffee/70">{section.body}</p>
            {section.list && (
              <ul className="mt-3 list-disc space-y-1 pl-5 text-coffee/70">
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
