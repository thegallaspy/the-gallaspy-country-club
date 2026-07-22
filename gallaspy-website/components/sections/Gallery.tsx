import Image from "next/image";

const images = [
  {
    src: "/images/arrival.png",
    title: "Arrival Experience",
  },
  {
    src: "/images/clubhouse.png",
    title: "The Clubhouse",
  },
  {
    src: "/images/golf.png",
    title: "Championship Golf",
  },
  {
    src: "/images/wellness.png",
    title: "Wellness & Spa",
  },
  {
    src: "/images/mercurystreet.png",
    title: "Mercury Street Restaurant",
  },
  {
    src: "/images/vineyard.png",
    title: "Private Vineyard",
  },
  {
    src: "/images/lodging.png",
    title: "Member Lodging",
  },
];

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="bg-[#F7F5F1] py-28"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">

          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-[#B68B3A]">
            Gallery
          </p>

          <h2 className="mb-6 text-5xl font-serif text-[#183028]">
            Experience The Vision
          </h2>

          <p className="mx-auto max-w-3xl text-lg leading-8 text-gray-600">
            Explore a collection of architectural renderings showcasing the
            future vision of The Gallaspy Golf & Country Club.
          </p>

        </div>

        <div className="grid gap-10 md:grid-cols-2">

          {images.map((image) => (

            <div
              key={image.src}
              className="group overflow-hidden rounded-3xl bg-white shadow-xl transition duration-300 hover:-translate-y-2"
            >

              <div className="relative h-[420px]">

                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

              </div>

              <div className="p-8">

                <h3 className="text-3xl font-serif text-[#183028]">
                  {image.title}
                </h3>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}