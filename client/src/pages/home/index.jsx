import MainMenu from '../../components/molecules/mainMenu';
import Card from '../../components/molecules/Card';
import { Fragment, useState, useEffect } from 'react';
import { API } from '../../config/api';
import Moment from 'moment';

export default function Home() {
  const [videos, setVideos] = useState([]);

  const fetchVideo = async () => {
    try {
      const response = await API('/videos');

      setVideos(response.data.data.videos);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchVideo();
  }, []);

  const createdAt = videos.map((video) => video.createdAt);
  const date = Moment(createdAt[0]).format('ll');

  const videoSort = videos.sort((a, b) => a.createdAt - b.createdAt);

  return (
    <Fragment>
      <MainMenu isHome />
      <div
        className='container'
        style={{ marginLeft: '265px', paddingTop: '110px', width: '1063px' }}
      >
        <div className='row'>
          {videoSort.map((video, index) => {
            return (
              <div className='col-md-3' key={index}>
                <Card
                  id={video.id}
                  title={video.title}
                  image={`http://localhost:5000/Uploads/${video.thumbnail}`}
                  views={video.viewCount}
                  date={date}
                  channel={video.channel.channelName}
                />
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
}
