import axios from "axios";
import { baseUrl } from "./../config/utils";

export class MesasService {
  constructor() {}

  obtenerMesas() {
    return axios.get(`${baseUrl}/mesas`);
  }
}
