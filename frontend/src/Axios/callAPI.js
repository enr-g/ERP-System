import axios from "axios";


const isDev = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development');
const baseURL = isDev ? 'http://localhost:8001/backend/api' : 'https://invenflow.propulsion-learn.ch/backend/api'


const callAPI = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default callAPI;

