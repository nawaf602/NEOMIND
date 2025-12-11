import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class SubmitCommandFeedbackDto {
  @IsString()
  commandId!: string;

  @IsBoolean()
  acknowledged!: boolean;

  @IsBoolean()
  success!: boolean;

  @IsOptional()
  @IsString()
  notes?: string;
}
