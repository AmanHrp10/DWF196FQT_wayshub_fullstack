import { Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../context/appContext';

export default function PrivateRoute({ component: Component, ...rest }) {
  let [state] = useContext(AppContext);
  const { isLogin, isLoading } = state;
  return (
    <Route
      {...rest}
      render={(props) => {
        return isLoading ? (
          <h1
            className='text-warning'
            style={{ position: 'absolute', top: '50%', left: '50%' }}
          >
            <div
              className='spinner-grow text-warning'
              style={{ width: '6rem', height: '6rem' }}
              role='status'
            >
              <span className='visually-hidden'>Loading...</span>
            </div>
          </h1>
        ) : isLogin ? (
          <Component {...props} />
        ) : (
          <Redirect to='/landing' />
        );
      }}
    />
  );
}
