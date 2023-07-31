import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashArticulosComponent } from '../componentes/dash-articulos/dash-articulos.component';
import { CreateArticulosComponent } from '../componentes/create-articulos/create-articulos.component';
import { UpdateArticulosComponent } from '../componentes/update-articulos/update-articulos.component';
import { DeleteArticulosComponent } from '../componentes/delete-articulos/delete-articulos.component';
import { GetArticulosComponent } from '../componentes/get-articulos/get-articulos.component';

const routes: Routes = [
  {
    path:'', component:DashArticulosComponent,
    children:[
      {
        path: 'create-articulo', component:CreateArticulosComponent
      },
      {
        path: 'update-articulo', component:UpdateArticulosComponent
      },
      {
        path: 'delete-articulo', component:DeleteArticulosComponent
      },
      {
        path: 'get-articulo', component:GetArticulosComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleArticulosRoutingModule { }
