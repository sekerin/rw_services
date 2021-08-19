import fs from 'fs';
import StreamFactory from './StreamFactory';

describe('StreamFactory component', () => {
  it('should makeStream will return fs WriteStream', () => {
    const result = StreamFactory.makeStream('some path to file');

    expect(result).toBeInstanceOf(fs.WriteStream);
  });
});
