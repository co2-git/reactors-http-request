import superagent from 'superagent';
import Reactors from 'reactors';
import {EventEmitter} from 'events';

type REQUEST = Object;

export default class Response extends EventEmitter {
  request: REQUEST;
  status: number;
  message: string;
  res: Object;
  success: boolean;
  accepted: boolean;
  body: any;
  charset: string;

  constructor(request: REQUEST) {
    super();

    setTimeout(async () => {
      try {
        const response = await this.fetch(request);
        this.parse(response, request);
      } catch (error) {
        return this.error;
      }
    });
  }

  async fetch(request): Promise {
    console.log(Reactors.platform);
    try {
      const headers: HEADERS = {
        'Content-Type': request.content_type,
      };

      const fetch_options: FETCH_OPTIONS = {
        method: request.method,
        headers,
      };

      if (request.payload) {
        fetch_options.body = JSON.stringify(request.payload);
      }

      if (Reactors.platform === 'web') {
        return new Promise((resolve, reject) => {
          superagent
            .get(request.path)
            .end((err, res) => {
              if (err) {
                return reject(err);
              }
              resolve(res);
            });
        });
      }

      return fetch(this.path, fetch_options);
    } catch (err) {
      return err;
    }
  }

  async parse(response, request) {
    try {
      if (response instanceof Error) {
        throw response;
      }
      Object.assign(this, response);

      if (!this.json) {
        this.json = () => this.body;
      }

      if (typeof this.success === 'undefined') {
        this.success = this.status >= 200 && this.status <= 299;
      }

      this.message = response.statusText;

      request.emit('end');
      request.emit(this.status);
      // this.emit(this.response.res.statusMessage);

      if (this.info) {
        request.emit('info');
      } else if (this.success) {
        request.emit('success');
      } else if (this.clientError) {
        request.emit('clientError');
        request.emit('error', new Error(this.status +
          ' ' + this.message)
        );
      } else if (this.serverError) {
        request.emit('serverError');
        request.emit('error', new Error(this.status +
          ' ' + this.statusMessage)
        );
      }

    } catch (error) {
      request.emit('error', error);
    }
  }
}
