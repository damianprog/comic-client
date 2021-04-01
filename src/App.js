import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Header from './components/header/header';
import { Switch, Route } from 'react-router-dom';
// import {
//   unstable_createMuiStrictModeTheme as createMuiTheme,
//   ThemeProvider,
// } from '@material-ui/core';

import './App.css';

import Homepage from './components/homepage/homepage';
import ComicPage from './components/comic-page/comic-page';
import Search from './components/search/search';
import SignPage from './components/sign/sign-page';

function App() {
  // const theme = createMuiTheme();

  const { loading, error, data } = useQuery(CURRENT_USER);

  if (error) {
    console.log(error);
  }

  if (data) {
    console.log(data);
  }

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

export default App;
