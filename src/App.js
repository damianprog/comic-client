import React from 'react';
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

export default App;
