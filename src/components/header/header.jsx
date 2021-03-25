import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as LogoIcon } from '../../assets/logo-icon.svg';
import { ReactComponent as InIcon } from '../../assets/in-icon.svg';
import Hamburger from '../hamburger/hamburger';
import { Search } from '@material-ui/icons';
import SignDialog from '../sign/sign-dialog';

import './header.scss';

const Header = () => {
  const [openSignDialog, setOpenSignDialog] = useState(false);
  const [signDialogForm, setSignDialogForm] = useState('signin');

  const openForm = (form) => {
    setSignDialogForm(form);
    setOpenSignDialog(!openSignDialog);
  };

  const switchSignDialogForm = () => {
    const nextForm = signDialogForm === 'signin' ? 'signup' : 'signin';
    setSignDialogForm(nextForm);
  };

  return (
    <header className="main-header">
      <div className="main-header-top">
        <div className="sign-in-container">
          <InIcon />
          <span onClick={() => openForm('signin')}>Sign In</span>|
          <span onClick={() => openForm('signup')}>Join</span>
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
      <SignDialog
        open={openSignDialog}
        closeDialog={() => setOpenSignDialog(!openSignDialog)}
        form={signDialogForm}
        switchForm={switchSignDialogForm}
      ></SignDialog>
    </header>
  );
};

export default Header;
