const axios = require('axios');
require('dotenv').config();
const {POPULAR_CURRENCY} = require('../constants');


function getFilteredData(data, required_currency){
  let filtered = {};
  for (let i =0; i < data.length; i++) {
    if(required_currency.includes(data[i].symbol)){
      filtered[data[i].symbol] = (data[i].price).toFixed(5);
    }
  }
  return filtered;
}


let response = null;
module.exports = new Promise(async (resolve, reject) => {
  try {
    response = await axios.get('https://api.coinstats.app/public/v1/coins?skip=0&limit=25&currency=USD');
  } catch(ex) {
    response = null;
    // error
    console.log(ex);
    reject(ex);
  }
  if (response) {
    // success
    const filtered = getFilteredData(response.data.coins, POPULAR_CURRENCY);
    // console.log(filtered);
    resolve(filtered);
  }
});