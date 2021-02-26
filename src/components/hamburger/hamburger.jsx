import React from 'react';
import NavList from '../nav-list/nav-list';

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
          <NavList />
        </div>
      </div>
    );
  }
}

export default Hamburger;
