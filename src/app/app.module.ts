import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

//Servicios de app
import AutenticacionService from "./services/autenticacion/autenticacion.service";
import ProductosService from "./services/productos.service";
import RolesService from "./services/roles.service";
import { RecursosService } from "./services/recursos.service";
import { MesasService } from "./services/mesas.service";

//Modales
import { ProductoEditarPage } from "./producto-editar/producto-editar.page";
import { NuevoRecursoPage } from "./nuevo-recurso/nuevo-recurso.page";
import { PedidoPage } from "./pedido/pedido.page";

@NgModule({
  declarations: [
    AppComponent,
    ProductoEditarPage,
    NuevoRecursoPage,
    PedidoPage
  ],
  entryComponents: [ProductoEditarPage, NuevoRecursoPage, PedidoPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AutenticacionService,
    ProductosService,
    RolesService,
    RecursosService,
    MesasService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
