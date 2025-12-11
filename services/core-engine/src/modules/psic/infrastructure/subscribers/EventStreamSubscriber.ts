import { Injectable, Logger } from '@nestjs/common';
import { PSICService } from '../../application/PSICService';

@Injectable()
export class EventStreamSubscriber {
  private readonly logger = new Logger(EventStreamSubscriber.name);

  constructor(private readonly psicService: PSICService) {}

  async handleIncomingEvent(raw: unknown) {
    // هنا لاحقاً راح نستخدم EventMapper + IngestEventUseCase
    this.logger.debug(
      `Received raw event (skeleton subscriber): ${JSON.stringify(raw)}`,
    );

    // TODO: mapping + IngestEventUseCase.execute(...)
  }
}
