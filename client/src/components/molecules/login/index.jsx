import FormInput from '../../atoms/formInput';
import Button from '../../atoms/button';
import { Fragment, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../../context/appContext';
import { API, setToken } from '../../../config/api';
import './login.css';

export default function Login() {
  const [state, dispatch] = useContext(AppContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  const router = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const body = JSON.stringify({ email, password });
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await API.post('/login', body, config);

      //? Context
      dispatch({
        type: 'LOGIN',
        payload: response.data.data.channel,
      });

      //? take a token
      setToken(response.data.data.channel.token);

      setFormData({ email: '', password: '' });

      //? Route
      router.push('/');
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <Fragment>
      <div className='wrapper login'>
        <div className='wrapper-form'>
          <h3 className='text-white'>Sign In</h3>
          <FormInput
            type='text'
            title='Email'
            value={email}
            name='email'
            customClass='inputLogin'
            onChange={(e) => handleChange(e)}
          />
          <FormInput
            type='password'
            title='Password'
            name='password'
            value={password}
            customClass='inputLogin'
            onChange={(e) => handleChange(e)}
          />
          <Button
            title='Sign In'
            customClass='inputLogin btn-register mt-3'
            onClick={handleLogin}
          />
        </div>
      </div>
    </Fragment>
  );
}
