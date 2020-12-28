import Card from '../Card';
import './contentCreator.css';
import { useState, useEffect, useContext } from 'react';
import { API } from '../../../config/api';
import { useParams } from 'react-router-dom';
import DefaultProfile from '../../../images/channel/defaultProfile.png';
import Moment from 'moment';
import { AppContext } from '../../../context/appContext';

export default function ContentCreator() {
  const [channel, setChannel] = useState();
  const [loading, setLoading] = useState(true);
  let [subscribers, setSubscribers] = useState();
  const [state] = useContext(AppContext);
  const { channel: thisChannel } = state;

  let [isSubscribe, setIsSubscribe] = useState(false);

  const { id } = useParams();

  const handleSubscribed = async () => {
    setIsSubscribe(true);
    // const body = {
    //   channelId: id,
    // };

    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // };

    // console.log(body);
    try {
      // const response = await API.post('/subscribe', body, config);
      // console.log(response.data.data.subscribe);
    } catch (err) {
      console.log(err);
    }
  };
  const handleUnSubscribed = () => {
    setIsSubscribe(false);
  };

  const fetchChannel = async () => {
    try {
      const response = await API(`/channel/${id}`);
      setChannel(response.data.data.channel);
      setSubscribers(response.data.data.subscribers);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchChannel();
  }, []);

  return loading ? (
    <h1
      className='text-warning'
      style={{ position: 'absolute', top: '50%', left: '50%' }}
    >
      <div
        className='spinner-grow text-warning'
        style={{ width: '6rem', height: '6rem' }}
        role='status'
      >
        <span className='visually-hidden'>Loading...</span>
      </div>
    </h1>
  ) : (
    <>
      <div className='bg'>
        <img
          src={
            !channel.thumbnail
              ? DefaultProfile
              : `http://localhost:5000/Uploads/${channel.thumbnail}`
          }
          alt=''
          style={{ marginLeft: '720px' }}
          width='100%'
          height='100%'
          className='imgnav'
        />
      </div>
      <div className='about'>
        <div className='profileDesc'>
          <div className='image'>
            {!channel.photo ? (
              <img src={DefaultProfile} alt='' width='90%' height='100%' />
            ) : (
              <img
                src={`http://localhost:5000/Uploads/${channel.photo}`}
                alt=''
                width='90%'
                height='100%'
              />
            )}
          </div>
          <div className='channelDesc'>
            <h6 className='text-white'>{channel.channelName}</h6>
            <p>
              {subscribers}
              <span className='ml-2'>Subscriber</span>
            </p>
          </div>
          <div className='buttonEdit pl-4'>
            <button
              className={isSubscribe ? 'btn btn-secondary' : 'btn btn-custom'}
              onClick={isSubscribe ? handleUnSubscribed : handleSubscribed}
            >
              {isSubscribe ? 'Unsubscribe' : 'Subscribe'}
            </button>
          </div>
        </div>
        <hr color='#fff' style={{ border: '2px solid', width: '100%' }} />
        {channel.videos.length === 0 ? (
          <div className=' row justify-content-center pt-5'>
            <h3 className=''>This channel haven't Upload a video</h3>
          </div>
        ) : (
          <div className='row'>
            {channel.videos.map((video) => (
              <div className='col-md-3' key={video.id}>
                <Card
                  id={video.id}
                  title={video.title}
                  channel={channel.channelName}
                  image={`http://localhost:5000/Uploads/${video.thumbnail}`}
                  views={video.viewCount}
                  date={Moment(video.createdAt).format('ll')}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
