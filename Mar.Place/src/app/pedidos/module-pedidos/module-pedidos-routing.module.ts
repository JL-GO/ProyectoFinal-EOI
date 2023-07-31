import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashPedidosComponent } from '../componentes/dash-pedidos/dash-pedidos.component';
import { CreatePedidosComponent } from '../componentes/create-pedidos/create-pedidos.component';
import { UpdatePedidosComponent } from '../componentes/update-pedidos/update-pedidos.component';
import { DeletePedidosComponent } from '../componentes/delete-pedidos/delete-pedidos.component';
import { GetPedidosComponent } from '../componentes/get-pedidos/get-pedidos.component';

const routes: Routes = [
  {
    path:'', component:DashPedidosComponent,
    children:[
      {
        path: 'create-pedido', component:CreatePedidosComponent
      },
      {
        path: 'update-pedido', component:UpdatePedidosComponent
      },
      {
        path: 'delete-pedido', component:DeletePedidosComponent
      },
      {
        path: 'get-pedido', component:GetPedidosComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulePedidosRoutingModule { }
