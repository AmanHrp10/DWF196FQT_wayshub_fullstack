import LogoAdd from '../../../images/icon/add.png';
import LogoAddActive from '../../../images/icon/addActive.png';
import DefaultProfile from '../../../images/channel/defaultProfile.png';
import FormInput from '../../atoms/formInput';
import { Fragment, useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { BsFolderSymlink } from 'react-icons/bs';
import { FaRegUser } from 'react-icons/fa';
import { AppContext } from '../../../context/appContext';
import './navbar.css';
import { API } from '../../../config/api';

export default function Navbar({ isAddVideo, img, onChange }) {
  const [state, dispatch] = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [channel, setChannel] = useState();

  const router = useHistory();

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
  const handleLogout = () => {
    dispatch({
      type: 'LOGOUT',
    });
  };

  useEffect(() => {
    fetchChannel();
  }, []);

  return (
    <Fragment>
      <div className='navNew fixed-top'>
        <FormInput
          type='text'
          title='Search . . .'
          customClass='navbar-search'
          onChange={onChange}
        />
        <div className='addVideoNew'>
          <Link to='/add-video'>
            <img
              src={isAddVideo ? LogoAddActive : LogoAdd}
              alt=''
              className='pr-3'
            />{' '}
            <span
              className={
                isAddVideo ? 'active pr-5 add-title' : 'pr-5 add-title'
              }
            >
              Add Video
            </span>
          </Link>
        </div>
        <Dropdown>
          <Dropdown.Toggle>
            <div className='profileNew'>
              <img
                src={
                  loading || !JSON.parse(channel.photo)
                    ? DefaultProfile
                    : JSON.parse(channel.photo).path
                }
                alt='photo'
                width='100%'
                height='100%'
                style={{ borderRadius: '50%', objectFit: 'cover' }}
              />
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu
            className='menu'
            style={{ position: 'absolute', zIndex: 0 }}
          >
            <Dropdown.Item
              className='text-white'
              onClick={() => router.push('/channel/profile')}
            >
              <span style={{ paddingRight: '15px' }}>
                <FaRegUser />
              </span>{' '}
              My Profile
            </Dropdown.Item>
            <Dropdown.Item className='text-white' onClick={handleLogout}>
              <span style={{ paddingRight: '15px' }}>
                <BsFolderSymlink />{' '}
              </span>{' '}
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </Fragment>
  );
}
