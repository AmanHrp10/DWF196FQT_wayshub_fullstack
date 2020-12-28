import MainMenu from '../../components/molecules/mainMenu';
import FormAdd from '../../components/molecules/formAddVideo';

import { Fragment } from 'react';

export default function AddVideo() {
  return (
    <Fragment>
      <MainMenu isAddVideo />
      <div
        className='container'
        style={{ marginLeft: '265px', paddingTop: '110px', width: '1063px' }}
      >
        <FormAdd />
      </div>
    </Fragment>
  );
}
