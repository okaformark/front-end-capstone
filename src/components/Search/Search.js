import React from 'react';
import './Search.scss';

class Search extends React.Component {
 handleSearch = (e) => {
   this.props.searchDonationsFunc(e.target.value);
 }

 render() {
   return (
     <div className= "row">
       <div className= "input-field">
         <label className = "searchLabel"><strong>Search</strong></label>
         <input className = "inputSearch" type="text" onKeyUp={this.handleSearch.bind(this)}/>
       </div>
     </div>
   );
 }
}
export default Search;
