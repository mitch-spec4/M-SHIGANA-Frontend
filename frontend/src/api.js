// import axios from 'axios';

// const api = axios.create({
//   baseURL: '/backend', // All requests go through this
// });

// export default api;

import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Change this from '/backend' to '/api'
});

export default api;
