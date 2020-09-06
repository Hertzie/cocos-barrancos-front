import { Component, OnInit } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import AutenticacionService from "./services/autenticacion/autenticacion.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public usuario: any;
  public environment: string;
  public appPages = [
    {
      title: "Productos",
      url: "productos",
      icon: "file-tray-stacked"
    },
    {
      title: "Roles",
      url: "roles",
      icon: "construct"
    },
    {
      title: "Recursos",
      url: "recursos",
      icon: "people"
    },
    {
      title: "Mesas",
      url: "mesas",
      icon: "fast-food"
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private as: AutenticacionService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split("folder/")[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(
        page => page.title.toLowerCase() === path.toLowerCase()
      );
    }
  }

  logOut() {
    this.as.logOut();
    this.router.navigateByUrl("login");
  }
}
