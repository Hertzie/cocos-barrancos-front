import { baseUrl } from "./../../config/utils";
import axios from "axios";

export default class AutenticacionService {
  constructor() {}

  logIn(usuario: string, password: string) {
    return axios
      .post(`${baseUrl}/login`, {
        usuario: usuario,
        password: password
      })
      .then(resp => resp.data);
  }

  logOut() {
    localStorage.removeItem("usuario");
  }
}
