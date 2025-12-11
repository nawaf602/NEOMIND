import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';

export type LogLevel = 'debug' | 'log' | 'warn' | 'error';

@Injectable()
export class AppLogger implements NestLoggerService {
  private readonly context?: string;

  constructor(context?: string) {
    this.context = context;
  }

  private formatMessage(level: LogLevel, message: unknown): string {
    const ts = new Date().toISOString();
    const ctx = this.context ? ` [${this.context}]` : '';
    return `[${ts}] [${level.toUpperCase()}]${ctx} ${String(message)}`;
  }

  log(message: unknown) {
    console.log(this.formatMessage('log', message));
  }

  error(message: unknown, trace?: string) {
    console.error(this.formatMessage('error', message));
    if (trace) {
      console.error(trace);
    }
  }

  warn(message: unknown) {
    console.warn(this.formatMessage('warn', message));
  }

  debug(message: unknown) {
    console.debug(this.formatMessage('debug', message));
  }

  verbose(message: unknown) {
    // نعامل verbose على أنه debug في هذه المرحلة
    this.debug(message);
  }

  // helper لإنشاء لوقر بسياق مختلف (مثلاً لخدمة معينة)
  withContext(context: string): AppLogger {
    return new AppLogger(context);
  }
}
