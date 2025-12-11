export class GnnRiskPropagationModelClient {
  async propagateRiskOnGraph(
    _zoneId: string,
    _neighbors: string[],
    _riskScores: number[],
  ): Promise<number[]> {
    return _riskScores;
  }
}
