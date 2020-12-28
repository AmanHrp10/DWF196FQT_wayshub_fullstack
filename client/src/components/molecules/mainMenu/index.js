import { Fragment, useContext } from 'react';
import Sidebar from '../sidebar';
import Navbar from '../navbar';
import './mainMenu.css';
import { AppContext } from '../../../context/appContext';

export default function Menu({ isHome, isSubscribed, isAddVideo }) {
  // const [state, dispatch] = useContext(AppContext);
  // const { channel } = state;

  // console.log(channel);
  return (
    <Fragment>
      <Sidebar isHome={isHome} isSubscribed={isSubscribed} />
      <Navbar isAddVideo={isAddVideo} />
    </Fragment>
  );
}
