import { IsString, IsNumber, IsOptional, IsISO8601, IsEnum } from 'class-validator';

export enum IngestEventSource {
  CAMERA = 'CAMERA',
  SENSOR = 'SENSOR',
  MANUAL_REPORT = 'MANUAL_REPORT',
  EXTERNAL_SYSTEM = 'EXTERNAL_SYSTEM',
}

export class IngestEventDto {
  @IsString()
  id: string;

  @IsISO8601()
  timestamp: string;

  @IsString()
  eventType: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsOptional()
  @IsString()
  zoneId?: string;

  @IsOptional()
  @IsEnum(IngestEventSource)
  source?: IngestEventSource;

  @IsOptional()
  metadata?: Record<string, any>;
}
