import { Writable } from 'stream';

export default class WriteStream extends Writable {
  constructor(private readonly processing: (chunk: any) => void) {
    super();
  }

  _write(chunk: any, encoding: BufferEncoding, callback: (error?: (Error | null)) => void) {
    this.processing(chunk);
    callback();
  }
}
