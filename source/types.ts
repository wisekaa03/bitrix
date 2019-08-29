import { Diff } from './utils/Diff'

export enum Method {
  // Gettable
  BATCH = 'batch',
  GET_DEAL = 'crm.deal.get',
  GET_LEAD = 'crm.lead.get',
  GET_STATUS = 'crm.status.get',

  // Listable
  LIST_DEALS = 'crm.deal.list',
  LIST_LEADS = 'crm.lead.list',
  LIST_STATUSES = 'crm.status.list'
}

const LISTABLE_METHODS = [
  Method.LIST_DEALS,
  Method.LIST_LEADS,
  Method.LIST_STATUSES
] as const

export type ListableMethod = typeof LISTABLE_METHODS[number]
export type GettableMethod = Diff<Method, ListableMethod>

export interface PayloadTime {
  readonly start: number
  readonly finish: number
  readonly duration: number
  readonly processing: number
  readonly date_start: string
  readonly date_finish: string
}

export interface GetPayload<P> {
  readonly result: P,
  readonly time: PayloadTime
}

export interface ListPayload<P> {
  readonly result: readonly P[],
  readonly error?: string,
  readonly total: number,
  readonly next?: number
  readonly time: PayloadTime
}

// `C` stands for a map of names to structural types they will uphold in result
// `[]` in language of ill Bitrix means `undefined`. Just deal with it.
// Also, it will return object if command names specified and array if names are numbers. Deal with it.
export interface BatchPayload<C> {
  readonly result: {
    readonly result: { readonly [P in keyof C]?: C[P] } | ReadonlyArray<C[keyof C]>
    readonly result_error: { readonly [P in keyof C]?: string } | readonly string[]
    readonly result_total: { readonly [P in keyof C]?: number } | readonly number[]
    readonly result_next: { readonly [P in keyof C]?: number } | readonly number[]
    readonly result_time: { readonly [P in keyof C]?: PayloadTime } | readonly PayloadTime[]
  }
  readonly time: PayloadTime
}

// @todo Figure out full list of possible values
export interface ListParams {
  readonly start?: number
  readonly order?: { readonly [key: string]: 'ASC' }
  readonly filter?: { readonly '>PROBABILITY': number }
  readonly select?: ReadonlyArray<'*' | 'UF_*' | string>
}

export interface GetParams {
  readonly ID: number,
}

export interface Command {
  readonly method: Method
  readonly params?: GetParams | ListParams
}

export type Commands =
  { readonly [key: string]: Command } |
  // For arrays. It's signature, since `Command[]` won't be
  // accepted by types like `Record`
  { readonly [index: number]: Command }

// =====================================================
// Bitrix Payloads
// =====================================================

// String which is actually a number, like `'20.23'`
export type NumberString = string
// Like `'2018-06-07T03:00:00+03:00'`
export type ISODate = string
export type BoolString = 'Y' | 'N'

// @todo This is approximate structure. Might not be accurate
export interface Deal {
  // Deal can have user fields
  // @todo Remove `unknown` when all fields will be known
  readonly [key: string]: string | unknown

  // tslint:disable-next-line: no-mixed-interface
  readonly ID: NumberString
  readonly TITLE: string
  readonly TYPE_ID: string
  readonly STAGE_ID: string
  readonly PROBABILITY: unknown // @todo Check is it right
  readonly CURRENCY_ID: string
  readonly OPPORTUNITY: NumberString
  readonly TAX_VALUE: NumberString
  readonly LEAD_ID: NumberString
  readonly COMPANY_ID: NumberString
  readonly CONTACT_ID: NumberString | null
  readonly QUOTE_ID: NumberString | null
  readonly BEGINDATE: ISODate
  readonly CLOSEDATE: ISODate
  readonly ASSIGNED_BY_ID: NumberString
  readonly CREATED_BY_ID: NumberString
  readonly MODIFY_BY_ID: NumberString
  readonly DATE_CREATE: ISODate
  readonly DATE_MODIFY: ISODate
  readonly OPENED: BoolString
  readonly CLOSED: BoolString
  readonly COMMENTS: string
  readonly ADDITIONAL_INFO: unknown // @todo Check is it right
  readonly LOCATION_ID: NumberString | null
  readonly CATEGORY_ID: NumberString
  readonly STAGE_SEMANTIC_ID: NumberString
  readonly IS_NEW: BoolString
  readonly IS_RECURRING: BoolString
  readonly IS_RETURN_CUSTOMER: BoolString
  readonly IS_REPEATED_APPROACH: BoolString
  readonly SOURCE_ID: NumberString | null
  readonly SOURCE_DESCRIPTION: string | null
  readonly ORIGINATOR_ID: string
  readonly ORIGIN_ID: NumberString
  readonly UTM_SOURCE: string | null
  readonly UTM_MEDIUM: string | null
  readonly UTM_CAMPAIGN: string | null
  readonly UTM_CONTENT: string | null
  readonly UTM_TERM: string | null
}

// @todo This is approximate structure. Might not be accurate
export interface Lead {
  // Deal can have user fields
  // @todo Remove `unknown` when all fields will be known
  readonly [key: string]: string | unknown

  // tslint:disable-next-line: no-mixed-interface
  readonly ID: NumberString
  readonly TITLE: string
  readonly HONORIFIC: unknown | null // @todo
  readonly NAME: string | null
  readonly SECOND_NAME: string | null
  readonly LAST_NAME: string | null
  readonly COMPANY_TITLE: string | null
  readonly COMPANY_ID: unknown | null // @todo
  readonly CONTACT_ID: unknown | null // @todo
  readonly IS_RETURN_CUSTOMER: BoolString
  readonly BIRTHDATE: unknown | null // @todo
  readonly SOURCE_ID: NumberString
  readonly SOURCE_DESCRIPTION: null
  readonly STATUS_ID: unknown | null // @todo
  readonly STATUS_DESCRIPTION: string | null
  readonly POST: unknown | null // @todo
  readonly COMMENTS: string | null
  readonly CURRENCY_ID: string
  readonly OPPORTUNITY: NumberString
  readonly HAS_PHONE: BoolString
  readonly HAS_EMAIL: BoolString
  readonly HAS_IMOL: BoolString
  readonly ASSIGNED_BY_ID: NumberString
  readonly CREATED_BY_ID: NumberString
  readonly MODIFY_BY_ID: NumberString
  readonly DATE_CREATE: ISODate
  readonly DATE_MODIFY: ISODate
  readonly DATE_CLOSED: ISODate
  readonly STATUS_SEMANTIC_ID: string
  readonly OPENED: BoolString
  readonly ORIGINATOR_ID: unknown | null // @todo
  readonly ORIGIN_ID: unknown | null // @todo
  readonly ADDRESS: string | null
  readonly ADDRESS_2: string | null
  readonly ADDRESS_CITY: string | null
  readonly ADDRESS_POSTAL_CODE: string | null
  readonly ADDRESS_REGION: string | null
  readonly ADDRESS_PROVINCE: string | null
  readonly ADDRESS_COUNTRY: string | null
  readonly ADDRESS_COUNTRY_CODE: string | null
  readonly UTM_SOURCE: string | null
  readonly UTM_MEDIUM: string | null
  readonly UTM_CAMPAIGN: string | null
  readonly UTM_CONTENT: string | null
  readonly UTM_TERM: string | null
}

export interface StatusExtra {
  readonly SEMANTICS: string
  readonly COLOR: string
}

export interface Status {
  readonly ID: NumberString
  readonly ENTITY_ID: string
  readonly STATUS_ID: NumberString
  readonly NAME: string
  readonly NAME_INIT: string
  readonly SORT: NumberString
  readonly SYSTEM: BoolString
  readonly EXTRA: StatusExtra | undefined
}