import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUsuariosRoutingModule } from './module-usuarios-routing.module';
import { DashUsuariosComponent } from '../componentes/dash-usuarios/dash-usuarios.component';
import { DeleteUsuariosComponent } from '../componentes/delete-usuarios/delete-usuarios.component';
import { CreateUsuariosComponent } from '../componentes/create-usuarios/create-usuarios.component';
import { UpdateUsuariosComponent } from '../componentes/update-usuarios/update-usuarios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppInterceptorServiceService } from 'src/app/servicios/interceptor/app-interceptor.service.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { GetUsuariosComponent } from '../componentes/get-usuarios/get-usuarios.component';


@NgModule({
  declarations: [
    DashUsuariosComponent,
    DeleteUsuariosComponent,
    CreateUsuariosComponent,
    UpdateUsuariosComponent,
    GetUsuariosComponent
  ],
  imports: [
    CommonModule,
    ModuleUsuariosRoutingModule,
    ReactiveFormsModule,
    FormsModule 
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass:AppInterceptorServiceService, multi:true},
  ],
})
export class ModuleUsuariosModule { }
