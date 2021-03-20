import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as LogoIcon } from '../../assets/logo-icon.svg';
import { ReactComponent as InIcon } from '../../assets/in-icon.svg';
import Hamburger from '../hamburger/hamburger';
import { Search } from '@material-ui/icons';
import NavList from '../nav-list/nav-list';
import Signup from '../sign-in-up/signup';

import './header.scss';

const Header = () => {
  const [openSignup, setOpenSignup] = React.useState(false);

  const toggleSignup = () => {
    setOpenSignup(!openSignup);
    setHtmlScroll(openSignup);
  };

  const setHtmlScroll = (show) => {
    document.documentElement.style.overflow = show ? 'auto' : 'hidden';
  };

  return (
    <header className="main-header">
      <div className="main-header-top">
        <div className="sign-in-container">
          <InIcon /> <span>Sign In</span>|
          <span onClick={toggleSignup}>Join</span>
        </div>
        <Hamburger />
        <Link to="/">
          <LogoIcon className="logo" />
        </Link>
        <div className="search-container">
          <Link to="/search">
            <Search />
          </Link>
        </div>
      </div>
      <div className="header-nav-bar">
        <NavList />
      </div>
      <Signup open={openSignup} closeSignup={toggleSignup}></Signup>
    </header>
  );
};

export default Header;
