import { useEffect, useState } from 'react';
import MainMenu from '../../components/molecules/mainMenu';
import { useParams } from 'react-router-dom';
import { API } from '../../config/api';

const Subscriber = () => {
  const [channel, setChannel] = useState([]);

  const { id } = useParams();

  const getChannel = async () => {
    try {
      const response = await API(`/channel/${id}`);
      setChannel(response.data.data.channel.subscribers);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getChannel();
  }, []);
  return (
    <div>
      <MainMenu />
      <div
        className='container'
        style={{ marginLeft: '265px', paddingTop: '110px', width: '1063px' }}
      >
        <h2 className='text-white'>Subscriber</h2>
        <hr color='white' width='16%' />
        <div className='row'>
          {channel.map((channel) => {
            return (
              <div className='col-3 mb-3'>
                <div
                  className='subscriber d-flex'
                  style={{
                    width: '250px',
                    padding: '10px 20px',
                    height: '70px',
                    background: '#161616',
                    borderRadius: '5px ',
                  }}
                >
                  <div
                    className='img'
                    style={{ marginRight: '20px', width: '70px' }}
                  >
                    <img
                      src={JSON.parse(channel.photo).path}
                      alt='img'
                      width='100%'
                      height='100%'
                      style={{
                        objectFit: 'cover',
                        borderRadius: '50%',
                      }}
                    />
                  </div>
                  <div
                    className='channels'
                    style={{
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      width: '100%',
                      display: 'inline-block',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <h6 className='text-white'>{channel.channelName}</h6>
                    <p>
                      {channel.subscribers && channel.subscribers.length}{' '}
                      Subscriber
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Subscriber;
