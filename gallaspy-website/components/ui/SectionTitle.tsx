type SectionTitleProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionTitleProps) {
  return (
    <div
      className={`mb-20 ${
        align === "center" ? "text-center mx-auto max-w-3xl" : "max-w-2xl"
      }`}
    >
      <p className="mb-4 text-sm uppercase tracking-[0.45em] text-[var(--gold)]">
        {eyebrow}
      </p>

      <h2 className="font-serif text-5xl leading-tight text-[var(--forest)] md:text-6xl">
        {title}
      </h2>

      <div
        className={`mt-8 h-px w-24 bg-[var(--gold)] ${
          align === "center" ? "mx-auto" : ""
        }`}
      />

      {description && (
        <p className="mt-8 text-lg leading-8 text-gray-600">
          {description}
        </p>
      )}
    </div>
  );
}