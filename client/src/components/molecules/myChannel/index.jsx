import { useState, useEffect } from 'react';

import DefaultProfile from '../../../images/channel/defaultProfile.png';
import { Link, useHistory } from 'react-router-dom';
import Videos from '../myVideos';
import Desc from '../descriptionChannel';
import './style.css';
import { API } from '../../../config/api';

export default function MyChannel() {
  let [isDesc, setIsDesc] = useState(false);
  const [loading, setLoading] = useState(true);
  const [channel, setChannel] = useState();

  const router = useHistory();
  const fetchChannel = async () => {
    try {
      setLoading(true);
      const response = await API('/channel');

      setChannel(response.data.data.user);
      setLoading(false);
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
    fetchChannel();
  }, []);

  console.log(channel);

  return loading ? (
    <h1
      className='text-warning d-flex flex-column'
      style={{ position: 'absolute', top: '40%', left: '50%' }}
    >
      <div
        className='spinner-grow text-warning'
        style={{ width: '6rem', height: '6rem' }}
        role='status'
      ></div>
      <span className='spinner' style={{ marginLeft: '-20px' }}>
        Loading...
      </span>
    </h1>
  ) : (
    <>
      <div className='contains'>
        <div className='bg'>
          <img
            src={
              loading || !JSON.parse(channel.thumbnail)
                ? DefaultProfile
                : JSON.parse(channel.thumbnail).path
            }
            alt='thumbnail'
            style={{ marginLeft: '70px', objectFit: 'cover' }}
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
                  loading || !JSON.parse(channel.photo)
                    ? DefaultProfile
                    : JSON.parse(channel.photo).path
                }
                alt='photo'
                width='90%'
                height='100%'
                style={{ objectFit: 'cover', borderRadius: '5px' }}
              />
            </div>
            <div className='channelDesc'>
              <h6 className='text-white'>{channel.channelName}</h6>
              <p className='subscriber'>
                {channel.subscribers.length} Subscriber
              </p>
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
