import React from 'react';
import Header from '../components/header/header';
import ComicsPreview from '../components/comics-preview/comics-preview';
import axios from 'axios';

import './homepage.css';

const api = axios.create({
  baseURL: `https://gateway.marvel.com/`,
});

class Homepage extends React.Component {
  constructor() {
    super();

    this.state = {
      previewComics: [],
    };
  }

  componentDidMount() {
    this.getPreviewComics();
  }

  getPreviewComics = async () => {
    try {
      await api
        .get('v1/public/comics', {
          params: {
            format: 'comic',
            title: 'thor',
            limit: 10,
            apikey: process.env.REACT_APP_MARVEL_API_KEY,
          },
        })
        .then((res) => {
          // console.log(res.data.data.results);
          const results = res.data.data.results;
          console.log(results);
          this.setState({
            previewComics: results.filter((result) => result.images.length > 0),
          });
        });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { previewComics } = this.state;

    return (
      <div className="homepage">
        <Header></Header>
        <ComicsPreview comics={previewComics} />
      </div>
    );
  }
}

export default Homepage;
