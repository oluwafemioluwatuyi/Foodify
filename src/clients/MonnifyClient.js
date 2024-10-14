


const axios = require('axios');
const qs = require('qs');
const dotenv = require('dotenv');

dotenv.config();
let accessToken = null;
let tokenExpiration = null;
let isFetchingToken = false;

const MonnifyClient = axios.create({
  baseURL: process.env.MONNIFY_BASE_URL,
});

const fetchToken = async () => {
  try {
    // Prevent multiple simultaneous token fetches
    if (isFetchingToken) {
      return; // If already fetching a token, just wait
    }
    
    isFetchingToken = true; // Set fetching flag

    const authHeader = Buffer.from(`${process.env.MONNIFY_API_KEY}:${process.env.MONNIFY_SECRET_KEY}`).toString('base64');

    const response = await axios.post(
      `${process.env.MONNIFY_BASE_URL}/api/v1/auth/login`, // Adjust as necessary
      qs.stringify({
        grant_type: 'client_credentials'
      }),
      {
        headers: {
          Authorization: `Basic ${authHeader}`,
          "Content-Type": "application/x-www-form-urlencoded" // Changed to form-urlencoded
        }
      }
    );    
    // Store the access token and its expiration time
    accessToken = response.data.accessToken; // Ensure you are using the correct property name
    tokenExpiration = Date.now() + response.data.expires_in * 1000 - 60000; // Subtract 60 seconds for buffer
  } catch (error) {
    throw new Error('Failed to fetch token');
  } finally {
    isFetchingToken = false;
  }
};

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
      error.config.headers.Authorization = `Bearer ${accessToken}`;
      return MonnifyClient(error.config); // Use MonnifyClient to resend the request
    }
    return Promise.reject(error); 
  }
);

module.exports = MonnifyClient;
