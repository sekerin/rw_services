import Connect from './Connect';
import StreamFactory from './StreamFactory';
import SystemSignals from './SystemSignals';

async function main() {
  const transportConfig = {
    clusterId: process.env.CLUSTER_ID || '',
    clientId: process.env.CLIENT_ID || '',
    subject: process.env.SUBJECT || 'default',
    url: process.env.URL,
  };

  const targetConfig = {
    path: process.env.TARGET_PATH || '',
  };

  const conn = new Connect(
    transportConfig.clusterId,
    transportConfig.clientId,
    transportConfig.url,
  );

  await conn.connect();

  const wsf = StreamFactory.makeStream(targetConfig.path);

  const processData = (message: any) => {
    wsf.write(message);
  };

  conn.subscribe(transportConfig.subject, processData);

  const handler = () => {
    wsf.close();
    conn.close();
  };

  new SystemSignals(handler);
}

main();
