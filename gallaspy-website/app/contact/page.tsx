import type { Metadata } from "next";
import ContactForm from "@/components/forms/ContactForm";
import { Navbar } from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Contact | The Gallaspy Golf & Country Club",
  description:
    "Contact The Gallaspy Development Group regarding membership, investment, partnerships, development, or The Gallaspy Golf & Country Club.",
};

const inquiryTypes = [
  {
    title: "Membership",
    description:
      "Learn about future membership opportunities, club access, lifestyle benefits, and the Founding 250.",
  },
  {
    title: "Investment",
    description:
      "Request information regarding the development program, financing strategy, and qualified investment conversations.",
  },
  {
    title: "Strategic Partnerships",
    description:
      "Connect with us regarding development, hospitality, wellness, golf, real estate, construction, or community partnerships.",
  },
];

export default function ContactPage() {
  return (
    <main className="bg-[#F7F4EE] text-[#10263F]">
      <Navbar />

      <section
        className="relative flex min-h-[68vh] items-center justify-center overflow-hidden bg-cover bg-center px-5 pt-28 sm:px-8 lg:px-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(7,24,43,0.64), rgba(7,24,43,0.86)), url('/images/clubhouse.png')",
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
            Connect with The Gallaspy Development Group regarding membership,
            investment, strategic partnerships, development opportunities, or
            the future of The Gallaspy Golf &amp; Country Club.
          </p>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#B89146]">
              How We Can Help
            </p>

            <h2 className="mt-5 font-serif text-4xl font-light leading-tight sm:text-5xl md:text-6xl">
              A Destination Built Through Relationships
            </h2>

            <div className="mx-auto mt-7 h-px w-20 bg-[#B89146]" />

            <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-[#56616B] sm:text-lg">
              Whether you are interested in becoming a future member,
              participating as a strategic partner, or learning more about the
              development opportunity, we welcome the conversation.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {inquiryTypes.map((item) => (
              <article
                key={item.title}
                className="rounded-[24px] border border-[#10263F]/10 bg-white p-8 shadow-[0_14px_45px_rgba(16,38,63,0.08)]"
              >
                <div className="h-px w-14 bg-[#B89146]" />

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

      <section className="bg-white px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div className="lg:sticky lg:top-32">
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#B89146]">
              Send an Inquiry
            </p>

            <h2 className="mt-5 font-serif text-4xl font-light leading-tight sm:text-5xl">
              Connect With Our Development Team
            </h2>

            <div className="mt-7 h-px w-20 bg-[#B89146]" />

            <p className="mt-7 text-base leading-8 text-[#56616B]">
              Please complete the inquiry form and select the area that best
              represents your interest. Your message will be directed to the
              appropriate contact.
            </p>

            <div className="mt-10 rounded-[24px] bg-[#10263F] p-7 text-white sm:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#FFD76A]">
                The Gallaspy Development Group
              </p>

              <p className="mt-5 font-serif text-3xl font-light">
                Metro Atlanta, Georgia
              </p>

              <div className="mt-7 space-y-4 text-sm leading-7 text-white/75">
                <p>
                  Development of The Gallaspy Golf &amp; Country Club is
                  currently in its planning and pre-development stage.
                </p>

                <p>
                  Meetings and project materials are available by appointment
                  or upon request.
                </p>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      <section className="bg-[#10263F] px-5 py-20 text-center text-white sm:px-8 sm:py-24 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#FFD76A]">
            A Legacy in the Making
          </p>

          <h2 className="mt-5 font-serif text-4xl font-light leading-tight sm:text-5xl md:text-6xl">
            Building Something Worth Believing In
          </h2>

          <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-white/75 sm:text-lg">
            The Gallaspy Golf &amp; Country Club is being created through
            vision, disciplined planning, strategic collaboration, and a
            commitment to building long-term value for members, partners, and
            the community.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}