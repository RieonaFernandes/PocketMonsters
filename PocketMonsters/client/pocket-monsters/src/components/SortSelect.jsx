// components/SortSelect.jsx
export default function SortSelect({ title, value, onChange }) {
  const options = [
    { label: "Name A-Z", value: { sortBy: "name", sortOrder: 1 } },
    { label: "Name Z-A", value: { sortBy: "name", sortOrder: -1 } },
    { label: "Lowest Number First", value: { sortBy: "uid", sortOrder: 1 } },
    { label: "Highest Number First", value: { sortBy: "uid", sortOrder: -1 } },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-2 text-center text-gray-700">
        {title}
      </h3>
      <select
        value={JSON.stringify(value)}
        onChange={(e) => onChange(JSON.parse(e.target.value))}
        className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {options.map((option) => (
          <option key={option.label} value={JSON.stringify(option.value)}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
