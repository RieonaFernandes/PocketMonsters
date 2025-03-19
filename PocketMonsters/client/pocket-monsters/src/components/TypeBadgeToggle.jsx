export default function TypeBadgeToggle({ type, onClick, isSelected }) {
  return (
    <button
      onClick={onClick}
      className={`px-2 py-1 text-sm rounded-full capitalize transition-transform ${
        isSelected
          ? "ring-2 ring-white ring-offset-2 scale-105"
          : "cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110"
      }`}
      style={{
        backgroundColor: `var(--type-${type})`,
        color: "white",
      }}
    >
      {type}
      {isSelected && <span className="ml-1.5">✓</span>}
    </button>
  );
}
