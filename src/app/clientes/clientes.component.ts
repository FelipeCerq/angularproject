import { Component } from '@angular/core';

interface Cliente {
  nome: string;
  segmento: string;
  responsavel: string;
  fase: string;
  status: 'Ativo' | 'Inativo' | 'Prospect';
}

@Component({
  selector: 'ngx-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent {
  clientes: Cliente[] = [
    { nome: 'ACME Industria', segmento: 'B2B', responsavel: 'Amanda', fase: 'Proposta', status: 'Prospect' },
    { nome: 'Nova Farma', segmento: 'Saude', responsavel: 'Rafael', fase: 'Negociacao', status: 'Ativo' },
    { nome: 'Loja Central', segmento: 'Varejo', responsavel: 'Bruna', fase: 'Ativo', status: 'Ativo' },
    { nome: 'Grupo Atlas', segmento: 'Logistica', responsavel: 'Felipe', fase: 'Onboarding', status: 'Prospect' },
    { nome: 'Smart Med', segmento: 'Saude', responsavel: 'Amanda', fase: 'Ativo', status: 'Ativo' },
    { nome: 'Polo Tech', segmento: 'Tecnologia', responsavel: 'Rafael', fase: 'Negociacao', status: 'Prospect' },
    { nome: 'Mercado Sul', segmento: 'Varejo', responsavel: 'Bruna', fase: 'Renovacao', status: 'Inativo' },
  ];

  searchTerm = '';
  selectedSegment = 'Todos';
  selectedStatus = 'Todos';
  selectedOwner = 'Todos';
  sortBy = 'nome-asc';

  get segmentos(): string[] {
    return ['Todos', ...new Set(this.clientes.map(cliente => cliente.segmento))];
  }

  get statuses(): string[] {
    return ['Todos', ...new Set(this.clientes.map(cliente => cliente.status))];
  }

  get owners(): string[] {
    return ['Todos', ...new Set(this.clientes.map(cliente => cliente.responsavel))];
  }

  get filteredClientes(): Cliente[] {
    const term = this.searchTerm.trim().toLowerCase();

    const filtered = this.clientes.filter(cliente => {
      const matchesTerm = !term
        || cliente.nome.toLowerCase().includes(term)
        || cliente.segmento.toLowerCase().includes(term)
        || cliente.responsavel.toLowerCase().includes(term)
        || cliente.fase.toLowerCase().includes(term);

      const matchesSegment = this.selectedSegment === 'Todos' || cliente.segmento === this.selectedSegment;
      const matchesStatus = this.selectedStatus === 'Todos' || cliente.status === this.selectedStatus;
      const matchesOwner = this.selectedOwner === 'Todos' || cliente.responsavel === this.selectedOwner;

      return matchesTerm && matchesSegment && matchesStatus && matchesOwner;
    });

    return filtered.sort((a, b) => this.sorter(a, b));
  }

  get filteredActiveCount(): number {
    return this.filteredClientes.filter(cliente => cliente.status === 'Ativo').length;
  }

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value || '';
  }

  onSegmentChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedSegment = target.value || 'Todos';
  }

  onStatusChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedStatus = target.value || 'Todos';
  }

  onOwnerChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedOwner = target.value || 'Todos';
  }

  onSortChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.sortBy = target.value || 'nome-asc';
  }

  private sorter(a: Cliente, b: Cliente): number {
    switch (this.sortBy) {
      case 'nome-desc':
        return b.nome.localeCompare(a.nome);
      case 'segmento-asc':
        return a.segmento.localeCompare(b.segmento);
      case 'segmento-desc':
        return b.segmento.localeCompare(a.segmento);
      case 'responsavel-asc':
        return a.responsavel.localeCompare(b.responsavel);
      case 'responsavel-desc':
        return b.responsavel.localeCompare(a.responsavel);
      default:
        return a.nome.localeCompare(b.nome);
    }
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedSegment = 'Todos';
    this.selectedStatus = 'Todos';
    this.selectedOwner = 'Todos';
    this.sortBy = 'nome-asc';
  }
}
