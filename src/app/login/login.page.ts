import { Component, OnInit } from "@angular/core";
import AutenticacionService from "../services/autenticacion/autenticacion.service";
import { Router } from "@angular/router";
import { AlertController, LoadingController } from "@ionic/angular";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  private usuario: string = "";
  private password: string = "";

  constructor(
    private as: AutenticacionService,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {}

  validarForm() {
    return this.usuario != "" && this.password != "";
  }

  async login() {
    if (this.usuario == "" || this.password == "") {
      this.presentarAlertaMensaje(
        "Debes ingresar todos los campos",
        "Atención"
      );
    } else {
      const loadingLogin = await this.loadingController.create({
        message: "Validando credenciales..."
      });
      await loadingLogin.present();

      const usuario = await this.as.logIn(this.usuario, this.password);
      loadingLogin.dismiss();
      if (!usuario.success) {
        this.presentarAlertaMensaje(
          "No se encontro un recurso con esas credenciales",
          "Login"
        );
      } else {
        localStorage.setItem("usuario", JSON.stringify(usuario.data.recurso));
        this.router.navigateByUrl("folder/Inicio");
      }
    }
  }

  async presentarAlertaMensaje(mensaje: string, header: string) {
    const alert = await this.alertController.create({
      header: header,
      message: mensaje,
      buttons: ["OK"]
    });

    await alert.present();
  }
}
