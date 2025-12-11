import { IsISO8601, IsOptional, IsString } from 'class-validator';

export class GetNSDTStateDto {
  @IsOptional()
  @IsString()
  countryCode?: string;

  @IsOptional()
  @IsISO8601()
  at?: string;
}
