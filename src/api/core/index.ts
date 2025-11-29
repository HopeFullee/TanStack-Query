import axios from "axios";

const DEV_END_POINT = import.meta.env.VITE_REACT_APP_DEV_END_POINT;

const baseAPI = axios.create({ baseURL: DEV_END_POINT });

export { baseAPI };
