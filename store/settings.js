import {
  StoreKeys,
  MutationNames,
  GetterNames
} from '~/store/keys/settings-keys'

export const state = () => ({
  [StoreKeys.LeadtimeInDays]: 7,
  [StoreKeys.BlackoutDates]: [],
  [StoreKeys.ServiceDisclaimer]: undefined
})

export const mutations = {
  [MutationNames.UpdateSettings](state, payload) {
    const {content} = payload.story
    const availability = content.availability[0]
    const serviceDisclaimer = content.service_disclaimer
    state[StoreKeys.LeadtimeInDays] = availability.leadtime_in_days
    state[StoreKeys.BlackoutDates] = availability.blackout_dates
    state[StoreKeys.ServiceDisclaimer] = serviceDisclaimer
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