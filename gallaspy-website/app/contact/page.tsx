import type { Metadata } from "next";
import ContactForm from "@/components/forms/ContactForm";
import { Navbar } from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Contact | The Gallaspy Golf Club",
  description:
    "Contact The Gallaspy regarding golf, upcoming events, the Founding 100, The Gallaspy Invitational, partnerships, property opportunities, media, or general inquiries.",
};

const inquiryTypes = [
  {
    number: "01",
    title: "Golf & Club Events",
    description:
      "Questions about Gallaspy Rounds, upcoming golf, the Club Calendar, guest opportunities, or other Gallaspy gatherings.",
  },
  {
    number: "02",
    title: "Founding Community",
    description:
      "Connect with us regarding the Falcon Society, the Founding 100, the application process, or the opening chapter of The Gallaspy.",
  },
  {
    number: "03",
    title: "Invitational & Sponsorship",
    description:
      "Contact us regarding The Gallaspy Invitational, player participation, sponsorship, hospitality, partnerships, or brand activation.",
  },
  {
    number: "04",
    title: "Partnerships & Property",
    description:
      "Connect regarding strategic collaboration, professional services, Georgia golf properties, land opportunities, or relationships that may support the long-term vision.",
  },
  {
    number: "05",
    title: "Media & Press",
    description:
      "Reach out regarding interviews, editorial coverage, photography, media requests, or public information about The Gallaspy.",
  },
  {
    number: "06",
    title: "General Inquiry",
    description:
      "For anything else related to The Gallaspy or The Gallaspy Development Group, LLC, send us a message.",
  },
];

export default function ContactPage() {
  return (
    <main className="bg-[#F7F4EE] text-[#10263F]">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#10263F] px-5 pb-20 pt-36 text-white sm:px-8 sm:pb-24 sm:pt-40 lg:px-10 lg:pb-28 lg:pt-48">
        <div className="absolute left-[12%] top-0 h-full w-px bg-white/[0.05]" />
        <div className="absolute right-[18%] top-0 h-full w-px bg-white/[0.05]" />

        <div className="relative mx-auto w-full max-w-[1060px]">
          <p className="text-[9px] font-bold uppercase tracking-[0.38em] text-[#D2AF66]">
            Contact The Gallaspy
          </p>

          <h1 className="mt-7 max-w-4xl font-serif text-[3.6rem] font-light leading-[0.94] sm:text-6xl lg:text-[5.4rem]">
            Start a
            <span className="block text-[#D2AF66]">conversation.</span>
          </h1>

          <div className="mt-9 h-px w-16 bg-[#B89146]" />

          <p className="mt-8 max-w-2xl text-base leading-8 text-white/72 sm:text-lg sm:leading-9">
            Whether your interest begins with golf, an upcoming event, the
            founding community, a partnership, or simply learning more, we
            welcome the opportunity to connect.
          </p>
        </div>
      </section>

      {/* INQUIRY TYPES */}
      <section className="px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="mx-auto w-full max-w-[1060px]">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
                Get in Touch
              </p>

              <h2 className="mt-5 font-serif text-[2.7rem] font-light leading-[1.04] sm:text-5xl">
                Find the right
                <span className="block text-[#8B6A34]">conversation.</span>
              </h2>
            </div>

            <p className="max-w-2xl text-base leading-8 text-[#33475B]/72 lg:pt-10">
              The Gallaspy is being established through real golf experiences,
              relationships, competitions, gatherings, partnerships, and the
              people choosing to participate at the beginning.
            </p>
          </div>

          <div className="mt-14 grid border-t border-[#10263F]/15 md:grid-cols-2 lg:grid-cols-3">
            {inquiryTypes.map((item) => (
              <article
                key={item.title}
                className="border-b border-[#10263F]/15 py-8 md:px-7 md:first:pl-0 lg:min-h-[245px]"
              >
                <p className="text-[9px] font-bold tracking-[0.22em] text-[#B89146]">
                  {item.number}
                </p>

                <h3 className="mt-5 font-serif text-2xl font-light sm:text-3xl">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-[#33475B]/70">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="bg-white px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="mx-auto grid w-full max-w-[1060px] gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20 lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="text-[9px] font-bold uppercase tracking-[0.34em] text-[#B89146]">
              Send an Inquiry
            </p>

            <h2 className="mt-5 font-serif text-[2.7rem] font-light leading-[1.04] sm:text-5xl">
              Connect with
              <span className="block text-[#8B6A34]">The Gallaspy.</span>
            </h2>

            <div className="mt-7 h-px w-14 bg-[#B89146]" />

            <p className="mt-7 max-w-md text-base leading-8 text-[#33475B]/72">
              Complete the form and select the area that most closely matches
              your inquiry. If none fits perfectly, choose General Inquiry.
            </p>

            <div className="mt-10 border-t border-[#10263F]/15 pt-8">
              <p className="text-[9px] font-bold uppercase tracking-[0.26em] text-[#B89146]">
                The Gallaspy Development Group, LLC
              </p>

              <p className="mt-4 font-serif text-2xl font-light">
                Georgia
              </p>

              <div className="mt-5 space-y-4 text-sm leading-7 text-[#33475B]/68">
                <p>
                  The Gallaspy is currently establishing its golf programming,
                  founding community, annual competitions, gatherings, and club
                  traditions.
                </p>

                <p>
                  The long-term vision remains a permanent private golf and
                  country club in Georgia. No permanent club property is
                  represented as currently secured.
                </p>

                <p>
                  General inquiries may also be directed to{" "}
                  <span className="font-semibold text-[#10263F]">
                    info@thegallaspy.com
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
      <section className="bg-[#163A2F] px-5 py-20 text-white sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[900px] text-center">
          <p className="text-[9px] font-bold uppercase tracking-[0.34em] text-[#D2AF66]">
            The Opening Chapter
          </p>

          <h2 className="mt-6 font-serif text-[2.7rem] font-light leading-[1.04] sm:text-5xl">
            Some of the most important
            <span className="block text-[#D2AF66]">
              relationships start with an introduction.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-white/70">
            If there is a meaningful way for you to participate, collaborate,
            or contribute to what The Gallaspy is becoming, we would like to
            hear from you.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
