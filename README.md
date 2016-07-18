reactors-http-request
===

`reactors-http-request` negotiates HTTP(s) transactions for [reactors](https://github.com/co2-git/reactors).

Most of the times you are fine using the `Fetch` API. It is supported both by React Native for Android and iOS and is a HTML spec - so it works both for web and desktop. Yet, for web and desktop, the fetch API won't handle requests to other domains. For these cases, you can use `reactors-http-request`.

It will then use `superagent`. We try to add as much support as possible to various cases such as streaming or cache handling.

# Install

```bash
npm install --save reactors-http-request
```

# Usage

```javascript
request(url: string, options?: Object)
```

```javascript
import request from 'reactors-http-request';

async function createNewFoo(url, foo) {
  const res = await request(url, {method: 'POST', payload: foo});
  const {ok, body, error} = res;
  return ok ? body : error;
}
```

# HTTP Methods

```javascript
request(url, {method: 'POST', payload: {foo: 1}});
```

# Headers

You can set headers as such:

```javascript
request(url, {headers: {['X-HEADER']: 'foo'}});
```

# JSON detection

JSON is detected for both requests (so you don't need to set the Content-Type header) and for responses (so you don't need to parse the text - it is already in JSON).
