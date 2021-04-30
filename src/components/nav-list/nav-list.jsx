import React from 'react';
import { SIGNOUT } from '../../graphql/graphql';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setSignedUser } from '../redux/user/user-actions';
import { useMutation } from '@apollo/client';

import './nav-list.scss';

const NavList = ({ signedUser, setSignedUser, close }) => {
  const [signoutUser] = useMutation(SIGNOUT, {
    onError(err) {
      console.log(err);
    },
  });

  const logout = () => {
    close();
    setSignedUser(null);
    signoutUser();
  };

  return (
    <nav className="nav-list">
      {signedUser ? (
        <ul>
          <Link to={`/profile/${signedUser.nickname}`}>
            <li onClick={close}>My Profile</li>
          </Link>
          <li onClick={logout}>Log Out</li>
        </ul>
      ) : (
        <ul>
          <Link to="/sign/signin">
            <li onClick={close}>Sign In</li>
          </Link>
          <Link to="/sign/signup">
            <li onClick={close}>Join</li>
          </Link>
        </ul>
      )}
    </nav>
  );
};

const mapStateToProps = (state) => ({
  signedUser: state.user.signedUser,
});

const mapDispatchToProps = (dispatch) => ({
  setSignedUser: (user) => dispatch(setSignedUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavList);
