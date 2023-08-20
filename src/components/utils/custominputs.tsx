export const CustomInput = ({
  name,
  type,
  value,
  defaultValue,
  values,
  handleChange,
  title,
}: {
  name: string;
  type: string;
  defaultValue?: string;
  value?: string;
  values?: { value: string; label: string }[];
  handleChange: (e: React.ChangeEvent<any>) => void;
  title: string;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name}>{title}</label>
      {type === "select" ? (
        <select
          onChange={handleChange}
          name={name}
          className="border border-gray-300 rounded-md p-2"
        >
          {values &&
            values.map((value) => (
              <option key={value.value} value={value.value}>
                {value.label}
              </option>
            ))}
        </select>
      ) : (
        <input
          onChange={handleChange}
          name={name}
          defaultValue={defaultValue}
          className="border border-gray-300 rounded-md p-2"
        />
      )}
    </div>
  );
};
