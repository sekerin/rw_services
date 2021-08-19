import WriteStream from './WriteStream';
import StreamFactory from './StreamFactory';
import Transport from './Transport';

async function main() {
  const transport = new Transport('test-cluster', 'read');

  await transport.connect();

  const processing = (chunk: string) => {
    transport.send(chunk);
  };

  const ws = new WriteStream(processing);

  StreamFactory
    .makeInStream('fs', { path: './asd.txt', highWaterMark: 10 })
    .pipe(ws)
    .on('finish', () => {
      transport.close();
      Promise.resolve();
    });
}

main();
