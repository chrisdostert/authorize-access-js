const jsonWebToken = require('jsonwebtoken')

/**
 * Factory to build an access authorization stage which
 * - grants access & adds claims if request.jwt is valid
 * - denies access if jwt invalid
 * @param {string} secretOrPrivateKey
 * @param {object} options
 */
function jwtFactory (
  secretOrPrivateKey,
  options
) {
  return (accessCtx, request) => jsonWebToken.verify(
    request.jwt,
    secretOrPrivateKey,
    options
  )
}

module.exports = jwtFactory
