import SizeIcon from "./sizeIcon";

export default function RangeFilter({ title, options, selected, onSelect }) {
  return (
    <div
      className={"flex flex-col p-4 rounded-lg shadow-lg p-4 backdrop-blur-lg"}
    >
      <label className="text-md font-medium text-gray-700 p-2 text-center">
        {title}
      </label>
      <div className="flex gap-4 justify-center">
        {options?.map((option) => (
          <label
            key={option.id}
            className={`cursor-pointer group ${
              selected?.id === option.id
                ? "ring-1 ring-blue-500 rounded-full p-3"
                : "cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110"
            }`}
          >
            <input
              type="radio"
              name={title}
              value={option.id}
              checked={selected?.id === option.id}
              onChange={() => onSelect(option)}
              className="hidden"
            />

            <div className="flex flex-col items-center">
              <SizeIcon size={option.name.toLowerCase()} category={title} />
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
