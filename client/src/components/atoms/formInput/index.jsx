export default function Form({
  title,
  customClass,
  type,
  onChange,
  name,
  value,
}) {
  return (
    <input
      type={type}
      className={`form-control ${customClass}`}
      placeholder={title}
      onChange={onChange}
      name={name}
      value={value}
    />
  );
}
