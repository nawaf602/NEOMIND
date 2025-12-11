import { IsOptional, IsString } from 'class-validator';

export class GetSocialRiskMapDto {
  @IsString()
  zoneId!: string;

  @IsOptional()
  @IsString()
  dimension?: string;
}
