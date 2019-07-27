import React from 'react';
import PropTypes from 'prop-types';
import donationsShape from '../../helpers/propz/donationsShape';
import Donations from '../Donations/Donations';

class Claims extends React.Component {
  static propTypes = {
    donation: PropTypes.arrayOf(donationsShape.donationsShape),
  }

  render() {
    const { donations } = this.props;
    console.error(donations);
    const makeClaimedCard = donations.map(donation => (donation.isClaimed))
      .filter(each => each.isClaimed === true);
    return (
      <div className="Claims col">
        <Donations
        donations={makeClaimedCard}
        />
      </div>
    );
  }
}

export default Claims;
