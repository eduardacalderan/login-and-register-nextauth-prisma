import axios from "axios";

export const myAxios = () => {
  const instance = axios.create({
    baseURL: "http://localhost.3000/",
  });

  return instance;
};
