import { useMutation } from '@apollo/client';
import { Card, CardContent, CircularProgress } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { SIGNOUT } from '../../graphql/graphql';
import { setSignedUser } from '../redux/user/user-actions';
import './signout-page.scss';

const SignoutPage = ({ setSignedUser }) => {
  const [signoutUser, { loading }] = useMutation(SIGNOUT, {
    onError(err) {
      console.log(err);
    },
    onCompleted() {
      setSignedUser(null);
    },
  });

  useEffect(() => {
    signoutUser();
  }, []);

  return (
    <div className="signout-page">
      <Card className="card">
        <CardContent>
          {loading ? (
            <div className="loading">
              <CircularProgress />
            </div>
          ) : (
            <Fragment>
              <p>You've been signed out.</p>
              <Link to="/">
                <b>Home</b>
              </Link>
              <p className="text-divider">or</p>
              <Link to="/sign/signin">
                <b>Sign in again</b>
              </Link>
            </Fragment>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setSignedUser: (user) => dispatch(setSignedUser(user)),
});

export default withRouter(connect(null, mapDispatchToProps)(SignoutPage));
