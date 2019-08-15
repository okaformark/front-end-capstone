import React from 'react';
import './Search.scss';

class Search extends React.Component {
  handleSearch = (e) => {
    this.props.searchDonationsFunc(e.target.value);
  }

  render() {
    return (
    <div className="form-inline col-lg 4 col-md-4 col-sm-12 col-xs-12">
      <input type="search" placeholder="Search..." className="form-control" onKeyUp={this.handleSearch.bind(this)} />
    </div>
    );
  }
}
export default Search;
