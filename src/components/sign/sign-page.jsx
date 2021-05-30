import React from 'react';
import Signin from './signin';
import Signup from './signup';

import './sign.scss';
import { useParams } from 'react-router';

const SignPage = (props) => {
  const { form } = useParams();

  const switchForm = () => {
    const nextForm = form === 'signin' ? 'signup' : 'signin';
    props.history.push(`/sign/${nextForm}`);
  };

  const onSign = () => {
    props.history.push('/');
  };

  return (
    <div className="sign-page sign">
      <div className="content">
        {form === 'signin' ? (
          <Signin switchForm={switchForm} onSign={onSign} />
        ) : (
          <Signup switchForm={switchForm} onSign={onSign} />
        )}
      </div>
    </div>
  );
};

export default SignPage;
