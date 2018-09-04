const jsonWebToken = require('jsonwebtoken')

/**
 * Factory to build access authorization middleware which
 * - grants access & adds claims if request.jwt is valid
 * - denies access if jwt invalid
 * @param {string} secretOrPrivateKey
 * @param {object} options
 */
function verifyJwtFactory (
  secretOrPrivateKey,
  options
) {
  return (accessCtx, request) => {
    if (request.jwt) {
      try {
        return jsonWebToken.verify(
          request.jwt,
          secretOrPrivateKey,
          options
        )
      } catch (error) {
        error.code = 401
        throw error
      }
    }
  }
}

module.exports = verifyJwtFactory
