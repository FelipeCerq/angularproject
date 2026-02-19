import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ChamadosComponent } from './chamados/chamados.component';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';
import { PerfilComponent } from './perfil/perfil.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'relatorios',
        component: RelatoriosComponent,
      },
      {
        path: 'clientes',
        component: ClientesComponent,
      },
      {
        path: 'chamados',
        component: ChamadosComponent,
      },
      {
        path: 'configuracoes',
        component: ConfiguracoesComponent,
      },
      {
        path: 'perfil',
        component: PerfilComponent,
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'login' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
