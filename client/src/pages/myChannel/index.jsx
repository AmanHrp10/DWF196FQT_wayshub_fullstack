import { Fragment } from 'react';
import MainMenu from '../../components/molecules/mainMenu';
import Content from '../../components/molecules/myChannel';

export default function Channel() {
  return (
    <Fragment>
      <MainMenu />
      <Content />
    </Fragment>
  );
}
