import { Writable } from 'stream';

export default class WriteStream extends Writable {
  constructor(private readonly processing: (chunk: any) => Promise<any>) {
    super();
  }

  _write(chunk: any, encoding: BufferEncoding, callback: (error?: (Error | null)) => void) {
    this.processing(chunk).then(() => {
      callback();
    });
  }
}
