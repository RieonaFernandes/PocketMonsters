export default function SearchInput({
  value,
  onChange,
  onKeyPress,
  isInvalid,
}) {
  return (
    <div className="mb-8 max-w-md mx-auto">
      <input
        type="text"
        placeholder="Search Pokémon by name or number..."
        value={value}
        onChange={onChange}
        onKeyDown={onKeyPress}
        pattern="[a-zA-Z0-9]*"
        title="Only letters and numbers are allowed"
        className={
          "bg-white/25 focus:bg-white/45 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" +
          ` border ${
            isInvalid ? "border-red-500 shake-animation" : "border-gray-300"
          }`
        }
      />
      {isInvalid && (
        <p className="text-red-500 text-xs mt-1">
          Only letters, numbers, and spaces are allowed
        </p>
      )}
      <p className="text-sm text-gray-500 mt-1 text-center">
        Search by name (e.g. "charizard") or number (e.g. "006")
      </p>
    </div>
  );
}
