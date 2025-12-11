import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class GetDecisionViewDto {
  @IsString()
  zoneId!: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  psicRiskScore?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  nsdtStateScore?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  contextScore?: number;
}
