// tslint:disable:object-literal-sort-keys

import { Call } from '../../client/methods/call'
import { Method, MethodParams } from '../../method.types'

interface Dependencies {
  readonly call: Call
}

export default ({ call }: Dependencies) => ({
  create: (fields: MethodParams<Method.CRM_STATUS_ADD>['fields']) =>
    call(Method.CRM_STATUS_ADD, { fields }),

  get: (id: string) =>
    call(Method.CRM_STATUS_GET, { id }),

  list: (params: MethodParams<Method.CRM_STATUS_LIST> = {}) =>
    call(Method.CRM_STATUS_LIST, params),

  update: (id: string, fields: MethodParams<Method.CRM_STATUS_UPDATE>['fields']) =>
    call(Method.CRM_STATUS_UPDATE, { id, fields })
})