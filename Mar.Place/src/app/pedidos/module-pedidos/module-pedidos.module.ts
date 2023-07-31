import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulePedidosRoutingModule } from './module-pedidos-routing.module';
import { DeletePedidosComponent } from '../componentes/delete-pedidos/delete-pedidos.component';
import { CreatePedidosComponent } from '../componentes/create-pedidos/create-pedidos.component';
import { UpdatePedidosComponent } from '../componentes/update-pedidos/update-pedidos.component';
import { DashPedidosComponent } from '../componentes/dash-pedidos/dash-pedidos.component';
import { GetPedidosComponent } from '../componentes/get-pedidos/get-pedidos.component';
import { AppInterceptorServiceService } from 'src/app/servicios/interceptor/app-interceptor.service.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PeticionesUsuariosServiceService } from 'src/app/usuarios/servicios/peticiones-usuarios.service.service';
import { PeticionesArticulosServiceService } from 'src/app/articulos/servicios/peticiones-articulos.service.service';
import { PeticionesPedidosServiceService } from '../servicios/peticiones-pedidos.service.service';

@NgModule({
  declarations: [
    DeletePedidosComponent,
    CreatePedidosComponent,
    UpdatePedidosComponent,
    DashPedidosComponent,
    GetPedidosComponent
  ],
  imports: [
    CommonModule,
    ModulePedidosRoutingModule,
    ReactiveFormsModule,
    FormsModule, 
  ],
  providers: [
    PeticionesUsuariosServiceService,
    PeticionesArticulosServiceService,
    PeticionesPedidosServiceService,
   { provide: HTTP_INTERCEPTORS, useClass:AppInterceptorServiceService, multi:true},
 ],
})
export class ModulePedidosModule { }
