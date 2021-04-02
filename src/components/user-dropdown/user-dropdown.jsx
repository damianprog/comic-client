import React, { useState } from 'react';
import { SIGNOUT } from '../../graphql/graphql';
import { connect } from 'react-redux';
import { setSignedUser } from '../redux/user/user-actions';
import { Link } from 'react-router-dom';

import './user-dropdown.scss';
import { useMutation } from '@apollo/client';

const UserDropdown = ({ signedUser, setSignedUser }) => {
  const [openList, setOpenList] = useState(false);

  const toggleList = () => {
    setOpenList(!openList);
  };

  const [signoutUser] = useMutation(SIGNOUT, {
    onError(err) {
      console.log(err);
    },
  });

  const logout = () => {
    setSignedUser(null);
    signoutUser();
  };

  window.addEventListener('click', (event) => {
    const dropdown = document.querySelector('.user-dropdown');
    if (
      dropdown &&
      event.target !== dropdown &&
      !dropdown.contains(event.target) &&
      openList
    ) {
      toggleList();
    }
  });

  return (
    <div className="user-dropdown">
      <span onClick={toggleList}>{signedUser.nickname}</span>
      {openList ? (
        <ul>
          <Link to={`/profile/${signedUser.nickname}`}>
            <li>My Profile</li>
          </Link>
          <li onClick={logout}>Log Out</li>
        </ul>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  signedUser: state.user.signedUser,
});

const mapDispatchToProps = (dispatch) => ({
  setSignedUser: (user) => dispatch(setSignedUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDropdown);
