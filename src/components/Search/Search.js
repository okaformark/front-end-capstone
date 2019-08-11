import React from 'react';
import './Search.scss';

class Search extends React.Component {
  handleSearch = (e) => {
    this.props.searchDonationsFunc(e.target.value);
  }

  render() {
    return (
    <div className="form-inline">
      <input type="search" placeholder="Search..." className="form-control" onKeyUp={this.handleSearch.bind(this)} />
    </div>
    );
  }
}
export default Search;
