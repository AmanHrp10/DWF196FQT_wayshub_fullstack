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

export default function Navbar({ isAddVideo, img }) {
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

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <Fragment>
      <div className='navNew fixed-top'>
        <FormInput type='text' title='Search..' customClass='navbar-search' />
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
                  !channel.photo
                    ? DefaultProfile
                    : `http://localhost:5000/uploads/${channel.photo}`
                }
                alt=''
                width='100%'
                height='100%'
                style={{ borderRadius: '7px', objectFit: 'cover' }}
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
