import { Injectable } from '@nestjs/common';
import { DecisionService } from '../DecisionService';
import { GetDecisionViewDto } from '../dto/GetDecisionView.dto';

@Injectable()
export class BuildDecisionViewUseCase {
  constructor(private readonly decisionService: DecisionService) {}

  async execute(dto: GetDecisionViewDto) {
    return this.decisionService.buildDecisionView(dto);
  }
}
