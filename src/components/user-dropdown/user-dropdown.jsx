import React from 'react';
import { SIGNOUT } from '../../graphql/graphql';
import { connect } from 'react-redux';
import { setSignedUser } from '../redux/user/user-actions';
import { Link } from 'react-router-dom';

import './user-dropdown.scss';
import { useMutation } from '@apollo/client';
import Dropdown from '../dropdown/dropdown';

const UserDropdown = ({ signedUser, setSignedUser }) => {
  const [signoutUser] = useMutation(SIGNOUT, {
    onError(err) {
      console.log(err);
    },
  });

  const logout = () => {
    setSignedUser(null);
    signoutUser();
  };

  return (
    <div className="user-dropdown">
      <Dropdown activator={<span>{signedUser.nickname}</span>}>
        <ul>
          <Link to={`/profile/${signedUser.nickname}`}>
            <li>My Profile</li>
          </Link>
          <li onClick={logout}>Log Out</li>
        </ul>
      </Dropdown>
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
