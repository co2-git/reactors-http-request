/* global fetch */
import 'babel-polyfill';
import _ from 'lodash';
import Response from './Response';
import RequestAsAPromise from './Request/RequestAsAPromise';

export
type JSON_ACCEPTED_TYPES = ?string | ?number | ?boolean;

type METHOD = 'GET' | 'POST' | 'PUT' | 'DELETE';

type FETCH_OPTIONS = {
  headers: HEADERS,
  method: METHOD,
  body?: string
};

type HANDLER = Function | Array<Function>;

type PARSED_RESPONSE = {};

type CONTENT_TYPE = 'multipart/form-data' |
  'application/json' | string;

type HEADERS = {
  'Content-Type'?: CONTENT_TYPE,
  Authorization?: string,
};

type MODULE = {
  request: Function,
  delete: Function,
};

export default class Request extends RequestAsAPromise {
  method: METHOD = 'GET';

  payload: any;

  content_type: CONTENT_TYPE = 'application/json';

  error: ?Error;

  response: Response;

  headers: HEADERS;

  constructor(path: string) {
    super();

    this.path = path;

    setTimeout(async () => {
      try {
        this.response = new Response(this);
        this.response.on('error', error => this.emit('error', error));
      } catch (error) {
        this.emit('error', error);
      }
    });
  }

  post(payload: any): Request {
    this.method = 'POST';
    this.payload = payload;
    return this;
  }

  type(content_type: ?string): Request {
    if (typeof content_type === 'string') {
      switch (content_type) {
      case 'json':
        this.content_type = 'application/json';
        break;
      default:
        this.content_type = content_type;
        break;
      }
    }
    return this;
  }

  delete(): Request {
    this.method = 'DELETE';
    return this;
  }
}
