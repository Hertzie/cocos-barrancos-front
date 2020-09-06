import { baseUrl } from "./../config/utils";
import axios from "axios";

export default class ProductosService {
  constructor() {}

  obtenerProductos() {
    return axios.get(`${baseUrl}/productos`).then(resp => resp.data);
  }

  crearProducto(nombre: string, precio: number) {
    const data = {
      nombre_producto: nombre,
      precio: precio,
      opc_activo: 1,
      fecha_creacion: new Date(),
      fecha_cancelacion: ""
    };
    return axios.post(`${baseUrl}/producto`, data).then(resp => resp.data);
  }

  actualizarProducto(idProducto: string, nombre: string, precio: number) {
    const data = {
      id_producto: idProducto,
      nombre_producto: nombre,
      precio_producto: precio
    };

    return axios
      .post(`${baseUrl}/producto/editar`, data)
      .then(resp => resp.data);
  }

  cancelarProducto(idProducto: string) {
    const data = {
      id_producto: idProducto
    };

    return axios.post(`${baseUrl}/producto/baja`, data).then(resp => resp.data);
  }

  reactivarProducto(idProducto: string) {
    const data = {
      id_producto: idProducto
    };

    return axios
      .post(`${baseUrl}/producto/reactivar`, data)
      .then(resp => resp.data);
  }
}
