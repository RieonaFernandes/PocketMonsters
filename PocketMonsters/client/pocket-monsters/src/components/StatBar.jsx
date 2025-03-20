export default function StatBar({ statName, value, maxValue = 150 }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-24 text-sm font-medium text-gray-600">{statName}</span>
      <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-500"
          style={{ width: `${(value / maxValue) * 100}%` }}
        />
      </div>
      <span className="w-8 text-right text-sm">{value}</span>
    </div>
  );
}
