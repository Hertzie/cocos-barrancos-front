import { ModalController, NavParams, AlertController } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";
import ProductosService from "../services/productos.service";

@Component({
  selector: "app-pedido",
  templateUrl: "./pedido.page.html",
  styleUrls: ["./pedido.page.scss"]
})
export class PedidoPage implements OnInit {
  private mesa: any;
  private productos: any[] = [];
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private ps: ProductosService,
    private alertController: AlertController
  ) {
    this.mesa = this.navParams.get("mesa");
  }

  ngOnInit() {
    this.obtenerProductos();
  }

  cerrarModal() {
    this.modalController.dismiss();
  }

  async obtenerProductos() {
    const respuesta = await this.ps.obtenerProductos();
    this.productos = respuesta.data.registros;
    console.log("productos: ", this.productos);
  }
}
