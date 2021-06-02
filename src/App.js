import React from 'react';
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
import editProfilePage from './components/edit-profile/edit-profile-page';
import Library from './components/library/library';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import ComicReviewsCreationPage from './components/comic-reviews/comic-reviews-creation-page';
import SignoutPage from './components/signout-page/signout-page';
import SignDependentRoute from './components/router/sign-dependent-route';
// import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';

function App({ setSignedUser }) {
  useQuery(CURRENT_USER, {
    onCompleted({ currentUser }) {
      if (currentUser) {
        setSignedUser(currentUser);
      }
    },
  });

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#202020',
      },
      secondary: {
        main: '#e23636',
      },
    },
  });

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Header></Header>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/comic/:comicId" component={ComicPage} />
          <SignDependentRoute
            forSigned
            exact
            path="/comic/:comicId/reviews/create"
            component={ComicReviewsCreationPage}
          />
          <SignDependentRoute exact path="/sign/:form" component={SignPage} />
          <SignDependentRoute exact path="/signout" component={SignoutPage} />
          <Route exact path="/profile/:nickname" component={Profile} />
          <Route exact path="/profile/:nickname/library" component={Library} />
          <SignDependentRoute
            forSigned
            exact
            path="/edit-profile"
            component={editProfilePage}
          />
        </Switch>
      </ThemeProvider>
    </div>
  );
}

const CURRENT_USER = gql`
  {
    currentUser {
      id
      nickname
      birthDate
      email
      createdAt
      userDetails {
        id
        about
        interests
        profileImage
        backgroundImage
      }
    }
  }
`;

const mapDispatchToProps = (dispatch) => ({
  setSignedUser: (user) => dispatch(setSignedUser(user)),
});

export default connect(null, mapDispatchToProps)(App);
