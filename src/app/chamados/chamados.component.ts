import { Component } from '@angular/core';

@Component({
  selector: 'ngx-chamados',
  templateUrl: './chamados.component.html',
  styleUrls: ['./chamados.component.scss'],
})
export class ChamadosComponent {
  chamados = [
    { id: '#1942', assunto: 'Erro ao emitir proposta', prioridade: 'Alta', status: 'Em andamento' },
    { id: '#1938', assunto: 'Ajuste de permissao de usuario', prioridade: 'Media', status: 'Pendente' },
    { id: '#1931', assunto: 'Integracao com ERP', prioridade: 'Alta', status: 'Escalado' },
    { id: '#1925', assunto: 'Atualizacao de dados cadastrais', prioridade: 'Baixa', status: 'Concluido' },
  ];
}
