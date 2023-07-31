import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppAutentificacionServiceService } from './servicios/autentificacion/app-autentificacion.service.service';
import { AppInterceptorServiceService } from './servicios/interceptor/app-interceptor.service.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule 
  ],
  providers: [
    AppAutentificacionServiceService,
    { provide: HTTP_INTERCEPTORS, useClass:AppInterceptorServiceService, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
