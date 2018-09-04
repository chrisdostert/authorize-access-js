/**
 * Access authorization stage which
 * - grants access if accessCtx.userId === request.userId
 * @param {*} accessCtx
 * @param {*} request
 */
function userId (
  accessCtx,
  request
) {
  if (accessCtx.userId === request.userId) {
    accessCtx.grant()
  }
}

module.exports = userId
