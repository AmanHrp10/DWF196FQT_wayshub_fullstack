export default function TextArea({
  title,
  customClass,
  value,
  name,
  onChange,
  type,
}) {
  return (
    <textarea
      placeholder={title}
      name={name}
      type={type}
      id=''
      cols='30'
      rows='6'
      className={`form-control ${customClass}`}
      value={value}
      onChange={onChange}
    />
  );
}
