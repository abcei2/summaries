import { FormHookType, SelectOptionsType } from "../../../types";

export const CustomInput = (props: {
  label?: string;
  type?: string;
  placeholder?: string;
  selectOptions?: SelectOptionsType[];
  noLabelOptions?: string[];
  error?: any;
  reactFormHookProps?: FormHookType;
  classNameInput?: string;
}) => {
  const {
    label,
    type = "text",
    placeholder,
    selectOptions,
    noLabelOptions = [],
    error,
    reactFormHookProps,
    classNameInput = "",
    ...otherProps
  } = props;
  return (
    <div className="flex flex-col gap-1">
      {label && <span className="font-semibold capitalize text-sm">{label}</span>}
      {type === "select" ? (
        <select
          {...(reactFormHookProps ?? otherProps)}
          className="border border-gray-300 rounded-md p-2"
        >
          <option value="">{placeholder ?? "Selecciona una opción"}</option>
          {noLabelOptions &&
            noLabelOptions.map((opt, index) => (
              <option key={index} value={opt}>
                {opt}
              </option>
            ))}
          {selectOptions &&
            selectOptions.map((opt, index) => (
              <option key={index} value={opt.value}>
                {opt.label}
              </option>
            ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          {...(reactFormHookProps ?? otherProps)}
          className={`default h-[75px] ${
            error ? "bg-red-100" : "bg-accents-1"
          } border border-gray-300 rounded-md p-2`}
        />
      ) : (
        <input
          type={type ?? "text"}
          step={type === "number" ? "any" : undefined}
          {...(reactFormHookProps ?? otherProps)}
          placeholder={placeholder}
          className={` ${
            error ? "bg-red-100" : "bg-accents-1"
          } border border-gray-300 rounded-md p-2`}
        />
      )}
      {error && <span className="text-red-500">{error.message}</span>}
    </div>
  );
};
