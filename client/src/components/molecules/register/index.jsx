import FormInput from '../../atoms/formInput';
import Textarea from '../../atoms/textarea';
import Button from '../../atoms/button';
import { Fragment, useState, useContext } from 'react';
import './register.css';
import { API, setToken } from '../../../config/api';
import { AppContext } from '../../../context/appContext';
import { useHistory } from 'react-router-dom';

export default function Reqister({ isRegister }) {
  const [state, dispatch] = useContext(AppContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    channelName: '',
    description: '',
  });

  const router = useHistory();

  const { email, password, channelName, description } = formData;
  const handleAdd = async (e) => {
    e.preventDefault();
    const body = formData;

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await API.post('/register', body, config);

      //? Context
      dispatch({
        type: 'LOGIN',
        payload: response.data.data.channel,
      });

      //? take a token
      setToken(response.data.data.channel.token);

      setFormData({
        email: '',
        password: '',
        channelName: '',
        description: '',
      });

      //? Route
      router.push('/');
      return isRegister();
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      <div className='wrapper'>
        <div className='wrapper-form'>
          <h3 className='text-white'>Sign Up</h3>
          <form onSubmit={(e) => handleAdd(e)}>
            <FormInput
              type='text'
              title='Email'
              customClass='inputRegister'
              value={email}
              name='email'
              onChange={(e) => handleChange(e)}
            />
            <FormInput
              type='password'
              title='Password'
              customClass='inputRegister'
              value={password}
              name='password'
              onChange={(e) => handleChange(e)}
            />
            <FormInput
              type='text'
              title='Name Channel'
              customClass='inputRegister'
              value={channelName}
              name='channelName'
              onChange={(e) => handleChange(e)}
            />
            <Textarea
              title='Description'
              customClass='inputRegister'
              rows='4'
              value={description}
              name='description'
              onChange={(e) => handleChange(e)}
            />
            <Button
              title='Sign Up'
              customClass='inputRegister btn-register'
              type='submit'
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
}
