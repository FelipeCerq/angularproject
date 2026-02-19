/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ChamadosComponent } from './chamados/chamados.component';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';
import { PerfilComponent } from './perfil/perfil.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    LayoutComponent,
    DashboardComponent,
    RelatoriosComponent,
    ClientesComponent,
    ChamadosComponent,
    ConfiguracoesComponent,
    PerfilComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
