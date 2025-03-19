import TypeBadgeToggle from "./TypeBadgeToggle";

export default function FiltersSection({
  title,
  options,
  selectedValues,
  onToggle,
}) {
  return (
    <div className="flex flex-col bg-white p-4 rounded-lg shadow-lg">
      <h3 className="text-center text-lg font-semibold mb-3 text-gray-700">
        {title}
      </h3>
      <div className="flex flex-wrap text-center justify-center gap-2">
        {options?.map((option) => (
          <TypeBadgeToggle
            key={option.name}
            type={option.name}
            onClick={() => onToggle(option.name)}
            isSelected={selectedValues.includes(option.name)}
          />
        ))}
      </div>
    </div>
  );
}
