import React from 'react';
import Signin from './signin';
import Signup from './signup';

import './sign.scss';

const SignPage = (props) => {
  const switchForm = () => {
    const nextForm = props.match.params.form === 'signin' ? 'signup' : 'signin';
    props.history.push(`/sign/${nextForm}`);
  };

  const onSign = () => {
    props.history.push('/');
  };

  return (
    <div className="sign-page sign">
      <div className="content">
        {props.match.params.form === 'signin' ? (
          <Signin switchForm={switchForm} onSign={onSign} />
        ) : (
          <Signup switchForm={switchForm} onSign={onSign} />
        )}
      </div>
    </div>
  );
};

export default SignPage;
