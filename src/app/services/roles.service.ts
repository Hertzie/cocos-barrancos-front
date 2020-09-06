import { baseUrl } from "./../config/utils";
import axios from "axios";

export default class RolesService {
  constructor() {}

  obtenerRoles() {
    return axios.get(`${baseUrl}/roles`).then(resp => resp.data);
  }
}
