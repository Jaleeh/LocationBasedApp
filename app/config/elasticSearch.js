import axios from 'axios';

const ENDPOINT = 'https://ase.es.us-central1.gcp.cloud.es.io:9243/';

// This should be a secret in a real app
const EL_SEARCH_AUTH_KEY = 'ZWxhc3RpYzpVbWcxemVLMlNHSW11aER5QlJJYlVvTEc';

const elasticSearchAPI = axios.create({
  baseURL: ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Basic ${EL_SEARCH_AUTH_KEY}`,
  },
});

export default elasticSearchAPI;
