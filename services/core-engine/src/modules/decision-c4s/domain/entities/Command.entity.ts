// src/modules/decision-c4s/domain/entities/Command.entity.ts

export type CommandPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type CommandStatus = 'PENDING' | 'ACK' | 'IN_PROGRESS' | 'COMPLETED';

export interface CommandTarget {
  type: 'PATROL_UNIT' | 'FIELD_TEAM' | 'CAMERA' | 'DRONE' | 'OTHER';
  id: string;
  label: string;
}

export interface Command {
  id: string;
  zoneId: string;
  title: string;
  description: string;
  priority: CommandPriority;
  status: CommandStatus;
  target: CommandTarget;
  createdAt: Date;
  updatedAt: Date;
}
