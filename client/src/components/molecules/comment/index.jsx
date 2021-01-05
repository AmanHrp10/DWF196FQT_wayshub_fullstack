import './comment.css';

export default function Comment({ img, text, channel }) {
  return (
    <div className='comments'>
      <img src={img} alt='' style={{ objectFit: 'cover' }} />
      <div className='comment'>
        <span className='text-secondary'>{channel}</span>
        <p
          style={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            width: '100%',
            display: 'inline-block',
          }}
        >
          {text}
        </p>
      </div>
    </div>
  );
}
