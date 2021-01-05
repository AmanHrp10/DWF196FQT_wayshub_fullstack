import MainMenu from '../../components/molecules/mainMenu';
import Card from '../../components/molecules/Card';
import { Fragment, useState, useEffect } from 'react';
import { API } from '../../config/api';
import Moment from 'moment';
import './home.css';
import Channel from '../myChannel/index';

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [videoFilter, setVideoFilter] = useState([]);
  const [dropdown, setDropdown] = useState('No filter');
  let [search, setSearch] = useState({
    query: '',
  });

  const handleSorted = (e) => {
    setDropdown(e.target.value);
  };

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

  return (
    <Fragment>
      <MainMenu isHome onChangeSearch={handleSearch} />
      <div
        className='container'
        style={{ marginLeft: '265px', paddingTop: '110px', width: '1063px' }}
      >
        <select
          value={dropdown}
          onChange={handleSorted}
          className='px-2 py-1 mb-3 text-white'
          style={{ background: 'none', border: 'none', borderRadius: '5px' }}
        >
          <option style={{ color: '#000' }} value='No filter'>
            No filter
          </option>
          <option style={{ color: '#000' }} value='Channel'>
            Channel
          </option>
        </select>
        <div className='row'>
          {search.length == null ? (
            dropdown === 'No filter' ? (
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
                        date={Moment(video.createdAt).format('ll')}
                        channel={video.channel.channelName}
                      />
                    </div>
                  );
                })
            ) : (
              videos
                .sort((a, b) => {
                  if (
                    a.channel.channelName.toUpperCase() <
                    b.channel.channelName.toUpperCase()
                  ) {
                    return -1;
                  }
                })
                .map((video, index) => {
                  return (
                    <div className='col-md-3' key={index}>
                      <Card
                        id={video.id}
                        title={video.title}
                        image={video.thumbnail}
                        views={video.viewCount}
                        date={Moment(video.createdAt).format('ll')}
                        channel={video.channel.channelName}
                      />
                    </div>
                  );
                })
            )
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
                      date={Moment(video.createdAt).format('ll')}
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
