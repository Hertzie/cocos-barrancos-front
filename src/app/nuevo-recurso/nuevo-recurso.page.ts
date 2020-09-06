import { ModalController, AlertController } from "@ionic/angular";
import { RecursosService } from "./../services/recursos.service";
import { Component, OnInit } from "@angular/core";
import RolesService from "../services/roles.service";

@Component({
  selector: "app-nuevo-recurso",
  templateUrl: "./nuevo-recurso.page.html",
  styleUrls: ["./nuevo-recurso.page.scss"]
})
export class NuevoRecursoPage implements OnInit {
  private nombre: string = "";
  private usuario: string = "";
  private password: string = "";
  private rol: any = null;
  private rolesArray: any[] = [];
  constructor(
    private rs: RecursosService,
    private roles: RolesService,
    private modalController: ModalController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.obtenerRoles();
  }

  cerrarModal() {
    this.modalController.dismiss();
  }

  async obtenerRoles() {
    const respuesta = await this.roles.obtenerRoles();
    this.rolesArray = respuesta.data.registros;
  }

  async guardarRecurso() {}

  async validarCampos() {
    if (
      this.nombre == "" ||
      this.usuario == "" ||
      this.password == "" ||
      this.rol == null
    ) {
      this.presentarAlertMensaje("Debes llenar todos los campos");
    } else {
      const usuario = {
        nombre_recurso: this.nombre,
        rol: this.rol,
        fecha_alta: `${new Date().getDate()}/${new Date().getMonth() +
          1}/${new Date().getFullYear()}`,
        fecha_baja: "",
        usuario: this.usuario,
        password: this.password
      };

      const usuarioCreado = await this.rs.crearRecurso(usuario);
      this.modalController.dismiss(usuarioCreado);
      this.presentarAlertMensaje("Recurso creado correctamente");
    }
  }

  async presentarAlertMensaje(mensaje: string) {
    const alert = await this.alertController.create({
      header: "Mensaje",
      message: mensaje,
      buttons: ["OK"]
    });

    await alert.present();
  }
}
