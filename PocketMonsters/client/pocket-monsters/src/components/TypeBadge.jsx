export default function TypeBadge({ type }) {
  return (
    <span
      className="px-2 py-1 text-sm rounded-full capitalize"
      style={{
        backgroundColor: `var(--type-${type})`,
        color: "white",
      }}
    >
      {type}
    </span>
  );
}
