import { IsISO8601, IsString } from 'class-validator';

export class GetZoneTimelineDto {
  @IsString()
  zoneId!: string;

  @IsISO8601()
  from!: string;

  @IsISO8601()
  to!: string;
}
