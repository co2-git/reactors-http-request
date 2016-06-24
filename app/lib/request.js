import superagent from 'superagent';

export default fetch(request): Promise {
  console.log('fetching', Reactors.platform);
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

    if (Reactors.platform === 'web' || Reactors.platform === 'desktop') {
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
