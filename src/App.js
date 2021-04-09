import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Header from './components/header/header';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { setSignedUser } from '../src/components/redux/user/user-actions';

import './App.css';

import Homepage from './components/home-page/homepage';
import ComicPage from './components/comic-page/comic-page';
import Search from './components/search/search';
import SignPage from './components/sign/sign-page';
import Profile from './components/profile-page/profile';

function App({ setSignedUser }) {
  const { data: { currentUser } = {} } = useQuery(CURRENT_USER);
  useEffect(() => {
    if (currentUser) {
      setSignedUser(currentUser);
    }
  }, [currentUser, setSignedUser]);

  return (
    <div>
      <Header></Header>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/comic/:id" component={ComicPage} />
        <Route exact path="/sign/:form" component={SignPage} />
        <Route exact path="/profile/:nickname" component={Profile} />
      </Switch>
    </div>
  );
}

const CURRENT_USER = gql`
  {
    currentUser {
      id
      nickname
      email
      createdAt
    }
  }
`;

const mapDispatchToProps = (dispatch) => ({
  setSignedUser: (user) => dispatch(setSignedUser(user)),
});

export default connect(null, mapDispatchToProps)(App);
