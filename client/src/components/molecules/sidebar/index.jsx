import { Fragment, useEffect, useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import LogoSidebar from '../../../images/logo/logoApp.png';
import Home from '../../../images/icon/home.png';
import HomeActive from '../../../images/icon/homeActive.png';
import Sub from '../../../images/icon/sub.png';
import SubActive from '../../../images/icon/subActive.png';
import { API } from '../../../config/api';
import Button from '../../atoms/button';
import './sidebar.css';
import { AppContext } from '../../../context/appContext';

export default function Sidebar({ isHome, isSubscribed }) {
  const [state, dispatch] = useContext(AppContext);
  const [maxShow, setMaxShow] = useState(4);

  const router = useHistory();

  const showMore = () => {
    setMaxShow(maxShow + 1);
  };

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
  }, []);

  console.log(maxShow);

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
          {state.subscribtion && state.subscribtion.length > 0 && (
            <h5>Channels</h5>
          )}
          <ul className='channelList'>
            {state.subscribtion &&
              state.subscribtion
                .sort((a, b) => b.id - a.id)
                .map((channel, index) =>
                  state.subscribtion.indexOf(channel) > maxShow ? null : (
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
                      }}
                    >
                      <img
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '5px',
                          objectFit: 'cover',
                        }}
                        src={JSON.parse(channel.photo).path}
                        alt=''
                      />
                      {channel.channelName}
                    </li>
                  )
                )}
          </ul>
          {maxShow > state.subscribtion.length ? null : (
            <Button
              title='Show More'
              customClass='btn-secondary ml-4'
              onClick={showMore}
            />
          )}
        </div>
      </div>
    </Fragment>
  );
}
