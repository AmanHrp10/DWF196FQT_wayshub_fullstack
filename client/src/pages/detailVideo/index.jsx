import DetailVideo from '../../components/molecules/detailVideo';
// import Sidebar from '../../components/molecules/sidebar/';
// import Navbar from '../../components/molecules/navbar/';
import MainMenu from '../../components/molecules/mainMenu';
import { Fragment } from 'react';

export default function Video() {
  return (
    <Fragment>
      <MainMenu />
      <DetailVideo />
    </Fragment>
  );
}
