import { useRef, useState } from 'react';
import './fileInput.css';

export default function FileInput({
  title,
  icon,
  customClass,
  style,
  name,
  value,
  onChange,
}) {
  const hiddenFileInput = useRef(null);
  const [fileName, setFileName] = useState(title);
  const handleClick = (e) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (e) => {
    const fileUploaded = e.target.files[0].name;
    setFileName(fileUploaded);
  };
  return (
    <div className='input-file-wrapper'>
      <div className='input-file' onClick={handleClick} onChange={onChange}>
        <label htmlFor=''>{fileName}</label>
        <input
          type='file'
          className={`input`}
          ref={hiddenFileInput}
          onChange={handleChange}
          name={name}
          value={value}
        />
        <img src={icon} alt='' style={style} />
      </div>
    </div>
  );
}
