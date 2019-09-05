/**
 * AWS Lambda can have issues when return a promise and
 * using the callback. Currently (1.4.0) LaconiaJS requires
 * a callback in the signature. This is a quick hack to
 * deal with that
 *
 * @param {laconia.LaconiaHandler} laconiaHandler
 */
module.exports = laconiaHandler => (event, context) =>
  new Promise((resolve, reject) =>
    laconiaHandler(event, context, (error, result) =>
      error ? reject(error) : resolve(result)
    )
  );
