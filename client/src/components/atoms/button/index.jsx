export default function Button({ customClass, title, onClick, type }) {
  return (
    <button className={`btn ${customClass}`} onClick={onClick} type={type}>
      {title}
    </button>
  );
}
