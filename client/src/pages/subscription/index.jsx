import { Fragment, useEffect, useState } from 'react';
import MainMenu from '../../components/molecules/mainMenu';
import Card from '../../components/molecules/Card';
import Moment from 'moment';
import { API } from '../../config/api';

export default function Subcription() {
  const [channels, setChannel] = useState([]);
  const fetchVideo = async () => {
    try {
      const response = await API('/subscribes');

      setChannel(response.data.data.subscribed);
    } catch (err) {
      console.log(err);
    }
  };
  // const createdAt = videos.map((video) => video.createdAt);
  // const date = Moment(createdAt[0]).format('ll');
  // console.log(date);

  useEffect(() => {
    fetchVideo();
  }, []);
  return (
    <Fragment>
      <MainMenu isSubscribed />
      <div
        className='container'
        style={{ marginLeft: '265px', paddingTop: '110px', width: '1063px' }}
      >
        <div className='row'>
          {channels.length === 0 ? (
            <h1 style={{ display: 'flex', margin: 'auto', marginTop: '150px' }}>
              Not Subscribe a channel
            </h1>
          ) : (
            channels.map((channel) =>
              channel.videos
                .sort((a, b) => b.id - a.id)
                .map((video) => {
                  return (
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
                  );
                })
            )
          )}
        </div>
      </div>
    </Fragment>
  );
}
