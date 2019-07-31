import PropTypes from 'prop-types';

const donationsShape = PropTypes.shape({
  uid: PropTypes.string.isRequired,
  foodDescription: PropTypes.string.isRequired,
  foodCategory: PropTypes.string,
  pickUpLocation: PropTypes.string.isRequired,
  eventType: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  foodImageUrl: PropTypes.string.isRequired,
  recipientId: PropTypes.string,
  isClaimed: PropTypes.bool.isRequired,
});

export default { donationsShape };
