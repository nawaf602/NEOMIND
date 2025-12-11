import { IsOptional, IsString } from 'class-validator';

export class GetIdentityRiskProfileDto {
  @IsString()
  identityId!: string;

  @IsOptional()
  @IsString()
  zoneId?: string;
}
