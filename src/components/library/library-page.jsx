import React, { useEffect, useState } from 'react';
import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { USER, USER_COMICS_CATEGORIES } from '../../graphql/graphql';
import { connect } from 'react-redux';
import './library-page.scss';
import Library from './library';

const LibraryPage = () => {
  return (
    <div className="library-page">
      <div className="wrapper">
        <Library />
      </div>
    </div>
  );
};

export default LibraryPage;
