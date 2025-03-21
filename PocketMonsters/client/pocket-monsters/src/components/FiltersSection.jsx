import TypeBadgeToggle from "./TypeBadgeToggle";

export default function FiltersSection({
  title,
  options,
  selectedValues,
  onToggle,
}) {
  return (
    <div className="space-y-2">
      <label className="text-md font-semibold text-gray-600 flex items-cente mb-2 px-2">
        {title}
      </label>
      <div className="flex flex-col p-4 rounded-lg shadow-lg backdrop-blur-lg">
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
    </div>
  );
}
