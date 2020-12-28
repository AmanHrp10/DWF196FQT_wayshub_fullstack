import HomeVideos from '../../../API/homeVideo';
import IconView from '../../../images/view1.png';
import IconDate from '../../../images/refresh1.png';
import TextArea from '../../atoms/textarea';
import Comment from '../comment';
import Card from '../Card';
import DefaultProfile from '../../../images/channel/defaultProfile.png';

// library
import ReactPlayer from 'react-player';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import './detailVideo.css';
import { API } from '../../../config/api';
import Moment from 'moment';
import { AppContext } from '../../../context/appContext';

export default function DetailVideo() {
  const [state] = useContext(AppContext);
  const [channel, setChannel] = useState();
  const [video, setVideo] = useState('');
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  let [isSubscribe, setIsSubscribe] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));
  const [formData, setFormData] = useState({
    comment: '',
  });

  const { comment } = formData;
  let { id } = useParams();

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

  const fetchVideo = async () => {
    try {
      setLoading(true);
      const response = await API(`/video/${id}`);
      setVideo(response.data.data.video);
      setLoading(false);
      setIsSubscribe(false);

      //? Check Subscribing
      const checkSubscribe = await API(
        `/subscribes/${response.data.data.video.channel.id}`
      );

      checkSubscribe.data.data.subscribe === null
        ? setIsSubscribe(false)
        : setIsSubscribe(true);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await API(`/video/${id}/comments`);
      setComments(response.data.data.comments);

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const subscribe = async () => {
    try {
      await API.post(`/subscribe${id}`);
      setIsSubscribe((isSubscribe = !isSubscribe));
    } catch (err) {
      console.log(err);
    }
  };
  const unSubscribe = async () => {
    try {
      await API.delete(`/subscribe/${id}`);
      setIsSubscribe((isSubscribe = !isSubscribe));
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddComment = async (e) => {
    // e.preventDefault();
    const body = formData;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await API.post(`/video/${id}/comment`, body, config);
      const newComment = response.data.data.comment;

      setComments([...comments, newComment]);
      setFormData({ comment: '' });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchChannel();
    fetchComments();
    fetchVideo();
  }, []);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const date = Moment(video.createdAt).format('ll');

  console.log(channel);

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
    <div>
      <div className='d-flex contentNew'>
        <div className='contentDetail'>
          <div className='videoDetail'>
            <ReactPlayer
              width='100%'
              controls
              url={`http://localhost:5000/Uploads/${video.video}`}
            />
            <div className='desc-video'>
              <h5
                style={{ color: '#fff', fontWeight: '500', marginTop: '20px' }}
              >
                {video.title}
              </h5>
              <div className='views'>
                <span style={{ marginRight: '30px' }}>
                  <img src={IconView} alt='' className='mr-2 ml-2' />
                  {video.viewCount}
                </span>
                <img src={IconDate} alt='' className='mr-2' />
                <span>{date}</span>
                <hr color='white' style={{ border: '.5px solid' }} />
              </div>
              <div className='video-profile-wrapper d-flex justify-content-between'>
                <div className='video-profile d-flex'>
                  <img
                    src={
                      !channel.photo
                        ? DefaultProfile
                        : `http://localhost:5000/Uploads/${channel.photo}`
                    }
                    alt=''
                    width='90%'
                    height='100%'
                    style={{ marginRight: '10px' }}
                  />
                  <div className=''>
                    <h6 className='text-white'>{channel.channelName}</h6>
                    <p style={{ fontWeight: '400' }}> Subscriber</p>
                  </div>
                </div>
                {user.id == video.channel.id ? null : (
                  <div className='video-sub-button'>
                    <button
                      className={
                        isSubscribe ? 'btn btn-secondary' : 'btn btn-custom'
                      }
                      onClick={isSubscribe ? unSubscribe : subscribe}
                    >
                      {isSubscribe ? 'Unsubscribe' : 'Subscribe'}
                    </button>
                  </div>
                )}
              </div>
            </div>

            <hr color='white' style={{ border: '2px solid' }} />
          </div>
          <div className='areaComment'>
            <div className='comment d-flex'>
              <img
                src={
                  !channel.photo
                    ? DefaultProfile
                    : `http://localhost:5000/Uploads/${channel.photo}`
                }
                alt=''
                width='45px'
                height='60px'
              />
              <div className='textarea'>
                <TextArea
                  placeholder='Comment...'
                  className='ml-4'
                  value={comment}
                  name='comment'
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className='buttonComment mt-2'>
              <button
                className='btn btnComment'
                onClick={(e) => handleAddComment(e)}
              >
                Post
              </button>
            </div>
            {comments.map((comment, index) => (
              <Comment
                key={index}
                channel={comment.channel.channelName}
                img={
                  !comment.channel.photo
                    ? DefaultProfile
                    : `http://localhost:5000/Uploads/${comment.channel.photo}`
                }
                text={comment.comment}
              />
            ))}
          </div>
        </div>
        <div className='recomendation'>
          <h5 className='text-white'> Recomendation</h5>
          <hr color='white' />
          {HomeVideos.map((video, index) => (
            <Card
              key={index}
              id={video.id}
              title={video.title}
              channel={video.channel}
              image={video.image}
              views={video.views}
              date={video.date}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
