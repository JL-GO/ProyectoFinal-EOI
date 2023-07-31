import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleArticulosRoutingModule } from './module-articulos-routing.module';
import { UpdateArticulosComponent } from '../componentes/update-articulos/update-articulos.component';
import { CreateArticulosComponent } from '../componentes/create-articulos/create-articulos.component';
import { DeleteArticulosComponent } from '../componentes/delete-articulos/delete-articulos.component';
import { DashArticulosComponent } from '../componentes/dash-articulos/dash-articulos.component';
import { GetArticulosComponent } from '../componentes/get-articulos/get-articulos.component';
import { AppInterceptorServiceService } from 'src/app/servicios/interceptor/app-interceptor.service.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UpdateArticulosComponent,
    CreateArticulosComponent,
    DeleteArticulosComponent,
    DashArticulosComponent,
    GetArticulosComponent
  ],
  imports: [
    CommonModule,
    ModuleArticulosRoutingModule,
    ReactiveFormsModule,
    FormsModule 
  ],
   providers: [
    { provide: HTTP_INTERCEPTORS, useClass:AppInterceptorServiceService, multi:true},
  ],
})
export class ModuleArticulosModule { }
