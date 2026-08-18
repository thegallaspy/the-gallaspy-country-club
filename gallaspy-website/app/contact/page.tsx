import type { Metadata } from "next";
import ContactForm from "@/components/forms/ContactForm";
import { Navbar } from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Contact | The Gallaspy Golf & Country Club",
  description:
    "Contact The Gallaspy Development Group, LLC regarding membership interest, The Gallaspy Invitational, sponsorship, land opportunities, development partnerships, media, or general inquiries.",
};

const inquiryTypes = [
  {
    title: "Membership Interest",
    description:
      "Join the conversation around the future club, Membership Interest List, and Falcon Society.",
  },
  {
    title: "The Gallaspy Invitational",
    description:
      "Contact us regarding player questions, tournament participation, event details, sponsorship, hospitality, or brand activations.",
  },
  {
    title: "Land & Property Opportunities",
    description:
      "Connect with us regarding Georgia land, golf-course properties, development sites, brokerage opportunities, or potential property relationships.",
  },
  {
    title: "Development & Partnerships",
    description:
      "Discuss development, golf, hospitality, construction, operations, professional services, strategic partnerships, or aligned business opportunities.",
  },
  {
    title: "Media & Press",
    description:
      "Reach out regarding interviews, editorial coverage, media requests, photography, partnerships, or public information.",
  },
  {
    title: "General Inquiry",
    description:
      "For anything else related to The Gallaspy, The Gallaspy Development Group, LLC, or the long-term vision, send us a message.",
  },
];

export default function ContactPage() {
  return (
    <main className="bg-[#F7F4EE] text-[#10263F]">
      <Navbar />

      {/* HERO */}
      <section
        className="relative flex min-h-[68vh] items-center justify-center overflow-hidden bg-cover bg-center px-5 pt-28 sm:px-8 lg:px-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(7,24,43,0.64), rgba(7,24,43,0.88)), url('/images/clubhouse.png')",
        }}
      >
        <div className="mx-auto w-full max-w-5xl py-24 text-center text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.5em] text-[#FFD76A] sm:text-sm">
            Contact The Gallaspy
          </p>

          <h1 className="mt-6 font-serif text-5xl font-light leading-[1.02] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            Begin the
            <span className="block">Conversation</span>
          </h1>

          <div className="mx-auto mt-8 h-px w-24 bg-[#D4AF37]" />

          <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-white/80 sm:text-lg">
            Connect with The Gallaspy Development Group, LLC regarding the
            future club, The Gallaspy Invitational, membership interest,
            sponsorship, property opportunities, strategic partnerships, or
            general inquiries.
          </p>
        </div>
      </section>

      {/* INQUIRY TYPES */}
      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#B89146]">
              How We Can Help
            </p>

            <h2 className="mt-5 font-serif text-4xl font-light leading-tight sm:text-5xl md:text-6xl">
              The Right Conversation Starts Here
            </h2>

            <div className="mx-auto mt-7 h-px w-20 bg-[#B89146]" />

            <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-[#56616B] sm:text-lg">
              The Gallaspy is being built through relationships. Whether your
              interest is golf, sponsorship, land, future membership,
              development, media, or partnership, we welcome the opportunity to
              connect.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {inquiryTypes.map((item) => (
              <article
                key={item.title}
                className="group rounded-[24px] border border-[#10263F]/10 bg-white p-8 shadow-[0_14px_45px_rgba(16,38,63,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[#B89146]/35 hover:shadow-[0_20px_55px_rgba(16,38,63,0.11)]"
              >
                <div className="h-px w-14 bg-[#B89146] transition-all duration-300 group-hover:w-20" />

                <h3 className="mt-6 font-serif text-3xl font-light">
                  {item.title}
                </h3>

                <p className="mt-5 text-sm leading-7 text-[#56616B] sm:text-base">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM SECTION */}
      <section className="bg-white px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div className="lg:sticky lg:top-32">
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#B89146]">
              Send an Inquiry
            </p>

            <h2 className="mt-5 font-serif text-4xl font-light leading-tight sm:text-5xl">
              Connect With The Gallaspy
            </h2>

            <div className="mt-7 h-px w-20 bg-[#B89146]" />

            <p className="mt-7 text-base leading-8 text-[#56616B]">
              Complete the inquiry form and select the area that best represents
              your interest. Your message will be routed to the appropriate
              conversation.
            </p>

            <div className="mt-10 rounded-[24px] bg-[#10263F] p-7 text-white sm:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#FFD76A]">
                The Gallaspy Development Group, LLC
              </p>

              <p className="mt-5 font-serif text-3xl font-light">
                Georgia
              </p>

              <div className="mt-7 space-y-4 text-sm leading-7 text-white/75">
                <p>
                  The Gallaspy Golf &amp; Country Club remains in the planning
                  and development stage.
                </p>

                <p>
                  The current focus includes the Gallaspy Invitational, future
                  membership community, strategic partnerships, property
                  opportunities, and long-term club development.
                </p>

                <p>
                  General inquiries may also be directed to
                  <span className="font-semibold text-white">
                    {" "}info@thegallaspy.com
                  </span>
                  .
                </p>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      {/* CLOSING */}
      <section className="bg-[#10263F] px-5 py-20 text-center text-white sm:px-8 sm:py-24 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#FFD76A]">
            A Legacy in the Making
          </p>

          <h2 className="mt-5 font-serif text-4xl font-light leading-tight sm:text-5xl md:text-6xl">
            Built Through Relationships
          </h2>

          <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-white/75 sm:text-lg">
            The Gallaspy is moving forward one conversation, one partnership,
            one event, and one milestone at a time. If you see a way to be part
            of that journey, we would like to hear from you.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}