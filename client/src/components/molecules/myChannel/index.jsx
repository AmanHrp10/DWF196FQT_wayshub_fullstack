import { useState, useContext, useEffect } from 'react';

import DefaultProfile from '../../../images/channel/defaultProfile.png';
import { Link } from 'react-router-dom';
import Videos from '../myVideos';
import Desc from '../descriptionChannel';
import './style.css';
import { AppContext } from '../../../context/appContext';
import { API } from '../../../config/api';

export default function MyChannel() {
  let [isDesc, setIsDesc] = useState(false);
  const [state] = useContext(AppContext);
  const { channel } = state;

  const [subscribers, setSubscribers] = useState([]);

  const fetchSubscribe = async () => {
    try {
      const response = await API('/subscribe-count');
      setSubscribers(response.data.count);
    } catch (err) {
      console.log(err);
    }
  };

  const handleVideo = () => {
    setIsDesc((isDesc = !isDesc));
  };
  const handleDescription = () => {
    setIsDesc((isDesc = !isDesc));
  };

  useEffect(() => {
    fetchSubscribe();
  }, []);

  return (
    <>
      <div className='contains'>
        <div className='bg'>
          <img
            src={
              !channel.thumbnail
                ? DefaultProfile
                : `http://localhost:5000/Uploads/${channel.thumbnail}`
            }
            alt=''
            style={{ marginLeft: '70px' }}
            width='100%'
            height='100%'
            className='imgnav'
          />
        </div>
        <div className='about'>
          <div className='profileDesc'>
            <div className='image'>
              <img
                src={
                  !channel.photo
                    ? DefaultProfile
                    : `http://localhost:5000/Uploads/${channel.photo}`
                }
                alt=''
                width='90%'
                height='100%'
              />
            </div>
            <div className='channelDesc'>
              <h6 className='text-white'>{channel.channelName}</h6>
              <p>{subscribers} Subscriber</p>
            </div>
            <div className='buttonEdit'>
              <Link to='/channel/edit'>
                <button className='btn btnEditChannel'>Edit Channel</button>
              </Link>
            </div>
          </div>
          <div className='contentProfile'>
            <ul className='d-flex'>
              <Link onClick={handleVideo}>
                <li className='videoProfile'>
                  <span className={!isDesc ? 'active' : ''}>Video</span>
                </li>
              </Link>
              <Link onClick={handleDescription}>
                <li className='descProfile'>
                  <span className={isDesc ? 'active' : ''}>
                    Description Channel
                  </span>
                </li>
              </Link>
            </ul>
            <div className='container'>
              <hr
                color='white'
                style={{ border: '2px solid', marginTop: '-20px' }}
              />
              {!isDesc ? <Videos /> : <Desc title={channel.description} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
