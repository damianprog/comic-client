import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as LogoIcon } from '../../assets/logo-icon.svg';
import { ReactComponent as InIcon } from '../../assets/in-icon.svg';
import Hamburger from '../hamburger/hamburger';
import { Search } from '@material-ui/icons';
import NavList from '../nav-list/nav-list';

import './header.scss';

const Header = () => (
  <header className="main-header">
    <div className="main-header-top">
      <div className="sign-in-container">
        <InIcon /> <span>Sign In &nbsp;|&nbsp; Join</span>
      </div>
      <Hamburger />
      <Link to="/">
        <LogoIcon className="logo" />
      </Link>
      <div className="search-container">
        <Link to="/">
          <Search />
        </Link>
      </div>
    </div>
    <div className="header-nav-bar">
      <NavList />
    </div>
  </header>
);

export default Header;
