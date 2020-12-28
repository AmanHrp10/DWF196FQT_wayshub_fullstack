import Card from '../Card';
import MyVideos from '../../../API/myVideos';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../context/appContext';
import { API } from '../../../config/api';
import Moment from 'moment';

export default function Videos() {
  const [state] = useContext(AppContext);
  const [channel, setChannel] = useState();
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchChannel();
  }, []);

  //? Render
  return loading || channel.videos.length === 0 ? (
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
