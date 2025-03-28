import { FaTimes } from "react-icons/fa";

export default function TypeBadgeToggle({ type, onClick, isSelected }) {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer px-5 py-1 rounded-full capitalize transition-transform ${
        isSelected
          ? "ring-2 ring-white ring-offset-2 scale-105"
          : "cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110"
      }`}
      style={{
        backgroundColor: `var(--type-${type})`,
        color: "white",
      }}
    >
      <div className="text-sm">{type}</div>
      <div className="text-xs font-thin">
        <p
          className={
            isSelected
              ? `cursor-pointer absolute top-1 right-1 text-white`
              : "hidden"
          }
          aria-label="Close"
        >
          <FaTimes className="text-xs font-thin" />
        </p>
      </div>
    </button>
  );
}
