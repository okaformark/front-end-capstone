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
      console.error(myDonations);
      resolve(myDonations);
    })
    .catch(err => reject(err));
});

export default { getAllDonations, getMyDonations };
