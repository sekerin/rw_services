import Connect from './Connect';
import StreamFactory from './StreamFactory';
import SystemSignals from './SystemSignals';

async function main() {
  const conn = new Connect('test-cluster', 'write');

  await conn.connect();

  const wsf = StreamFactory.makeStream('./asd2.txt');

  const processData = (message: string) => {
    wsf.write(message);
  };

  conn.subscribe('lol', processData);

  const handler = () => {
    wsf.close();
    conn.close();
  };

  new SystemSignals(handler);
}

main();
