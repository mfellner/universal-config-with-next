import micro from 'micro';
import * as next from 'next';
import conf from './conf';
import log from './log';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const port = conf.getNumber('port', 3000);

app.prepare().then(() => {
  micro(handle).listen(port, (err?: Error) => {
    if (err) {
      throw err;
    }
    log.info(`> Ready on http://localhost:${port}`);
  });
});
