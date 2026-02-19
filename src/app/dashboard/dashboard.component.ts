import { Component } from '@angular/core';

@Component({
  selector: 'ngx-dashboard',
  template: `
<section class="cards">
  <article class="card stat-card" [ngClass]="metric.theme" *ngFor="let metric of metrics">
    <h2>{{ metric.title }}</h2>
    <p>{{ metric.value }}</p>
    <span>{{ metric.detail }}</span>
    <div class="sparkline"></div>
  </article>
</section>

<section class="traffic panel">
  <div class="panel-head">
    <div>
      <h3>Trafego</h3>
      <p>1 de Janeiro, 2026 - 19 de Fevereiro, 2026</p>
    </div>
    <button type="button">Exportar</button>
  </div>
  <div class="chart-grid">
    <div class="chart-area">
      <div class="fake-chart"></div>
    </div>
    <div class="channel-list">
      <div class="channel-row" *ngFor="let channel of channels">
        <div class="channel-label">
          <span>{{ channel.name }}</span>
          <strong>{{ channel.total | number }}</strong>
        </div>
        <div class="progress">
          <div class="bar" [style.width.%]="channel.value" [style.background]="channel.color"></div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="two-columns">
  <article class="panel">
    <h3>Fontes de aquisicao</h3>
    <div class="table">
      <div class="row head">
        <span>Origem</span>
        <span>Usuarios</span>
        <span>Taxa</span>
        <span>Receita</span>
        <span>Conversao</span>
      </div>
      <div class="row" *ngFor="let row of trafficRows">
        <span>{{ row.source }}</span>
        <span>{{ row.users | number }}</span>
        <span>{{ row.rate }}</span>
        <span>{{ row.revenue }}</span>
        <span>{{ row.conversion }}</span>
      </div>
    </div>
  </article>

  <article class="panel">
    <h3>Chamados recentes</h3>
    <div class="ticket" *ngFor="let ticket of tickets">
      <div>
        <strong>{{ ticket.id }}</strong>
        <p>{{ ticket.title }}</p>
      </div>
      <div class="badge">{{ ticket.priority }}</div>
      <small>{{ ticket.owner }}</small>
    </div>
  </article>
</section>
  `,
  styles: [`
:host {
  --c-primary: #321fdb;
  --c-info: #39f;
  --c-warning: #f9b115;
  --c-danger: #e55353;
}

.cards {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
}

.card {
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.09);
}

.stat-card {
  color: #fff;
}

.stat-card.primary {
  background: var(--c-primary);
}

.stat-card.info {
  background: var(--c-info);
}

.stat-card.warning {
  background: var(--c-warning);
}

.stat-card.danger {
  background: var(--c-danger);
}

.stat-card h2 {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 600;
  opacity: 0.9;
}

.stat-card p {
  margin: 0.35rem 0;
  font-size: 1.65rem;
  font-weight: 700;
}

.stat-card span {
  font-size: 0.82rem;
  opacity: 0.9;
}

.sparkline {
  height: 36px;
  margin-top: 0.7rem;
  border-radius: 6px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.38), rgba(255, 255, 255, 0.06));
}

.panel {
  margin-top: 1rem;
  background: #fff;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.09);
}

.panel h3 {
  margin: 0;
  color: #263148;
}

.panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.8rem;
}

.panel-head p {
  margin: 0.2rem 0 0;
  color: #6b7a99;
  font-size: 0.85rem;
}

.panel-head button {
  border: 1px solid #d8e0f0;
  background: #fff;
  color: #263148;
  border-radius: 8px;
  padding: 0.5rem 0.8rem;
  cursor: pointer;
}

.chart-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: 2fr 1fr;
}

.fake-chart {
  height: 230px;
  border-radius: 8px;
  background:
    linear-gradient(to top, rgba(50, 31, 219, 0.15), rgba(50, 31, 219, 0.02)),
    repeating-linear-gradient(
      to right,
      rgba(50, 31, 219, 0.12),
      rgba(50, 31, 219, 0.12) 2px,
      transparent 2px,
      transparent 44px
    ),
    #f7f9fe;
}

.channel-row {
  margin-bottom: 0.8rem;
}

.channel-label {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #55627e;
}

.channel-label strong {
  color: #2b3752;
}

.progress {
  margin-top: 0.35rem;
  background: #edf1f8;
  border-radius: 999px;
  height: 8px;
  overflow: hidden;
}

.bar {
  height: 100%;
  border-radius: 999px;
}

.two-columns {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1.4fr 1fr;
}

.table .row {
  display: grid;
  grid-template-columns: 1.3fr 1fr 0.8fr 1fr 0.9fr;
  gap: 0.7rem;
  padding: 0.65rem 0;
  border-bottom: 1px solid #edf1f8;
  color: #3f4d69;
  font-size: 0.9rem;
}

.table .row.head {
  font-weight: 700;
  color: #677694;
}

.ticket {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 0.8rem;
  align-items: center;
  border-bottom: 1px solid #edf1f8;
  padding: 0.7rem 0;
}

.ticket strong {
  color: #2a3752;
}

.ticket p {
  margin: 0.1rem 0 0;
  color: #54617d;
  font-size: 0.9rem;
}

.badge {
  background: #fff3cd;
  color: #946200;
  border-radius: 999px;
  padding: 0.2rem 0.55rem;
  font-size: 0.75rem;
  font-weight: 700;
}

.ticket small {
  color: #6f7e9d;
}

@media (max-width: 1100px) {
  .chart-grid,
  .two-columns {
    grid-template-columns: 1fr;
  }
}
  `],
})
export class DashboardComponent {
  metrics = [
    { title: 'Usuarios', value: '26.432', detail: '-12.4% na semana', theme: 'primary' },
    { title: 'Receita', value: 'R$ 43.920', detail: '+40.9% no mes', theme: 'info' },
    { title: 'Conversao', value: '9.48%', detail: '+84.7% no trimestre', theme: 'warning' },
    { title: 'Sessoes', value: '44.128', detail: '-23.6% na semana', theme: 'danger' },
  ];

  channels = [
    { name: 'Organico', total: 191235, value: 56, color: 'var(--c-primary)' },
    { name: 'Google Ads', total: 51223, value: 28, color: 'var(--c-info)' },
    { name: 'Parceiros', total: 37210, value: 18, color: 'var(--c-warning)' },
    { name: 'Social', total: 24201, value: 14, color: 'var(--c-danger)' },
  ];

  trafficRows = [
    { source: 'Google', users: 37492, rate: '38%', revenue: 'R$ 20.3k', conversion: '2.6%' },
    { source: 'Instagram', users: 24120, rate: '24%', revenue: 'R$ 14.1k', conversion: '1.8%' },
    { source: 'LinkedIn', users: 11284, rate: '16%', revenue: 'R$ 9.8k', conversion: '2.1%' },
    { source: 'Email', users: 9120, rate: '11%', revenue: 'R$ 6.4k', conversion: '3.3%' },
    { source: 'Direto', users: 8520, rate: '9%', revenue: 'R$ 5.1k', conversion: '2.9%' },
  ];

  tickets = [
    { id: '#2048', title: 'Erro na regra de comissao', priority: 'Alta', owner: 'Rafael' },
    { id: '#2041', title: 'Cliente sem acesso ao portal', priority: 'Media', owner: 'Amanda' },
    { id: '#2039', title: 'Integracao de webhook pendente', priority: 'Alta', owner: 'Felipe' },
    { id: '#2033', title: 'Ajuste no layout da proposta', priority: 'Baixa', owner: 'Bruna' },
  ];
}
