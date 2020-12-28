import Card from '../Card';
import MyVideos from '../../../API/myVideos';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../context/appContext';
import Moment from 'moment';

export default function Videos() {
  const [state] = useContext(AppContext);
  const { channel } = state;
  // const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    return channel;
  }, []);

  //? Render
  return channel.videos.length === 0 ? (
    <div className=' row justify-content-center pt-5'>
      <h3 className=''>You are not yet upload a video</h3>
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
  );
}
