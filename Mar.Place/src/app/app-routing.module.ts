import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'usuarios',
    loadChildren: () => import ("./usuarios/module-usuarios/module-usuarios.module").then(m=>m.ModuleUsuariosModule)
  },
  {
    path:'articulos',
    loadChildren: () => import ("./articulos/module-articulos/module-articulos.module").then(m=>m.ModuleArticulosModule)
  },
  {
    path:'pedidos',
    loadChildren: () => import ("./pedidos/module-pedidos/module-pedidos.module").then(m=>m.ModulePedidosModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
