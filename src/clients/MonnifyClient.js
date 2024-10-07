const axios = require('axios');

class MonnifyClient {
  constructor() {
    this.client = axios.create({
      baseURL: 'https://api.monnify.com',
      headers: {
        Authorization: `Bearer YOUR_ACCESS_TOKEN`,
        'Content-Type': 'application/json',
      }
    });
  }

  get(url, config) {
    return this.client.get(url, config);
  }

  post(url, data, config) {
    return this.client.post(url, data, config);
  }
}

module.exports = MonnifyClient;
