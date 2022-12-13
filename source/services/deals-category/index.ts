import { Call } from '../../client/methods/call'
import { Method } from '../../methods'

type Dependencies = {
  readonly call: Call
}

export default ({ call }: Dependencies) => ({
  get: () => call(Method.CRM_DEAL_CATEGORY_DEFAULT_GET, {})
})
