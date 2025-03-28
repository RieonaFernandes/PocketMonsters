import SizeIcon from "./SizeIcon";
import { FaTimes } from "react-icons/fa";
import { useError } from "../hooks/UseError";
import ErrorBoundary from "./ErrorBoundary";
import ErrorFallback from "./ErrorFallback";

export default function RangeFilter({ title, options, selected, onSelect }) {
  const { handleError } = useError();
  let handleClick;
  try {
    handleClick = (option) => {
      if (selected?.id === option.id) {
        onSelect(null);
      } else {
        onSelect(option);
      }
    };
  } catch (error) {
    handleError(new Error("Failed to load Filters."));
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="space-y-2">
        <label className="text-md font-semibold text-gray-600 flex items-center mb-2 px-2">
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
                    ? "ring-2 ring-white rounded-full p-2 scale-110"
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
                <div className="text-xs font-thin">
                  <p
                    className={
                      selected?.id === option.id
                        ? `cursor-pointer absolute -top-1 -right-1 text-white`
                        : "hidden"
                    }
                    aria-label="Close"
                  >
                    <FaTimes className="text-xs font-thin" />
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
