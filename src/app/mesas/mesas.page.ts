import { PedidoPage } from "./../pedido/pedido.page";
import { ModalController } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";
import { MesasService } from "../services/mesas.service";

@Component({
  selector: "app-mesas",
  templateUrl: "./mesas.page.html",
  styleUrls: ["./mesas.page.scss"]
})
export class MesasPage implements OnInit {
  private mesas: any[] = [];
  constructor(
    private ms: MesasService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.obtenerMesas();
  }

  async obtenerMesas() {
    const respuesta = await this.ms.obtenerMesas();
    this.mesas = respuesta.data.data.registros;
    console.log("Mesas: ", this.mesas);
  }

  async presentarModalPedido(mesa: any) {
    const modal = await this.modalController.create({
      component: PedidoPage,
      componentProps: {
        mesa: mesa
      }
    });

    return await modal.present();
  }
}
