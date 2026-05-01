import { useField } from "formik";

export default function CustomInput({
  label,
  icon: Icon,
  rightElement,
  className = "",
  inputClassName = "",
  id,
  ...props
}) {
  const [field, meta] = useField(props);
  const inputId = id || props.name;
  const hasError = meta.touched && meta.error;

  return (
    <div className={`w-full ${className}`}>
      {label ? <label htmlFor={inputId} className="block mb-2 text-sm">{label}</label> : null}

      <div className="relative w-full">
        {Icon ? (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
        ) : null}

        <input
          id={inputId}
          {...field}
          {...props}
          className={`w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary ${
            hasError ? "border-red-500" : "border-input"
          } ${Icon ? "pl-11" : ""} ${rightElement ? "pr-11" : ""} ${inputClassName}`}
        />

        {rightElement ? (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        ) : null}
      </div>

      {hasError ? (
        <p className="mt-2 text-sm text-red-500">{meta.error}</p>
      ) : null}
    </div>
  );
}
