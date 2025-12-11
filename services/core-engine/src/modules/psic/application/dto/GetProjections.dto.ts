import { IsInt, IsString, Min } from 'class-validator';

export class GetProjectionsDto {
  @IsString()
  zoneId!: string;

  @IsInt()
  @Min(1)
  horizonMinutes!: number;
}
