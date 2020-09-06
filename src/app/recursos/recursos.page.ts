import { NuevoRecursoPage } from "./../nuevo-recurso/nuevo-recurso.page";
import { AlertController, ModalController } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";
import { RecursosService } from "../services/recursos.service";
import RolesService from "../services/roles.service";

@Component({
  selector: "app-recursos",
  templateUrl: "./recursos.page.html",
  styleUrls: ["./recursos.page.scss"]
})
export class RecursosPage implements OnInit {
  private recursos: any[] = [];
  private roles: any[] = [];
  constructor(
    private rs: RecursosService,
    private rolesService: RolesService,
    private alertController: AlertController,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.obtenerRoles();
    this.obtenerRecursos();
  }

  ngAfterContentInit() {
    this.recursos = [];
    this.obtenerRecursos();
  }

  async obtenerRecursos() {
    const respuesta = await this.rs.obtenerRecursos();

    if (respuesta && respuesta.success) {
      this.recursos = respuesta.data.registros;
      console.log("Recursos: ", this.recursos);
    }
  }

  async obtenerRoles() {
    const respuesta = await this.rolesService.obtenerRoles();
    if (respuesta && respuesta.success) {
      this.roles = respuesta.data.registros;
      console.log("Roles: ", this.roles);
    }
  }

  async presentarNuevoRecursoModal() {
    const modal = await this.modalController.create({
      component: NuevoRecursoPage
    });

    modal.onDidDismiss().then(data => {
      this.recursos.push(data.data.data);
    });

    return await modal.present();
  }

  async presentarEditarRecursoPrompt(recurso: any) {
    const prompt = await this.alertController.create({
      header: "Editar rol",
      inputs: [
        {
          name: "administrador",
          type: "radio",
          label: "Administrador",
          value: 1,
          checked: recurso.rol.nombre_rol == "Administrador"
        },
        {
          name: "cajero",
          type: "radio",
          label: "Cajero",
          value: 2,
          checked: recurso.rol.nombre_rol == "Cajero"
        },
        {
          name: "mesero",
          type: "radio",
          label: "Mesero",
          value: 3,
          checked: recurso.rol.nombre_rol == "Mesero"
        }
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel"
        },
        {
          text: "Guardar",
          handler: async data => {
            const recursoEditado = await this.rs.cambiarRolRecurso(
              recurso._id,
              data
            );
            const recursoIndex = this.recursos.findIndex(
              r => r._id == recursoEditado._id
            );
            this.recursos[recursoIndex] = recursoEditado;

            this.presentarAlertMensaje(
              "Recurso editado correctamente",
              "Mensaje"
            );
          }
        }
      ]
    });

    await prompt.present();
  }

  async presentarAlertMensaje(mensaje: string, header: string) {
    const alert = await this.alertController.create({
      header: header,
      message: mensaje,
      buttons: ["OK"]
    });

    await alert.present();
  }

  async presentarReactivarRecurso(recurso) {
    const prompt = await this.alertController.create({
      header: "Reactivar recurso",
      message: "¿Desear reactivar a este recurso?",
      buttons: [
        {
          text: "Cancelar",
          role: "cancel"
        },
        {
          text: "Aceptar",
          handler: async () => {
            const recursoReactivado = await this.rs.reactivarRecurso({
              id_recurso: recurso._id
            });
            if (recursoReactivado) {
              this.presentarAlertMensaje(
                "Recurso reactivado correctamente",
                "Mensaje"
              );
              this.recursos = [];
              this.obtenerRecursos();
            }
          }
        }
      ]
    });

    await prompt.present();
  }

  async presentarBajaRecurso(recurso) {
    const prompt = await this.alertController.create({
      header: "Baja recurso",
      message: "¿Deseas dar de baja este recurso?",
      buttons: [
        {
          text: "Cancelar",
          role: "cancel"
        },
        {
          text: "Aceptar",
          handler: async () => {
            const bajaRecurso = await this.rs.bajaRecurso({
              id_recurso: recurso._id
            });
            if (bajaRecurso) {
              this.presentarAlertMensaje(
                "Recurso dado de baja correctamente",
                "Baja recurso"
              );
              this.recursos = [];
              this.obtenerRecursos();
            }
          }
        }
      ]
    });

    await prompt.present();
  }
}
