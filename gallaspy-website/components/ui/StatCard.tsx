type StatCardProps = {
  value: string;
  label: string;
};

export default function StatCard({
  value,
  label,
}: StatCardProps) {
  return (
    <div className="rounded-3xl bg-white p-10 text-center shadow-xl transition duration-300 hover:-translate-y-2">
      <h3 className="font-serif text-5xl text-[var(--forest)]">
        {value}
      </h3>

      <div className="mx-auto my-6 h-px w-12 bg-[var(--gold)]" />

      <p className="uppercase tracking-[0.25em] text-sm text-gray-600">
        {label}
      </p>
    </div>
  );
}