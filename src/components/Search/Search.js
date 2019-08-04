import React from 'react';
import './Search.scss';

class Search extends React.Component {
  handleSearch = (e) => {
    this.props.searchDonationsFunc(e.target.value);
  }


  render() {
    return (
     <div className= "row">
        <input type="text" className="input" placeholder="Search..." onKeyUp={this.handleSearch.bind(this)} />
      </div>
    );
  }
}
export default Search;
