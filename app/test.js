import Request from './Request';
import sequencer from 'promise-sequencer';
import Server from 'express-emitter';

const port = 5555;
const url = `http://localhost:${port}`;

sequencer(
  () => new Promise((resolve, reject) => {
    new Server(app => {
      app
        .set('port', port)
        .get('/', (req, res) => res.send('Welcome!'))
        .get('/error', (req, res, next) => next(new Error('Error')))
      ;
    })
      .on('listening', resolve)
      .on('error', reject);
  }),

  () => new Request(url).then(response => console.log(response.status)),

  () => new Promise((resolve, reject) => {
    new Request(`${url}/error`)
      .catch(error => {
        console.log(error.status);
        resolve();
    });
  })
)
  .then(() => {console.log('OK!'); process.exit()})
  .catch(error => {console.log('KO!', error.stack); process.exit()});
