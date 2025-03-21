import TypeBadgeToggle from "./TypeBadgeToggle";

export default function FiltersSection({
  title,
  options,
  selectedValues,
  onToggle,
}) {
  return (
    <div className="flex flex-col p-4 rounded-lg shadow-lg backdrop-blur-lg">
      <label className="text-md font-medium text-gray-700 p-2 text-center">
        {title}
      </label>
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
