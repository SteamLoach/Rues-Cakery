import {
  SettingsStoreKeys as StoreKeys,
  SettingsMutationNames as MutationNames,
  SettingsGetterNames as GetterNames
} from '~/constants/store'

export const state = () => ({
  [StoreKeys.LeadtimeInDays]: 7,
  [StoreKeys.BlackoutDates]: [],
  [StoreKeys.ServiceDisclaimer]: undefined
})

export const mutations = {
  [MutationNames.UpdateSettings](state, payload) {
    const {content} = payload.story
    state[StoreKeys.LeadtimeInDays] = content.leadtime_in_days
    state[StoreKeys.BlackoutDates] = content.blackout_dates
    state[StoreKeys.ServiceDisclaimer] = content.service_disclaimer[0]
  }
}

export const getters = {
  [GetterNames.LeadtimeInDays](state) {
    return state[StoreKeys.LeadtimeInDays]
  },
  [GetterNames.BlackoutDates](state) {
    return state[StoreKeys.BlackoutDates]
  },
  [GetterNames.ServiceDisclaimer](state) {
    return state[StoreKeys.ServiceDisclaimer]
  }
}