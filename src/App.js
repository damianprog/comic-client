import React from 'react';
import Header from './components/header/header';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import HomePage from './components/home-page/home-page';
import ComicPage from './components/comic-page/comic-page';
import Search from './components/search/search';
import SignPage from './components/sign/sign-page';
import Profile from './components/profile-page/profile';
import EditProfilePage from './components/edit-profile/edit-profile-page';
import Library from './components/library/library';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import ComicReviewsCreationPage from './components/comic-reviews/creation/comic-reviews-creation-page';
import SignoutPage from './components/signout-page/signout-page';
import SignDependentRoute from './components/router/sign-dependent-route';
import ComicReviewPage from './components/comic-review-page/comic-review-page';
import ComicReviewsUpdatePage from './components/comic-reviews/creation/comic-reviews-update-page';
// import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';

function App() {
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
          <Route exact path="/" component={HomePage} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/comic/:comicId" component={ComicPage} />
          <SignDependentRoute
            forSigned
            exact
            path="/comic/:comicId/reviews/create"
            component={ComicReviewsCreationPage}
          />
          <SignDependentRoute exact path="/sign/:form" component={SignPage} />
          <SignDependentRoute
            forSigned
            exact
            path="/signout"
            component={SignoutPage}
          />
          <Route exact path="/profile/:nickname" component={Profile} />
          <Route exact path="/profile/:nickname/library" component={Library} />
          <SignDependentRoute
            forSigned
            exact
            path="/edit-profile"
            component={EditProfilePage}
          />
          <Route exact path="/reviews/:reviewId" component={ComicReviewPage} />
          <SignDependentRoute
            forSigned
            exact
            path="/reviews/:reviewId/update"
            component={ComicReviewsUpdatePage}
          />
        </Switch>
      </ThemeProvider>
    </div>
  );
}

export default App;
