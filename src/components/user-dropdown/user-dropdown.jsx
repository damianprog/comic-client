import React from 'react';
import { SIGNOUT } from '../../graphql/graphql';
import { connect } from 'react-redux';
import { setSignedUser } from '../redux/user/user-actions';
import { Link, withRouter } from 'react-router-dom';

import './user-dropdown.scss';
import { useMutation } from '@apollo/client';
import Dropdown from '../dropdown/dropdown';

const UserDropdown = ({ signedUser, setSignedUser, history }) => {
  const [signoutUser] = useMutation(SIGNOUT, {
    onError(err) {
      console.log(err);
    },
    onCompleted() {
      setSignedUser(null);
      history.push('/signout');
    },
  });

  const logout = () => {
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserDropdown)
);
