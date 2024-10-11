const axios = require('axios');
const qs = require('qs');
const dotenv = require('dotenv');

dotenv.config();
let accessToken = null;
let tokenExpiration = null;
let isFetchingToken = false;

const MonnifyClient = axios.create({
  baseURL:process.env.MONNIFY_BASE_URL,
  timeout :3000
})

const fetchToken = async()=>{
  const authHeader = Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64');

  const response = axios.post(
    process.env.MONNIFY_BASE_URL,
    qs.stringify({
      grant_type: 'Client Credential'
    }),
    {
      headers:{
        Authorization: `Basic ${authHeader}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    }
  )
   // Store the access token and its expiration time (subtract 60 seconds for buffer)
   accessToken = response.data.access_token;
   tokenExpiration = Date.now() + response.data.expires_in * 1000 - 60000;
   isFetchingToken = false;
}

// Axios interceptor to add the token to each request
MonnifyClient.interceptors.request.use(
  async (config) => {
    // Check if the token is expired or about to expire
    if (!accessToken || Date.now() >= tokenExpiration) {
      await fetchToken(); // Fetch a new token if expired
    }

    // Add the token to the Authorization header
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

MonnifyClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      await fetchToken(); 
      error.config.headers.Authorization = `Bearer ${accessToken}`
      return axios(error.config); 
    }
    return Promise.reject(error); 
  }
);

module.exports = MonnifyClient;


