export interface DomainEvent<TPayload = unknown> {
  readonly name: string;
  readonly occurredAt: Date;
  readonly payload: TPayload;
}

/**
 * أحداث أساسية للمنصة ممكن نستخدمها كأسماء موحّدة لاحقاً.
 */
export enum CoreEventNames {
  IncidentIngested = 'incident.ingested',
  RiskProjectionUpdated = 'risk.projection.updated',
  NSDTStateUpdated = 'nsdt.state.updated',
}
