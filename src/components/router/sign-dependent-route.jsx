import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router';

const SignDependentRoute = ({
  component: Component,
  forSigned,
  signedUser,
  ...rest
}) => {
  const signedInOnlyContent = () => {
    return signedUser ? <Component /> : <Redirect to="/sign/signin" />;
  };

  const signedOutOnlyContent = () => {
    return signedUser ? <Redirect to="/" /> : <Component />;
  };

  const contentToRender = () => {
    if (forSigned) {
      return signedInOnlyContent();
    } else {
      return signedOutOnlyContent();
    }
  };

  return <Route {...rest} render={() => contentToRender()} />;
};

const mapStateToProps = (state) => ({
  signedUser: state.user.signedUser,
});

export default connect(mapStateToProps)(SignDependentRoute);
