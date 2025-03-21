export default function TypeBadge({ type }) {
  return (
    <span
      className="px-2 py-1 rounded-full capitalize text-sm sm:text-base"
      style={{
        backgroundColor: `var(--type-${type})`,
        color: "white",
      }}
    >
      {type}
    </span>
  );
}
