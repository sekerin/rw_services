import nats, { Stan } from 'node-nats-streaming';

export default class Transport {
  private conn: Stan | undefined;

  constructor(
    private readonly clusterId: string,
    private readonly clientId: string,
    private readonly url?: string
  ) {
  }

  async connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.conn = nats.connect(this.clusterId, this.clientId, { url: this.url });

      this.conn.on('connect', () => {
        console.log('connect success');
        resolve();
      });

      this.conn.on('error', (err) => {
        reject(err);
      });
    });
  }

  subscriptionOptions() {
    return this.conn?.subscriptionOptions();
  }

  subscribe(subject: string, process: (msg: string) => void) {
    const opts = this.subscriptionOptions();

    const subs = this.conn!.subscribe(subject, opts);

    subs.on('message', (msg) => {
      process(msg.getData());
    });
  }

  async close(): Promise<void> {
    this.conn?.on('close', (err) => {
      if (err) {
        Promise.reject(`closed or err = ${err}`);
      }

      Promise.resolve();
    });

    this.conn?.close();
  }
}
