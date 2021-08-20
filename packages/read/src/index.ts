import WriteStream from './WriteStream';
import StreamFactory, { InStreamType } from './StreamFactory';
import Transport from './Transport';

async function main() {
  const transportConfig = {
    clusterId: process.env.CLUSTER_ID || '',
    clientId: process.env.CLIENT_ID || '',
    subject: process.env.SUBJECT || 'default',
    url: process.env.URL,
  };
  const sourceConfig = {
    type: (process.env.SOURCE_TYPE || 'fs') as InStreamType,
    path: process.env.SOURCE_PATH || '',
    highWaterMark: parseInt(process.env.SOURCE_HWM || '', 10) || 0,
  };

  const transport = new Transport(
    transportConfig.clusterId,
    transportConfig.clientId,
    transportConfig.url,
  );

  await transport.connect();

  const processing = async (chunk: string) => {
    return transport.send(transportConfig.subject, chunk);
  };

  const ws = new WriteStream(processing);

  StreamFactory
    .makeInStream(sourceConfig.type, { path: sourceConfig.path, highWaterMark: sourceConfig.highWaterMark })
    .pipe(ws)
    .on('finish', () => {
      transport.close();
      Promise.resolve();
    });
}

main();
