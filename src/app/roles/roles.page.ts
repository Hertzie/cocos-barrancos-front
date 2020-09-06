import { Component, OnInit } from "@angular/core";
import RolesService from "../services/roles.service";

@Component({
  selector: "app-roles",
  templateUrl: "./roles.page.html",
  styleUrls: ["./roles.page.scss"]
})
export class RolesPage implements OnInit {
  private roles: any[] = [];
  constructor(private rs: RolesService) {}

  ngOnInit() {
    this.obtenerRoles();
  }

  async obtenerRoles() {
    const respuesta = await this.rs.obtenerRoles();
    if (respuesta && respuesta.success) {
      this.roles = respuesta.data.registros;
      console.log("Roles: ", this.roles);
    }
  }
}
