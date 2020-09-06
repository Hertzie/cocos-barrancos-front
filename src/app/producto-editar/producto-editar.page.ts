import { ModalController, NavParams, AlertController } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";
import ProductosService from "../services/productos.service";

@Component({
  selector: "app-producto-editar",
  templateUrl: "./producto-editar.page.html",
  styleUrls: ["./producto-editar.page.scss"]
})
export class ProductoEditarPage implements OnInit {
  private producto: any;
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private alertController: AlertController,
    private ps: ProductosService
  ) {
    this.producto = this.navParams.get("producto");
    console.log("Producto en modal: ", this.producto);
  }

  ngOnInit() {}

  cerrarModal() {
    this.modalController.dismiss();
  }

  async editarProducto() {
    const productoEditado = await this.ps.actualizarProducto(
      this.producto._id,
      this.producto.nombre_producto,
      this.producto.precio
    );
    console.log(productoEditado);
    this.presentarProductoActualizadoAlert();
  }

  async presentarProductoActualizadoAlert() {
    const alert = await this.alertController.create({
      header: "Mensaje",
      message: "El producto ha sido actualizado correctamente",
      buttons: ["OK"]
    });

    await alert.present();
  }
}
