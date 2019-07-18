import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  render() {
    const profileLink = '/my-profile/789';
    return (
      <div className="Home">
        <h1>HOME</h1>
        <Link className="btn btn-info" to={profileLink}>Profile</Link>
      </div>
    );
  }
}
export default Home;
