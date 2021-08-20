import fs from 'fs';
import { Readable } from 'stream';

export type InStreamType = 'fs';

type InStreamFsOptions = {
  path: string;
  highWaterMark?: number;
};

type InStreamOptions = InStreamFsOptions;

export default class StreamFactory {
  static makeInStream(type: InStreamType, opts: InStreamOptions): Readable {
    return fs.createReadStream(opts.path, { highWaterMark: opts.highWaterMark });
  }
}
