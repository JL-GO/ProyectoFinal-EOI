import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashUsuariosComponent } from '../componentes/dash-usuarios/dash-usuarios.component';
import { CreateUsuariosComponent } from '../componentes/create-usuarios/create-usuarios.component';
import { UpdateUsuariosComponent } from '../componentes/update-usuarios/update-usuarios.component';
import { DeleteUsuariosComponent } from '../componentes/delete-usuarios/delete-usuarios.component';
import { GetUsuariosComponent } from '../componentes/get-usuarios/get-usuarios.component';

const routes: Routes = [
  {
    path:'', component:DashUsuariosComponent,
    children:[
      {
        path: 'create-usuario', component:CreateUsuariosComponent
      },
      {
        path: 'update-usuario', component:UpdateUsuariosComponent
      },
      {
        path: 'delete-usuario', component:DeleteUsuariosComponent
      },
      {
        path: 'get-usuario', component:GetUsuariosComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleUsuariosRoutingModule { }
