import { Component } from '@angular/core';

@Component({
  selector: 'ngx-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.scss'],
})
export class ConfiguracoesComponent {
  settings = [
    { nome: 'Notificacoes por email', valor: 'Ativado' },
    { nome: 'SLA padrao de chamados', valor: '4 horas' },
    { nome: 'Meta mensal da equipe', valor: 'R$ 420.000' },
    { nome: 'Atualizacao automatica de relatorios', valor: 'Diaria 08:00' },
  ];
}
