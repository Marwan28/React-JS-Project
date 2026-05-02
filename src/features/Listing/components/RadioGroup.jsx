export default function RadioGroup({
  title,
  name,
  options,
  value,
  onChange,
}) {
  return (
    <div>
      <h4 className="text-sm font-medium text-slate-700">
        {title}
      </h4>

      <div className="mt-3 space-y-2">
        {options.map((option) => (
          <label
            key={option.label}
            className="flex items-center gap-3 text-sm text-slate-700"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value == option.value}
              onChange={onChange}
              className="h-4 w-4 text-sky-600 border-slate-300"
            />

            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}