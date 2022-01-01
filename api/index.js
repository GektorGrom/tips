const { createRequestHandler } = require('@remix-run/vercel');

module.exports = createRequestHandler({
  // eslint-disable-next-line
  build: require('./_build'),
});
