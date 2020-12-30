import MainMenu from '../../components/molecules/mainMenu';
import Card from '../../components/molecules/Card';
import { Fragment, useState, useEffect } from 'react';
import { API } from '../../config/api';
import Moment from 'moment';

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [videoFilter, setVideoFilter] = useState([]);
  let [search, setSearch] = useState({
    query: '',
  });

  const fetchVideo = async () => {
    try {
      const response = await API('/videos');

      setVideos(response.data.data.videos);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = async (e) => {
    let keyword = e.target.value;

    const body = JSON.stringify({ title: keyword });
    const config = {
      headers: {
        'content-type': 'application/json',
      },
    };
    try {
      const response = await API.post('/search', body, config);

      if (response.data.status === 'Request failed') {
        setVideoFilter([]);
      }

      setVideoFilter(response.data.data.videos);
    } catch (err) {
      console.log(err);
    }
    setSearch((search = keyword));
  };
  useEffect(() => {
    fetchVideo();
  }, []);

  const createdAt = videos.map((video) => video.createdAt);
  const date = Moment(createdAt[0]).format('ll');

  console.log(videoFilter);
  return (
    <Fragment>
      <MainMenu isHome onChangeSearch={handleSearch} />
      <div
        className='container'
        style={{ marginLeft: '265px', paddingTop: '110px', width: '1063px' }}
      >
        <div className='row'>
          {search.length == null ? (
            videos
              .sort((a, b) => b.id - a.id)
              .map((video, index) => {
                return (
                  <div className='col-md-3' key={index}>
                    <Card
                      id={video.id}
                      title={video.title}
                      image={video.thumbnail}
                      views={video.viewCount}
                      date={date}
                      channel={video.channel.channelName}
                    />
                  </div>
                );
              })
          ) : videoFilter.length === 0 ? (
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
              }}
            >
              <h1>Not a video</h1>
            </div>
          ) : (
            videoFilter
              .sort((a, b) => b.id - a.id)
              .map((video, index) => {
                return (
                  <div className='col-md-3' key={index}>
                    <Card
                      id={video.id}
                      title={video.title}
                      image={video.thumbnail}
                      views={video.viewCount}
                      date={date}
                      channel={video.channel.channelName}
                    />
                  </div>
                );
              })
          )}
        </div>
      </div>
    </Fragment>
  );
}
