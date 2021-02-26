import React from 'react';
import { Link } from 'react-router-dom';

import './hamburger.scss';

class Hamburger extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false,
    };
  }

  toggleMenu = () => {
    this.setState({ showMenu: !this.state.showMenu });
  };

  render() {
    const { showMenu } = this.state;

    return (
      <div className="hamburger">
        <span className="hamburger-icon" onClick={this.toggleMenu}>
          &#9776;
        </span>
        <div className={`${showMenu ? 'on-screen' : ''} menu`}>
          <span className="close-icon" onClick={this.toggleMenu}>
            &times;
          </span>
          <div className="content">
            <ul>
              <li>
                <Link to="/">Videos</Link>
              </li>
              <li>
                <Link to="/">Characters</Link>
              </li>
              <li>
                <Link to="/">Comics</Link>
              </li>
              <li>
                <Link to="/">Movies</Link>
              </li>
              <li>
                <Link to="/">TV Shows</Link>
              </li>
              <li>
                <Link to="/">Games</Link>
              </li>
              <li>
                <Link to="/">News</Link>
              </li>
              <li>
                <Link to="/">More</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Hamburger;
