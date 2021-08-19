import process from 'process';

export default class SystemSignals {
  constructor(private readonly handler: () => void) {
    process.on('SIGINT', handler);
    process.on('SIGTERM', handler);
  }
}
