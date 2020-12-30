import { Link } from 'react-router-dom';
import './card.css';

export default function Card({ id, title, channel, image, views, date, key }) {
  return (
    <div className='card mb-3' key={key}>
      <Link to={`/detail-video/${id}`}>
        <div className='card-image'>
          <img
            src={image}
            alt={title}
            className='img-fluid'
            width='100%'
            height='100%'
            style={{}}
          />
        </div>
      </Link>
      <div className='card-footer' style={{ overflow: 'hidden' }}>
        <p
          className='card-title'
          style={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            width: '100%',
            display: 'inline-block',
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </p>
        <p style={{ marginTop: '-10px' }}>{channel}</p>
        <div className='d-flex detail justify-content-between'>
          <span className=''>
            <img
              src='https://1.bp.blogspot.com/-5R6yDH1CVIc/X7_JkVvviUI/AAAAAAAAHI8/YiuSQ72WD7E-ZG1Gnv7TLl14x8D6Q8_fACLcBGAsYHQ/s12/view%2B1.png'
              alt=''
            />
            {views}
          </span>
          <span className='ml-3'>
            <img
              src='https://1.bp.blogspot.com/-CY8gymKURdE/X7_Kdw8lLqI/AAAAAAAAHJE/R75wZ4DE-hsIoUKfafbyMCsFI7jZbjNVgCLcBGAsYHQ/s12/refresh%2B1.png'
              alt=''
            />
            {date}
          </span>
        </div>
      </div>
    </div>
  );
}
