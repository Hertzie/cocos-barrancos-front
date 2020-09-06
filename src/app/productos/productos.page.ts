import { Component, OnInit } from "@angular/core";
import ProductosService from "../services/productos.service";
import { AlertController, ModalController } from "@ionic/angular";
import { ProductoEditarPage } from "../producto-editar/producto-editar.page";

@Component({
  selector: "app-productos",
  templateUrl: "./productos.page.html",
  styleUrls: ["./productos.page.scss"]
})
export class ProductosPage implements OnInit {
  private productos: any[] = [];

  constructor(
    private ps: ProductosService,
    private alertController: AlertController,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.obtenerProductos();
  }

  ngAfterContentInit() {
    this.productos = [];
    this.obtenerProductos();
  }

  async presentarAlertMensaje(mensaje: string, header: string) {
    const alert = await this.alertController.create({
      header: header,
      message: mensaje,
      buttons: ["OK"]
    });

    await alert.present();
  }

  async obtenerProductos() {
    const data = await this.ps.obtenerProductos();
    this.productos = data.data.registros;
    console.log("Productos: ", this.productos);
  }

  async presentarNuevoProductoPrompt() {
    const prompt = await this.alertController.create({
      header: "Nuevo producto",
      inputs: [
        {
          name: "nombre",
          type: "text",
          placeholder: "Nombre producto"
        },
        {
          name: "precio",
          type: "number",
          placeholder: "Precio producto"
        }
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          handler: () => {
            console.log("Cancelo");
          }
        },
        {
          text: "Guardar",
          handler: async data => {
            if (data.nombre == "" || data.precio == "") {
              this.presentarAlertMensaje(
                "Debes ingresar todos los campos",
                "Atención"
              );
            } else {
              const nuevoProducto = await this.ps.crearProducto(
                data.nombre,
                data.precio
              );
              this.productos.push(nuevoProducto);
              this.presentarAlertMensaje(
                "Producto guardado exitosamente",
                "Mensaje"
              );
            }
          }
        }
      ]
    });

    await prompt.present();
  }

  async presentarEditarProductoModal(producto: any) {
    const modal = await this.modalController.create({
      component: ProductoEditarPage,
      componentProps: {
        producto: producto
      }
    });

    return await modal.present();
  }

  async presentarReactivarPrompt(producto) {
    const prompt = await this.alertController.create({
      header: "Reactivar",
      message: "¿Deseas reactivar este producto?",
      buttons: [
        {
          text: "Cancelar",
          role: "cancel"
        },
        {
          text: "Aceptar",
          handler: async () => {
            const reactivado = await this.ps.reactivarProducto(producto._id);
            this.presentarAlertMensaje(
              "Producto reactivado correctamente",
              "Mensaje"
            );
            this.productos = [];
            this.obtenerProductos();
          }
        }
      ]
    });

    await prompt.present();
  }

  async presentarCancelarPrompt(producto) {
    const prompt = await this.alertController.create({
      header: "Cancelar",
      message: "¿Deseas cancelar/dar de baja este producto?",
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          handler: () => {
            console.log("Cancelada accion");
          }
        },
        {
          text: "Aceptar",
          handler: async () => {
            const cancelado = await this.ps.cancelarProducto(producto._id);
            this.presentarAlertMensaje(
              "Producto dado de baja correctamente",
              "Mensaje"
            );
            this.productos = [];
            this.obtenerProductos();
          }
        }
      ]
    });

    await prompt.present();
  }
}
