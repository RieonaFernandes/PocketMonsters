import SizeIcon from "./SizeIcon";

export default function RangeFilter({ title, options, selected, onSelect }) {
  const handleClick = (option) => {
    if (selected?.id === option.id) {
      onSelect(null);
    } else {
      onSelect(option);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-md font-semibold text-gray-600 flex items-cente mb-2 px-2">
        {title}
      </label>
      <div
        className={
          "flex flex-col p-4 rounded-lg shadow-lg p-4 backdrop-blur-lg"
        }
      >
        <div className="flex gap-4 justify-center">
          {options?.map((option) => (
            <button
              key={option.id}
              onClick={() => handleClick(option)}
              className={`cursor-pointer group transition-transform duration-200 ease-in-out ${
                selected?.id === option.id
                  ? "ring-2 ring-blue-500 rounded-full p-2 scale-110"
                  : "cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110"
              }`}
            >
              <div className="flex flex-col items-center">
                <SizeIcon
                  size={option.name.toLowerCase()}
                  category={title}
                  isSelected={selected?.id === option.id}
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
