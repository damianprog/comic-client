import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';

import './profile.scss';

const Profile = ({ signedUser }) => {
  return (
    <section className="profile">
      <div className="wrapper">
        <header>
          <div className="background-image">
            <div className="avatar-container">
              <Avatar
                alt="profile picture"
                src="http://i.annihil.us/u/prod/marvel/i/mg/8/b0/5e00da382a27d.jpg"
                className="avatar"
              />
            </div>
          </div>
          <div className="header-details">
            <h2>{signedUser.nickname}</h2>
          </div>
        </header>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  signedUser: state.user.signedUser,
});

export default connect(mapStateToProps)(Profile);
