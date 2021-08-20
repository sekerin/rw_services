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

  async send(subject: string, message: string): Promise<string> {
    return new Promise(((resolve, reject) => {
      this.conn?.publish(subject, message, (err, guid) => {
        if (err) {
          reject(err);
        } else {
          resolve(guid);
        }
      });
    }));
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
