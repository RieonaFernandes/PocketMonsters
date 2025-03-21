import { Listbox } from "@headlessui/react";

export default function SortSelect({ title, value, onChange }) {
  const options = [
    { label: "Number Ascending", value: { sortBy: "uid", sortOrder: 1 } },
    { label: "Number Descending", value: { sortBy: "uid", sortOrder: -1 } },
    { label: "Name A-Z", value: { sortBy: "name", sortOrder: 1 } },
    { label: "Name Z-A", value: { sortBy: "name", sortOrder: -1 } },
  ];

  return (
    <div className="space-y-2">
      <label className="text-md font-semibold text-gray-600 flex items-cente mb-2 px-2">
        {title}
      </label>
      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <Listbox.Button className="w-full p-2 text-left rounded-lg border border-[#A3C9F1]/30 bg-white/40 focus:outline-none focus:ring-2 focus:ring-[#D1A7E0] transition-all hover:bg-[#F9E265]/20 cursor-pointer">
            {
              options.find(
                (opt) => JSON.stringify(opt.value) === JSON.stringify(value)
              )?.label
            }
          </Listbox.Button>

          <Listbox.Options className=" w-full mt-1 rounded-lg bg-white/55 backdrop-blur-lg shadow-lg overflow-hidden border border-[#A3C9F1]/20">
            {options.map((option) => (
              <Listbox.Option
                key={option.label}
                value={option.value}
                className={({ active }) =>
                  `p-2 cursor-pointer transition-colors ${
                    active
                      ? "bg-gradient-to-r from-[#F9E265]/30 to-[#D1A7E0]/30"
                      : "text-[#5A7D9D]"
                  }`
                }
              >
                {option.label}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}
