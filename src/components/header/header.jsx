import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ReactComponent as InIcon } from '../../assets/in-icon.svg';
import Hamburger from '../hamburger/hamburger';
import { Search } from '@material-ui/icons';

import './header.scss';

const Header = () => (
  <header className="main-header">
    <div className="main-header-top">
      <div className="sign-in-container">
        <InIcon /> <span>Sign In &nbsp;|&nbsp; Join</span>
      </div>
      <Hamburger />
      <Link to="/">
        <Logo className="logo" />
      </Link>
      <div className="search-container">
        <Link to="/">
          <Search style={{ color: '#fff' }} />
        </Link>
      </div>
    </div>
    <nav>
      <ul>
        <li>
          <Link to="/">Videos</Link>
        </li>
        <li>
          <Link to="/">Characters</Link>
        </li>
        <li>
          <Link to="/">Comics</Link>
        </li>
        <li>
          <Link to="/">Movies</Link>
        </li>
        <li>
          <Link to="/">TV Shows</Link>
        </li>
        <li>
          <Link to="/">Games</Link>
        </li>
        <li>
          <Link to="/">News</Link>
        </li>
        <li>
          <Link to="/">More</Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
