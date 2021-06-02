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

  return (
    <div className="sign-page sign">
      <div className="content">
        {form === 'signin' ? (
          <Signin switchForm={switchForm} />
        ) : (
          <Signup switchForm={switchForm} />
        )}
      </div>
    </div>
  );
};

export default SignPage;
