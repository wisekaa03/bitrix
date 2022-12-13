import { Method } from '../../methods'
import { GetPayload } from '../../payloads'
import { DealCategory } from './entities'

export type DealsCategoryMethods = {
  readonly [Method.CRM_DEAL_CATEGORY_DEFAULT_GET]: {
    readonly type: DealCategory
    readonly payload: GetPayload<DealCategory>
  }
}
