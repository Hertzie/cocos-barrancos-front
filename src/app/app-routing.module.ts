import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "folder/:id",
    loadChildren: () =>
      import("./folder/folder.module").then(m => m.FolderPageModule)
  },
  {
    path: "login",
    loadChildren: () =>
      import("./login/login.module").then(m => m.LoginPageModule)
  },
  {
    path: 'productos',
    loadChildren: () => import('./productos/productos.module').then( m => m.ProductosPageModule)
  },
  {
    path: 'producto-editar',
    loadChildren: () => import('./producto-editar/producto-editar.module').then( m => m.ProductoEditarPageModule)
  },
  {
    path: 'mesas',
    loadChildren: () => import('./mesas/mesas.module').then( m => m.MesasPageModule)
  },
  {
    path: 'recursos',
    loadChildren: () => import('./recursos/recursos.module').then( m => m.RecursosPageModule)
  },
  {
    path: 'roles',
    loadChildren: () => import('./roles/roles.module').then( m => m.RolesPageModule)
  },
  {
    path: 'nuevo-recurso',
    loadChildren: () => import('./nuevo-recurso/nuevo-recurso.module').then( m => m.NuevoRecursoPageModule)
  },
  {
    path: 'pedido',
    loadChildren: () => import('./pedido/pedido.module').then( m => m.PedidoPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
