import 'babel-polyfill';

export default response(res, req) {
  return new Promise((resolve, reject) => {
    try {
      if (response instanceof Error) {
        throw response;
      }



    } catch (error) {
      reject(error);
    }
  })
}
