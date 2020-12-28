import { Fragment } from 'react';
import MainMenu from '../../components/molecules/mainMenu';
import ContentCreator from '../../components/molecules/contentCreator';

export default function Content() {
  return (
    <Fragment>
      <MainMenu />
      <ContentCreator />
    </Fragment>
  );
}
