import { Component } from '@angular/core';

@Component({
  selector: 'ngx-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.scss'],
})
export class RelatoriosComponent {
  reports = [
    { nome: 'Performance Comercial', periodo: 'Mensal', atualizado: 'Hoje 08:45', status: 'Pronto' },
    { nome: 'SLA de Chamados', periodo: 'Semanal', atualizado: 'Hoje 09:10', status: 'Pronto' },
    { nome: 'Conversao por Canal', periodo: 'Mensal', atualizado: 'Ontem 18:20', status: 'Pronto' },
    { nome: 'Inadimplencia por Carteira', periodo: 'Mensal', atualizado: 'Em processamento', status: 'Processando' },
  ];
}
