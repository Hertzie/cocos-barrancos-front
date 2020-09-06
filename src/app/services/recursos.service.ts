import { baseUrl } from "./../config/utils";
import axios from "axios";

export class RecursosService {
  constructor() {}

  obtenerRecursos() {
    return axios.get(`${baseUrl}/recursos`).then(resp => resp.data);
  }

  crearRecurso(recurso: any) {
    return axios.post(`${baseUrl}/recurso`, recurso);
  }

  bajaRecurso(recurso: any) {
    return axios.post(`${baseUrl}/recurso/baja`, recurso);
  }

  reactivarRecurso(recurso: any) {
    return axios.post(`${baseUrl}/recurso/reactivar`, recurso);
  }

  cambiarRolRecurso(idRecurso: string, tipoRol: number) {
    const data = {
      id_recurso: idRecurso,
      tipoRol: tipoRol
    };

    return axios
      .post(`${baseUrl}/recurso/editar`, data)
      .then(resp => resp.data);
  }
}
