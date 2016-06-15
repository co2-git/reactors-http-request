import superagent from 'superagent';
import Reactors from 'reactors';
import _Promise from './_Promise';

export default class Response extends _Promise {
  path: string;
  response: any;

  constructor(path: string) {
    super(path);

    this.path = path;

    setTimeout(this._fetch.bind(this));
  }

  async _fetch() {
    try {
      this.response = await this._fetchResponse();

      if (this.response instanceof Error) {
        throw this.response;
      }

      this.emit('end');
      this.emit(this.response.status);
      // this.emit(this.response.res.statusMessage);

      if (this.response.info) {
        this.emit('info');
      } else if (this.response.success) {
        this.emit('success');
      } else if (this.response.clientError) {
        this.emit('clientError');
        this.emit('error', new Error(this.response.status +
          ' ' + this.response.res.statusMessage)
        );
      } else if (this.response.serverError) {
        this.emit('serverError');
        this.emit('error', new Error(this.response.status +
          ' ' + this.response.res.statusMessage)
        );
      }

    } catch (error) {
      this.error = error;
      this.emit('error', error);
    }
  }

  async _fetchResponse(): Promise {
    try {
      const headers: HEADERS = {
        'Content-Type': this.content_type,
      };

      const fetch_options: FETCH_OPTIONS = {
        method: this.method,
        headers,
      };

      if (this.payload) {
        fetch_options.body = JSON.stringify(this.payload);
      }

      if (Reactors.platform === 'web') {
        return new Promise((resolve, reject) => {
          superagent
            .get(this.path)
            .end((err, res) => {
              if (err) {
                return reject(err);
              }
              // console.log(res);
              resolve({
                ...res,
                json: () => res.body,
                success: res.status >= 200 && res.status <= 299,
              });
            });
        });
      }

      return fetch(this.path, fetch_options);
    } catch (err) {
      return err;
    }
  }
}
