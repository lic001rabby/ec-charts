import axios from "axios";

class DataService {
  constructor() {
    let service = axios.create({
      headers: { csrf: "token" },
    });
    service.interceptors.response.use(this.handleSuccess, this.handleError);
    this.service = service;
  }

  handleSuccess(response) {
    return response;
  }

  handleError = (error) => {
    console.error(error.response.status);
    return Promise.reject(error);
  };

  get(path, callback) {
    return this.service
      .get(path)
      .then((response) => callback(response.status, response.data));
  }
}

export default new DataService();
