import React from 'react';
import EditProfile from './edit-profile';
import { useQuery } from '@apollo/client';
import { USER } from '../../graphql/graphql';
import { connect } from 'react-redux';
import './edit-profile-page.scss';

const EditProfilePage = ({ signedUser }) => {
  const { data: { user: profileUser } = {} } = useQuery(USER, {
    variables: {
      nickname: signedUser.nickname,
    },
  });

  return (
    <div className="edit-profile-page">
      <div className="wrapper">
        {profileUser ? <EditProfile profileUser={profileUser} /> : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  signedUser: state.user.signedUser,
});

export default connect(mapStateToProps)(EditProfilePage);
