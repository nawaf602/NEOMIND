import { Injectable } from '@nestjs/common';
import { DecisionService } from '../DecisionService';
import { SubmitCommandFeedbackDto } from '../dto/SubmitCommandFeedback.dto';

@Injectable()
export class SubmitCommandFeedbackUseCase {
  constructor(private readonly decisionService: DecisionService) {}

  async execute(dto: SubmitCommandFeedbackDto) {
    return this.decisionService.submitCommandFeedback(dto);
  }
}
