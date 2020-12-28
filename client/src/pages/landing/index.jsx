import Button from '../../components/atoms/button';
import { useState } from 'react';
import Register from '../../components/molecules/register';
import Login from '../../components/molecules/login';
import Logo from '../../images/thumbnail/logoRegistrasi.png';
import './landing.css';

export default function BrandRegister() {
  let [isRegistered, setIsRegistered] = useState(true);

  const handleClick = () => {
    setIsRegistered((isRegistered = !isRegistered));
  };

  const Registered = () => {
    setIsRegistered((isRegistered = true));
  };
  return (
    <div>
      <div className='imgRegister'>
        <img src={Logo} alt='' width='387px' height='287px' />

        <Button
          title={isRegistered ? 'Sign Up' : 'Sign In'}
          customClass='landingButtonSignIn'
          onClick={handleClick}
        />
      </div>
      <div className='form'>
        {isRegistered ? <Login /> : <Register isRegister={Registered} />}
      </div>
    </div>
  );
}
