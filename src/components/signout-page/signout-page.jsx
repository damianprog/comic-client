import { Card, CardContent } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import './signout-page.scss';

const SignoutPage = () => {
  return (
    <div className="signout-page">
      <Card className="card">
        <CardContent>
          <p>You've been signed out.</p>
          <Link to="/">
            <b>Home</b>
          </Link>
          <p className="text-divider">or</p>
          <Link to="/sign/signin">
            <b>Sign in again</b>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignoutPage;
