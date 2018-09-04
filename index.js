const deny = error => {
  throw error || new Error('not authorized')
}

async function authorize (
  request,
  stages
) {
  let accessCtx = {}
  for (let i = 0; i < stages.length; i++) {
    let isGranted
    let grant = () => { isGranted = true }

    accessCtx = await stages[i]({...accessCtx, deny, grant}, request)
    if (isGranted) {
      return accessCtx
    }
  }
}

module.exports = authorize
