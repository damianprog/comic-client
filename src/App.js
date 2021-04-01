import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Header from './components/header/header';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { setSignedUser } from '../src/components/redux/user/user-actions';
// import {
//   unstable_createMuiStrictModeTheme as createMuiTheme,
//   ThemeProvider,
// } from '@material-ui/core';

import './App.css';

import Homepage from './components/homepage/homepage';
import ComicPage from './components/comic-page/comic-page';
import Search from './components/search/search';
import SignPage from './components/sign/sign-page';

function App({ setSignedUser }) {
  // const theme = createMuiTheme();
  const { error, data } = useQuery(CURRENT_USER);
  if (error) {
    console.log(error);
  }
  useEffect(() => {
    if (data) {
      setSignedUser(data.currentUser);
    }
  });

  return (
    <div>
      {/* <ThemeProvider theme={theme}> */}
      <Header></Header>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/comic/:id" component={ComicPage} />
        <Route exact path="/sign/:form" component={SignPage} />
      </Switch>
      {/* </ThemeProvider> */}
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
