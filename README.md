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

// As a promise

new Request(url)
  .then(response => console.log(response.body))
  .catch(response => console.log(response.status))
  .finally(response => console.log('done'));

// As a listener

new Request(url)
  .on('error', ::console.log)
  .on(404, ::console.log)
  .on(200, ::console.log)
  .on('end', ::console.log);

// Listener sugars
new Request(url)
  .error(error => {})
  .success(response => {});
```

# Events

List of events:

- error
- response, end
- <status code>
- <status message>
- timeout
- info
- success
- redirect
- 'client error'
- 'server error'
- not found
- forbidden

# Events methods

- error
- end
- success
- ok
- notFound
- forbidden
- clientError
- serverError

# HTTP Methods

```javascript
new Request(url).then(); // GET
new Request(url).post({foo: true});
new Request(url).put({foo: true});
new Request(url).delete();
new Request(url).head();
```

# Headers

You can set headers as such:

```javascript
new Request(url).set({A: B, C: D});
```

# Content type

`reactors-http-request` will try to auto-detect content type. For example, `new Request(url).post({foo: 1})` will be auto-detected as `application/json` - but you can specify type manually:

```javascript
new Request(url).type('text/plain');
```

We understand the following aliases:

- **form** `application/x-www-form-urlencoded`
- **gif** `image/gif`
- **jpg** `image/jpeg`
- **json** `application/json`
- **multipart** `multipart/form-data`
- **png** `image/png`
- **text** `text/plain`
