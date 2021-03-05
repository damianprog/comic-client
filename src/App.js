import React from 'react';
import Header from './components/header/header';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import Homepage from './components/homepage/homepage';
import ComicPage from './components/comic-page/comic-page';

function App() {
  return (
    <div>
      <Header></Header>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/comic/:id" component={ComicPage} />
      </Switch>
    </div>
  );
}

export default App;
