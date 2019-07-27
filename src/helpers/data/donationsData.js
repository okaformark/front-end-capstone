import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getAllDonations = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/donations.json`)
    .then((res) => {
      const donations = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((fbKey) => {
          res.data[fbKey].id = fbKey;
          donations.push(res.data[fbKey]);
        });
      }
      resolve(donations);
    })
    .catch(err => reject(err));
});

const getMyDonations = uid => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/donations.json?orderBy="uid"&equalTo="${uid}"`)
    .then((res) => {
      const myDonations = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((fbKey) => {
          res.data[fbKey].id = fbKey;
          myDonations.push(res.data[fbKey]);
        });
      }
      resolve(myDonations);
    })
    .catch(err => reject(err));
});

const postDonation = newDonation => axios.post(`${baseUrl}/donations.json`, newDonation);
const putDonation = (saveDonation, donationId) => axios.put(`${baseUrl}/donations/${donationId}.json`, saveDonation);
const getSelectedDonation = donationsId => axios.get(`${baseUrl}/donations/${donationsId}.json`);
const deleteDonations = donationId => axios.delete(`${baseUrl}/donations/${donationId}.json`);

export default {
  getAllDonations,
  getMyDonations,
  postDonation,
  putDonation,
  getSelectedDonation,
  deleteDonations,
};
