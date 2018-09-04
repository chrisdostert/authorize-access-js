async function authorize (
  request,
  stages
) {
  let accessCtx = {}
  for (let i = 0; i < stages.length; i++) {
    let isGranted
    let grant = () => { isGranted = true }

    const result = await stages[i]({...accessCtx, grant}, request)
    if (result instanceof Object) {
      accessCtx = {...accessCtx, ...result}
    }
    if (isGranted) {
      return accessCtx
    }
  }

  // if not granted by any stage then deny
  const error = new Error()
  error.code = 403
  throw error
}

module.exports = authorize
