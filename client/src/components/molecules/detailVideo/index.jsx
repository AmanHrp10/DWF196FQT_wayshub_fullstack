import HomeVideos from '../../../API/homeVideo';
import IconView from '../../../images/view1.png';
import IconDate from '../../../images/refresh1.png';
import TextArea from '../../atoms/textarea';
import Comment from '../comment';
import Card from '../Card';

// library
import ReactPlayer from 'react-player';
import { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './detailVideo.css';
import { API } from '../../../config/api';
import Moment from 'moment';
import { AppContext } from '../../../context/appContext';
import Button from '../../atoms/button';

export default function DetailVideo() {
  const [state, dispatch] = useContext(AppContext);
  const [video, setVideo] = useState('');
  const [recomendationVideos, setRecomendationVideos] = useState([]);
  const [maxShowVideos, setMaxShowVideos] = useState(3);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  let [isSubscribe, setIsSubscribe] = useState(false);
  const [subscriber, setSubscriber] = useState();
  const channel = JSON.parse(localStorage.getItem('user'));
  const [formData, setFormData] = useState({
    comment: '',
  });

  const { comment } = formData;
  let { id } = useParams();
  const router = useHistory();

  const randomIndex = (max) => {
    const randomNumber = [];

    for (let i = 0; i < max; i++) {
      let newNumber = Math.floor(Math.random() * max);

      const checkNumber = randomNumber.indexOf(newNumber);

      if (checkNumber < 0) {
        randomNumber.push(newNumber);
      } else {
        i--;
      }
    }
    return randomNumber;
  };

  const fetchVideos = async () => {
    try {
      const response = await API('/videos');
      const numbers = randomIndex(response.data.data.videos.length);
      let randomVideos = [];
      numbers.map((number) =>
        randomVideos.push(response.data.data.videos[number])
      );
      setRecomendationVideos(randomVideos);
    } catch (err) {
      console.log(err);
    }
  };

  const showMore = () => {
    setMaxShowVideos(maxShowVideos + 2);
  };

  const fetchSubscribers = async () => {
    try {
      const subscribtions = await API('/subscribes');

      if (subscribtions.data.status === 'Request success') {
        dispatch({
          type: 'LOAD_SUBSCRIBTION',
          payload: subscribtions.data.data,
        });
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchVideoById = async () => {
    try {
      setLoading(true);

      const responseCommment = await API(`/video/${id}/comments`);
      setComments(responseCommment.data.data.comments);

      const response = await API(`/video/${id}`);
      setVideo(response.data.data.video);
      setSubscriber(response.data.data.video.channel.subscribers.length);

      // setIsSubscribe(false);

      const checkSubscribe = await API(
        `/subscribe/${response.data.data.video.channel.id}`
      );
      checkSubscribe.data.status === 'Request failed'
        ? setIsSubscribe(false)
        : setIsSubscribe(true);

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const subscribe = async () => {
    try {
      const response = await API.post(`/subscribe/${video.channel.id}`);
      console.log(response);
      if (response.data.status === 'Request success') {
        setSubscriber(subscriber + 1);

        const subscribe = [...state.subscribtion];
        subscribe.push(response.data.data.subscribed);

        const afterSubscribe = {
          subscribtion: subscribe,
        };

        dispatch({
          type: 'SUBSCRIBE',
          payload: afterSubscribe,
        });
        setIsSubscribe((isSubscribe = !isSubscribe));
      }
    } catch (err) {
      console.log(err);
    }
  };
  const unSubscribe = async () => {
    try {
      const response = await API.delete(`/subscribe/${video.channel.id}`);
      if (response.data.status === 'Request success') {
        const indexUnsubscribe = state.subscribtion.findIndex(
          (subscribtion) => subscribtion.id === parseInt(response.data.data.id)
        );

        const subscribe = [...state.subscribtion];
        subscribe.splice(indexUnsubscribe, 1);

        const afterUnsubscribe = {
          subscribtion: subscribe,
        };

        dispatch({
          type: 'UNSUBSCRIBE',
          payload: afterUnsubscribe,
        });
        setSubscriber(subscriber - 1);
        setIsSubscribe((isSubscribe = !isSubscribe));
      }
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
    fetchVideoById();
    fetchSubscribers();
    fetchVideos();
  }, [id]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const date = Moment(video.createdAt).format('ll');

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
    <div>
      <div className='d-flex contentNew'>
        <div className='contentDetail'>
          <div className='videoDetail'>
            <ReactPlayer
              width='100%'
              style={{ border: 'none' }}
              controls
              url={video.video}
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
                <div
                  className='video-profile d-flex '
                  onClick={
                    video.channel.id === channel.id
                      ? () => router.push(`/channel/profile`)
                      : () =>
                          router.push(`/content-creator/${video.channel.id}`)
                  }
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={JSON.parse(video.channel.photo).path}
                    alt=''
                    width='50%'
                    height='50%'
                    style={{ marginRight: '10px', objectFit: 'cover' }}
                  />
                  <div style={{ width: '500px' }}>
                    <h6 className='text-white' style={{ whiteSpace: 'nowrap' }}>
                      {loading || !video ? '0' : video.channel.channelName}
                    </h6>
                    <p style={{ fontWeight: '400' }}>{subscriber} Subscriber</p>
                  </div>
                </div>
                {channel.id == video.channel.id ? null : (
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
                src={JSON.parse(channel.photo).path}
                alt=''
                width='45px'
                height='60px'
                style={{ objectFit: 'cover' }}
              />
              <div className='textarea'>
                <TextArea
                  title='Add a comment . . .'
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
            {comments
              .sort((a, b) => b.id - a.id)
              .map((comment, index) => (
                <Comment
                  key={index}
                  channel={comment.channel.channelName}
                  img={JSON.parse(channel.photo).path}
                  text={comment.comment}
                />
              ))}
          </div>
        </div>
        <div className='recomendation'>
          <h5 className='text-white'> Recomendation</h5>
          <hr color='white' />
          {recomendationVideos.map((recomendationVideo, index) =>
            recomendationVideos.indexOf(recomendationVideo) >
            maxShowVideos ? null : recomendationVideo.id === video.id ? null : (
              <Card
                key={recomendationVideo.id}
                id={recomendationVideo.id}
                title={recomendationVideo.title}
                channel={recomendationVideo.channel.channelName}
                image={recomendationVideo.thumbnail}
                views={recomendationVideo.viewCount}
                date={Moment(recomendationVideo.createdAt).format('ll')}
              />
            )
          )}

          {maxShowVideos > recomendationVideos.length ? null : (
            <div className='d-flex justify-content-end'>
              <Button
                title='Show More'
                onClick={showMore}
                customClass='btn btn-sm btn-secondary'
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
