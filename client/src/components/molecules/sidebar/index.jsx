import { Fragment, useEffect, useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import LogoSidebar from '../../../images/logo/logoApp.png';
import Home from '../../../images/icon/home.png';
import HomeActive from '../../../images/icon/homeActive.png';
import Sub from '../../../images/icon/sub.png';
import SubActive from '../../../images/icon/subActive.png';
import { API } from '../../../config/api';
import DefaultProfile from '../../../images/channel/defaultProfile.png';
import Button from '../../atoms/button';
import './sidebar.css';
import { AppContext } from '../../../context/appContext';

export default function Sidebar({ isHome, isSubscribed }) {
  const [state, dispatch] = useContext(AppContext);
  const router = useHistory();

  const fetchSubscribers = async () => {
    try {
      const response = await API('/subscribes');
      if (response.data.status === 'Request success') {
        dispatch({
          type: 'LOAD_SUBSCRIBTION',
          payload: response.data.data,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchSubscribers();
  }, [state]);

  return (
    <Fragment>
      <div className='sideNew'>
        <div className='logo-sidebar'>
          <Link to='/'>
            <img src={LogoSidebar} alt='' width='70%' height='60%' />
          </Link>
        </div>
        <div className='page-landing'>
          <ul>
            <Link to='/'>
              <li className={isHome ? 'active' : ''}>
                <img src={isHome ? HomeActive : Home} alt='' /> Home
              </li>
            </Link>
            <Link to='/subcribtion'>
              <li className={isSubscribed ? 'active' : ''}>
                <img src={!isSubscribed ? Sub : SubActive} alt='' />{' '}
                Subscription
              </li>
            </Link>
          </ul>
        </div>
        <div className='channel-list'>
          {state.subscribtion.length > 0 && <h5>Channels</h5>}
          <ul className='channelList'>
            {state.subscribtion
              .sort((a, b) => b.id - a.id)
              .map((channel, index) => (
                <li
                  key={index}
                  style={{
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    width: '100%',
                    display: 'inline-block',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    router.push(`/content-creator/${channel.id}`);
                    window.location.reload();
                  }}
                >
                  <img
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '5px',
                    }}
                    src={
                      !channel.photo
                        ? DefaultProfile
                        : `http://localhost:5000/uploads/${channel.photo}`
                    }
                    alt=''
                  />
                  {channel.channelName}
                </li>
              ))}
          </ul>
          {state.subscribtion > 5 && (
            <Button title='Show More' customClass='btn-secondary ml-4' />
          )}
        </div>
      </div>
    </Fragment>
  );
}
