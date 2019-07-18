import React from 'react';
import { Link } from 'react-router-dom';

class Donate extends React.Component {
  render() {
    const editLink = '/edit/123';
    const selectedLink = '/donation/456';
    return (
      <div className="Donate">
        <h1>Donate</h1>
        <Link className="btn btn-info" to={editLink}>edit</Link>
        <Link className="btn btn-info" to={selectedLink}>view</Link>
      </div>
    );
  }
}

export default Donate;
