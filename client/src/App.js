import { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

//? Import Module
import Home from './pages/home';
import AddVideo from './pages/addVideo';
import EditChannel from './pages/editchannel';
import MyChannel from './pages/myChannel';
import Subscribed from './pages/subscription';
import DetailVideo from './pages/detailVideo';
import Landing from './pages/landing/index.jsx';
import ContentCreator from './pages/contentCreator/contentCreatorPage';
import PrivateRoute from './components/privateRoute';
import { API, setToken } from './config/api';
import { AppContext } from './context/appContext';

// Css
import './App.css';

//? Cek Token on headers
if (localStorage.token) {
  setToken(localStorage.token);
}

function App() {
  const [state, dispatch] = useContext(AppContext);

  //? Auth token
  //* If token existed, web page not redirect to login page
  const loadChannel = async () => {
    try {
      const response = await API('/check-auth');

      if (response.status === 401) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }

      dispatch({
        type: 'CHANNEL_LOADED',
        payload: response.data.data.channel,
      });
    } catch (err) {
      return dispatch({
        type: 'AUTH_ERROR',
      });
    }
  };

  //? Check in token after render
  useEffect(() => {
    loadChannel();
  }, []);
  return (
    <Router>
      <Switch>
        <Route exact path='/landing' component={Landing} />
        <PrivateRoute exact path='/' component={Home} />
        <PrivateRoute exact path='/add-video' component={AddVideo} />
        <PrivateRoute exact path='/channel/edit' component={EditChannel} />
        <PrivateRoute exact path='/channel/profile' component={MyChannel} />
        <PrivateRoute exact path='/subcribtion' component={Subscribed} />
        <PrivateRoute exact path='/detail-video/:id' component={DetailVideo} />
        <PrivateRoute
          exact
          path='/content-creator/:id'
          component={ContentCreator}
        />
      </Switch>
    </Router>
  );
}

export default App;
